import * as React from 'react';
import MembersList, { membersMock, memberMock } from 'shared/futureView/MembersList/MembersList';

import { StylesProps, provideStyles } from './Members.style';

function Members(props: StylesProps) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <MembersList members={membersMock} userAccount={memberMock}/>
    </div>
  );
}

export default provideStyles(Members);
