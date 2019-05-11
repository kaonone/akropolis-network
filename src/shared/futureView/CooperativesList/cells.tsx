import * as React from 'react';

import { StylesProps, provideStyles } from './CooperativesList.style';
import { CooperativeEvent } from 'shared/types/models/Cooperative';
import NewEvent from 'shared/view/elements/Icons/NewEvent';

import { useTranslate, tKeys } from 'services/i18n';

interface IComplexCellProps {
  title: string;
  value: string | number;
}

const ComplexCell = React.memo(provideStyles((props: IComplexCellProps & StylesProps) => {

  const { classes, title, value } = props;
  return (
    <div className={classes.complexCell}>
      <div className={classes.complexCellTitle}>{title}</div>
      <div className={classes.complexCellValue}>{value}</div>
    </div>
  );

}));

interface IEventCellProps {
  event?: CooperativeEvent;
}

const EventCell = React.memo(provideStyles((props: IEventCellProps & StylesProps) => {

  const { classes, event } = props;
  const { t } = useTranslate();
  return (
    <>
      {event === 'new' &&
        <div className={classes.newEvent}>
          <span className={classes.eventTag}>{t(tKeys.shared.new.getKey())}</span>
          <NewEvent className={classes.eventIcon} />
        </div>}
      {event === 'reviewed' && <NewEvent className={classes.eventIcon} />}

    </>
  );

}));

export { ComplexCell, EventCell };
