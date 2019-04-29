import { getAsyncContainer } from 'core/FeatureConnector';
import { loadEntry } from './loader';

export { Entry } from './entry';

export const DaoNameCheckingAsync = getAsyncContainer(loadEntry, 'DaoNameChecking');
