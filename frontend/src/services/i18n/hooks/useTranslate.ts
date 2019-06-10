import { useContext } from 'react';
import { TContext } from '../constants';

export default function useTranslate() {
  return useContext(TContext);
}
