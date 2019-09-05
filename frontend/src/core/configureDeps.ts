import { Store } from 'redux';
import { Drizzle, generateStore, IDrizzleOptions } from 'drizzle';
import { ApolloClient } from 'apollo-client';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache, HttpLink, split } from 'apollo-boost';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import Api from 'services/api/Api';
import { DaoApi } from 'services/daoApi';
import { LocalStorage } from 'services/storage';
import { IDependencies, IAppReduxState } from 'shared/types/app';
import { notifyDevWarning } from 'shared/helpers/notifyDevWarning';

import { NETWORK_CONFIG, contracts, web3Providers, defaultGasPriceFn } from './constants';

export default function configureDeps(_store: Store<IAppReduxState>): IDependencies {
  const api = new Api('/api');

  const options: IDrizzleOptions = { contracts };
  const drizzleStore = generateStore(options);
  const drizzle = new Drizzle(options, drizzleStore);
  const storage = new LocalStorage('v1');

  DaoApi.setConfig({
    aragonEnsRegistry: NETWORK_CONFIG.aragonEnsRegistry,
    defaultGasPriceFn,
    defaultWeb3Provider: web3Providers.default,
    walletWeb3Provider: web3Providers.wallet,
    ipfsConfig: NETWORK_CONFIG.defaultIpfsConfig,
  });

  const httpLink = new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/proofoftom/aragon-dao',
    credentials: 'same-origin',
  });

  const wsLink = new WebSocketLink({
    uri: 'wss://api.thegraph.com/subgraphs/name/proofoftom/aragon-dao',
    options: {
      reconnect: true,
    },
  });

  const httpLinkCompound = new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/compound-finance/compound-v2-rinkeby',
    credentials: 'same-origin',
  });

  const wsLinkCompound = new WebSocketLink({
    uri: 'wss://api.thegraph.com/subgraphs/name/compound-finance/compound-v2-rinkeby',
    options: {
      reconnect: true,
    },
  });

  const akroLink = makeEndpointLink(httpLink, wsLink);
  const compoundLink = makeEndpointLink(httpLinkCompound, wsLinkCompound);

  const link = split(
    ({ query }) => {
      const akroSelectionNames: string[] = ['votes'];
      const compoundSelectionNames: string[] = ['compoundUsers'];

      const definition = getMainDefinition(query);
      const selectionName = getFirstSelectionName(definition);

      const isAkroSelection = !!selectionName && akroSelectionNames.includes(selectionName);
      const isCompoundSelection = !!selectionName && compoundSelectionNames.includes(selectionName);

      notifyDevWarning(
        !isAkroSelection && !isCompoundSelection,
        `You need to add "${selectionName}" to \`akroSelectionNames\` or \`compoundSelectionNames\``,
      );

      return isAkroSelection;
    },
    akroLink,
    compoundLink,
  );

  const apolloClient = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
        }
        if (networkError) { console.log(`[Network error]: ${networkError}`); }
      }),
      link,
    ]),
    cache: new InMemoryCache(),
  });

  return {
    api,
    drizzle,
    storage,
    apolloClient,
  };
}

function makeEndpointLink(httpLink: HttpLink, wsLink: WebSocketLink) {
  return split(
    ({ query }) => {
      const definition = getMainDefinition(query);

      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );
}

function getFirstSelectionName(definition: any): string | null {
  interface ISelection {
    alias?: { value: string; };
    name: { value: string; };
  }

  const firstSelection: ISelection | undefined =
    definition.selectionSet &&
    definition.selectionSet.selections &&
    definition.selectionSet.selections[0];

  const selectionName = firstSelection
    ? (firstSelection.alias || firstSelection.name)
    : { value: null };

  return selectionName.value;
}
