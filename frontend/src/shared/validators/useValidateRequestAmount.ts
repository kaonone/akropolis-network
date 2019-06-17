import React from 'react';

import { tKeys } from 'services/i18n';
import { DaoApi } from 'services/daoApi';
import { useUserBalance, useDaysForAccess } from 'shared/helpers/user';
import { useActiveWithdraws } from 'shared/helpers/voting';
import { TOTAL_WAITING_DAYS_FOR_ACCESS } from 'core/constants';

export function useValidateRequestAmount(daoApi: DaoApi) {
  const days = useDaysForAccess(daoApi);

  const userBalance = useUserBalance(daoApi);
  const currentWithdrawAmount = useActiveWithdraws(daoApi);

  return React.useCallback((daiAmount: number) => {
    const remainedDai = userBalance - currentWithdrawAmount;

    if (!days || days.dayPassed >= TOTAL_WAITING_DAYS_FOR_ACCESS) {
      return undefined;
    }
    return remainedDai >= daiAmount ? undefined : tKeys.shared.validation.notEnoughDai.getKey();
  }, [currentWithdrawAmount, userBalance]);
}
