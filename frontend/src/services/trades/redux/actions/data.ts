import { IAirSwapOrder } from 'shared/types/models';
import * as NS from '../../namespace';

export function addTrade(trade: IAirSwapOrder): NS.IAddTrade {
  return {
    type: 'TRADES:ADD_TRADE',
    payload: trade,
  };
}
