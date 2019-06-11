import * as R from 'ramda';
import { bind } from 'decko';
import { EventLog } from 'web3/types';
import getApm, { ApmOptions } from '@aragon/apm';
import ContractProxy from '@aragon/wrapper/dist/core/proxy';
import { Observable, Subscription } from 'rxjs';
import { observable, runInAction } from 'mobx';

import { web3Providers, NETWORK_CONFIG, TEMPLATE_ENS_ID, LAST_STABLE_TEMPLATE_VERSION } from 'core/constants';

import { Provider, IEthereumEvent } from 'shared/types/models';
import { makeStoreFromEvents } from 'shared/helpers/makeStoreFromEvents';
import { getWeb3 } from 'shared/helpers/web3';

const provider: Provider = web3Providers.wallet;
const ensRegistryAddress: string = NETWORK_CONFIG.aragonEnsRegistry;
const ipfsConf = NETWORK_CONFIG.defaultIpfsConfig;

interface IStateFromEvents {
  daos: string[];
  ready: boolean;
}

interface ILoading {
  status: 'pending' | 'ready' | 'error';
  error: null | string;
}

type DeployInstanceEvent = IEthereumEvent<'DeployInstance', {
  aragonId: string;
  dao: string;
  token: string;
}>;

export class DaosStore {
  @observable
  public daoIds: string[] = [];

  @observable
  public loading: ILoading = {
    status: 'pending',
    error: null,
  };

  public daos$: Observable<IStateFromEvents> | null = null;
  private subscription: Subscription | null = null;

  public constructor() {
    this.init();
  }

  @bind
  public retry() {
    this.init();
  }

  private async init() {
    try {
      runInAction(() => {
        this.loading = {
          status: 'pending',
          error: null,
        };
      });

      this.subscription && this.subscription.unsubscribe();

      const apmOptions: ApmOptions = { ensRegistryAddress, ipfs: ipfsConf };
      const web3 = getWeb3(provider);
      const apm = getApm(web3, apmOptions);

      const { contractAddress, abi } = await apm.getVersion(TEMPLATE_ENS_ID, LAST_STABLE_TEMPLATE_VERSION);

      if (!abi || !contractAddress) {
        throw new Error(`ABI or address for template ${TEMPLATE_ENS_ID} is not fount`);
      }

      const templateProxy = new ContractProxy(contractAddress, abi, web3);

      this.daos$ = makeStoreFromEvents(
        async (state: IStateFromEvents, events: EventLog[], isCompleteLoading: boolean): Promise<IStateFromEvents> => {
          const deployInstanceEvents = events
            .filter((event): event is DeployInstanceEvent => event.event === 'DeployInstance');

          const newDaos = deployInstanceEvents.map(event => event.returnValues.aragonId);
          const daos = newDaos.length ? R.uniq([...state.daos, ...newDaos]) : state.daos;

          return {
            daos,
            ready: isCompleteLoading,
          };
        },
        { daos: [], ready: false },
        [templateProxy],
      );

      this.subscription = this.daos$.subscribe(state => runInAction(() => {
        this.daoIds = state.daos;
        if (state.ready && this.loading.status !== 'ready') {
          this.loading = {
            error: null,
            status: 'ready',
          };
        }
      }));
    } catch (error) {
      runInAction(() => {
        this.loading = {
          status: 'error',
          error: error && error.message || String(error),
        };
      });
    }
  }
}

export const store = new DaosStore();
