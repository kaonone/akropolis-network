import { Entry } from './entry';

export async function loadEntry(): Promise<Entry> {
  const feature = await import(/* webpackChunkName: "createDao" */ './entry');
  return feature.entry;
}
