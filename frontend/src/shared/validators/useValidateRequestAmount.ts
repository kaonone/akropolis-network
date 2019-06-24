import React from 'react';

import { TOTAL_WAITING_DAYS_FOR_ACCESS } from 'core/constants';
import { tKeys } from 'services/i18n';
import { DaoApi } from 'services/daoApi';
import { useUserBalance, useIsUserMember, useDaysForAccess } from 'shared/helpers/user';
import { useActiveWithdraws } from 'shared/helpers/voting';

export function useValidateRequestAmount(daoApi: DaoApi) {
  const isUserMember = useIsUserMember(daoApi);
  const days = useDaysForAccess(daoApi);

  const userBalance = useUserBalance(daoApi);
  const currentWithdrawAmount = useActiveWithdraws(daoApi);

  return React.useCallback((daiAmount: number) => {
    const remainedDai = userBalance.minus(currentWithdrawAmount);

    if (isUserMember && days && days.dayPassed >= TOTAL_WAITING_DAYS_FOR_ACCESS) {
      return undefined;
    }

    return remainedDai.isGreaterThanOrEqualTo(daiAmount) ? undefined : tKeys.shared.validation.notEnoughDai.getKey();
  }, [currentWithdrawAmount, userBalance, isUserMember, days]);
}
