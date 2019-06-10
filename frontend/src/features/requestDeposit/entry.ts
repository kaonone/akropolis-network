import makeFeatureEntry from 'shared/helpers/makeFeatureEntry';

import * as containers from './view/containers';

const entry = makeFeatureEntry(
  containers, null, null,
);

type Entry = typeof entry;

export { Entry, entry };
