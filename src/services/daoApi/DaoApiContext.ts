import React, { useContext } from 'react';

import { DaoApi } from './DaoApi';

export const DaoApiContext = React.createContext<DaoApi>(null as any);

export function useDaoApi() {
  return useContext(DaoApiContext);
}
