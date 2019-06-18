import { DaoApi } from 'services/daoApi';
import useLastConfirmedJoinVoting from '../useLastConfirmedJoinVoting';
import getWaitingAccessDays from '../getWaitingAccessDays';

export default function useDaysForAccess(daoApi: DaoApi) {
  const lastJoinTransaction = useLastConfirmedJoinVoting(daoApi);
  return lastJoinTransaction && getWaitingAccessDays(lastJoinTransaction.startDate);
}
