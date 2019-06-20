import * as React from 'react';
import { UnionToIntersection, ExtractByType } from '_helpers';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { VotingIntent } from 'shared/types/models';
import { Receipt, AddPerson, DeFiDots, AddCircle, RemoveCircle } from 'shared/view/elements/Icons';
import { formatDAI } from 'shared/helpers/format';

import Column from '../Column/Column';
import Address from '../Address/Address';
import { StylesProps, provideStyles } from './Intent.style';

const tKeys = tKeysAll.features.voting;
const tKeysShared = tKeysAll.shared;

interface IIntentProps {
  intent: VotingIntent;
}

type IProps = IIntentProps & StylesProps;

export default React.memo(provideStyles((props: IProps) => {
  const { classes, intent: ownIntent } = props;
  const { t } = useTranslate();

  const renderByType: { [key in VotingIntent['type']]: (intent: ExtractByType<VotingIntent, key>) => JSX.Element } = {
    transfer: (intent) => (
      <>
        <Column
          xs
          title={t(tKeys.transfer.getKey())}
          value={formatDAI(intent.payload.amount.toNumber(), 2)}
          icon={<Receipt className={classes.withdrawIcon} />}
        />
        <Column
          xs
          title={t(tKeysShared.from.getKey())}
          value={<Address value={intent.payload.from} />}
        />
        <Column
          xs
          title={t(tKeysShared.to.getKey())}
          value={<Address value={intent.payload.to} />}
        />
      </>
    ),
    joinToDao: (intent) => (
      <Column
        xs
        title={t(tKeys.join.getKey())}
        value={<Address value={intent.payload.address} />}
        icon={<AddPerson className={classes.addPersonIcon} />}
      />
    ),
    enableDeFiAccount: () => (
      <Column
        xs
        title={t(tKeys.open.getKey())}
        value={'DeFi Account'}
        icon={<DeFiDots className={classes.deFiIcon} />}
      />
    ),
    disableDeFiAccount: () => (
      <Column
        xs
        title={t(tKeys.close.getKey())}
        value={'DeFi Account'}
        icon={<DeFiDots className={classes.deFiIcon} />}
      />
    ),
    enableInvestment: (intent) => (
      <Column
        xs
        title={t(tKeys.enable.getKey())}
        value={<Address value={intent.payload.address} />}
        icon={<AddCircle className={classes.enableInvestmentIcon} />}
      />
    ),
    disableInvestment: (intent) => (
      <Column
        xs
        title={t(tKeys.disable.getKey())}
        value={<Address value={intent.payload.address} />}
        icon={<RemoveCircle className={classes.disableInvestmentIcon} />}
      />
    ),
    unknown: () => <noscript />,
  };

  return renderByType[ownIntent.type](ownIntent as UnionToIntersection<VotingIntent>);
}));
