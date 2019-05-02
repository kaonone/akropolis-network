import { IDependencies } from 'shared/types/app';
import React, { useContext } from 'react';

export const DepsContext = React.createContext<IDependencies>(null as any);

export function useDeps() {
  return useContext(DepsContext);
}
