import makeFeatureEntry from 'shared/helpers/makeFeatureEntry';

import * as containers from './view/containers';
import { actions, selectors, reducer, getSaga } from './redux';

const entry = makeFeatureEntry(
  containers, actions, selectors,
  {
    reducers: { createDao: reducer },
    sagas: [getSaga],
  },
);

type Entry = typeof entry;

export { Entry, entry };
