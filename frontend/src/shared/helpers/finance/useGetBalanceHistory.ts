import * as React from 'react';
import { useObserver } from 'mobx-react-lite';
import * as moment from 'moment';

import { DaoApi } from 'services/daoApi';
import { IBalanceHistoryPoint } from 'services/daoApi/store/types';

const useGetBalanceHistory = (daoApi: DaoApi) => {

  const creationDate = useObserver(() => daoApi.store.tokenManager.daoCreationDate);
  const balanceHistory = useObserver(() => daoApi.store.finance.balanceHistory);

  return React.useMemo(() => {
    // need for intervals at graphic just after creation
    const decreasedCreationDate = moment(creationDate).subtract(3, 'hour').valueOf();
    const initialPoint: IBalanceHistoryPoint = { date: decreasedCreationDate, value: 0 };
    return [initialPoint].concat(balanceHistory);
  }, [creationDate, balanceHistory]);
};

export default useGetBalanceHistory;
