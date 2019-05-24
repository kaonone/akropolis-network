import * as React from 'react';

import MembersList from 'shared/futureView/MembersList/MembersList';
import { IHolder } from 'shared/types/models';
import { IMember } from 'shared/types/models/Member';

import { StylesProps, provideStyles } from './Members.style';

interface IProps {
  userAccount: string;
  tokenHolders: IHolder[];
}

function Members(props: IProps & StylesProps) {
  const { classes, tokenHolders, userAccount } = props;

  const members: IMember[] = React.useMemo(() => {
    return tokenHolders.map<IMember>(item => ({
      address: item.address,
      balance: 10,
      credit: 5,
      debit: 15,
    }));
  }, [tokenHolders]);

  return (
    <div className={classes.root}>
      <MembersList members={members} userAccountAddress={userAccount} />
    </div>
  );
}

export default React.memo(provideStyles(Members));
