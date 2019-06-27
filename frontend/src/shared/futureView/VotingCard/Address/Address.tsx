import * as React from 'react';
import { useObserver } from 'mobx-react-lite';

import { NETWORK_CONFIG } from 'core/constants';
import { useDaoApi } from 'services/daoApi';
import { AppType } from 'services/daoApi/types';
import { shortenString } from 'shared/helpers/format';

import { StylesProps, provideStyles } from './Address.style';

interface IProps {
  value: string;
}

const staticAliases = {
  [NETWORK_CONFIG.investments.compound.toLowerCase()]: 'Compound',
};

const aliasByType: Record<AppType, string | null> = {
  agent: 'DeFi account',
  finance: 'Co-op vault',
  vault: 'Co-op vault',
  'token-manager': null,
  voting: null,
};

function Address(props: IProps & StylesProps) {
  const { classes, value } = props;

  const lowerValue = value.toLowerCase();
  const daoApi = useDaoApi();
  const appTypeByAddress = useObserver(() => daoApi.store.appTypeByAddress);

  const maybeAlias = staticAliases[lowerValue] ||
    aliasByType[appTypeByAddress[lowerValue]] ||
    lowerValue;

  return (
    <a href={NETWORK_CONFIG.etherscanDomain + value} className={classes.root} target="_blank" rel="noopener noreferrer">
      {maybeAlias === lowerValue
        ? shortenString(maybeAlias, 8)
        : maybeAlias
      }
    </a>
  );
}

export default provideStyles(Address);
