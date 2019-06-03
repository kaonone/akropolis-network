import * as React from 'react';
import * as cn from 'classnames';

import { Grid, Typography } from 'shared/view/elements';
import { Receipt, AddPerson, Graphic } from 'shared/view/elements/Icons';
import { shortenString } from 'shared/helpers/format';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { VotingIntent } from 'shared/types/models';

import { StylesProps, provideStyles } from './../VotingCard.style';

const tKeys = tKeysAll.features.voting;
const tKeysShared = tKeysAll.shared;

interface IIntentProps {
  intent: VotingIntent;
}

type IProps = IIntentProps & StylesProps;

export default React.memo(provideStyles((props: IProps) => {
  const { classes, intent } = props;

  const { t } = useTranslate();

  const renderColumn = React.useCallback((title: string, icon: React.ReactElement, subtitle: string) => (
    <Grid item xs container direction="column">
      <Grid container wrap="nowrap" alignItems="center">
        {icon}
        <Typography variant="overline" className={cn(classes.title, classes.grey)}>
          {title}
        </Typography>
      </Grid>
      <Typography variant="h6" className={cn({ [classes.address]: intent.type === 'joinToDao' })}>
        {subtitle}
      </Typography>
    </Grid>
  ), [intent]);

  return (
    <>
      {intent.type === 'withdrawRequest' &&
        <>
          {renderColumn(
            t(tKeys.withdraw.getKey()),
            <Receipt className={classes.withdrawIcon} />,
            `${intent.payload.amount} DAI`,
          )}
          <Grid item xs container direction="column">
            <Typography variant="overline" className={cn(classes.title, classes.grey)}>
              {t(tKeysShared.to.getKey())}
            </Typography>
            <Typography variant="h6" className={classes.address}>
              {shortenString(intent.payload.to, 10)}
            </Typography>
          </Grid>
        </>
      }
      {intent.type === 'joinToDao' &&
        renderColumn(
          t(tKeys.join.getKey()),
          <AddPerson className={classes.addPersonIcon} />,
          shortenString(intent.payload.address, 10),
        )
      }
      {intent.type === 'invest' &&
        <>
          {renderColumn(
            t(tKeys.deposit.getKey()),
            <Graphic className={classes.votingTypeIcon} />,
            `${intent.payload.amount} DAI`,
          )}
          <Grid item xs container direction="column">
            <Typography variant="overline" className={cn(classes.title, classes.grey)}>
              {t(tKeysShared.to.getKey())}
            </Typography>
            <Typography variant="h6">{intent.payload.to}</Typography>
          </Grid>
        </>
      }
    </>
  );
}));
