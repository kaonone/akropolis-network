import React from 'react';
import { useObserver } from 'mobx-react-lite';

import { DaoApi } from 'services/daoApi';
import { InvestmentType, FutureInvestmentType, isInvestmentType } from 'shared/types/models';
import { useAccountAddress } from 'services/user';

import { addressesEqual } from '../web3';
import { calculateIsRejected } from './votingStatus';
import { NETWORK_CONFIG } from 'core/constants';

function useHasActiveEnableInvestmentVoting(daoApi: DaoApi, type: InvestmentType | FutureInvestmentType): boolean {
  if (!isInvestmentType(type)) { return false; }

  const userAccountAddress = useAccountAddress();
  const votingsMap = useObserver(() => daoApi.store.voting.votings);
  const votingConfig = useObserver(() => daoApi.store.voting.config);
  const votings = React.useMemo(() => Object.values(votingsMap), [votingsMap]);

  return React.useMemo(() => {
    return !!votings
      .filter(
        vote => (
          vote.intent.type === 'enableInvestment' &&
          addressesEqual(vote.intent.payload.address, NETWORK_CONFIG.investments[type]) &&
          !calculateIsRejected(vote, votingConfig.voteTime) &&
          !vote.executed
        ),
      ).length;
  }, [votings, userAccountAddress, votingConfig, type]);
}

export default useHasActiveEnableInvestmentVoting;
