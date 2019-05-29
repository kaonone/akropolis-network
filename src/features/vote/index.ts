import { getAsyncContainer } from 'core/FeatureConnector';
import { loadEntry } from './loader';

export { Entry } from './entry';

export const VoteButtonAsync = getAsyncContainer(loadEntry, 'VoteButton');
export const ExecuteVoteButtonAsync = getAsyncContainer(loadEntry, 'ExecuteVoteButton');
