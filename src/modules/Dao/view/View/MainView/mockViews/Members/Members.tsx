import * as React from 'react';

import MembersList from 'shared/futureView/MembersList/MembersList';
import { IHolder, IFinanceHolder } from 'shared/types/models';

import { StylesProps, provideStyles } from './Members.style';

interface IProps {
  userAccount: string;
  tokenHolders: IHolder[];
  financeHolders: Record<string, IFinanceHolder>;
}

function Members(props: IProps & StylesProps) {
  const { classes, tokenHolders, financeHolders, userAccount } = props;

  const members: IFinanceHolder[] = React.useMemo(() => {
    return tokenHolders.map<IFinanceHolder>(item => {
      return financeHolders[item.address] || {
        address: item.address,
        balance: 0,
        withdraw: 0,
        deposit: 0,
      };
    });
  }, [tokenHolders, financeHolders]);

  return (
    <div className={classes.root}>
      <MembersList members={members} userAccountAddress={userAccount} />
    </div>
  );
}

export default React.memo(provideStyles(Members));
