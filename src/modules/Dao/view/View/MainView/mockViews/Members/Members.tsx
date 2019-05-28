import * as React from 'react';

import MembersList from 'shared/futureView/MembersList/MembersList';
import { IHolder, IFinanceHolder } from 'shared/types/models';
import { IMember } from 'shared/types/models/Member';

import { StylesProps, provideStyles } from './Members.style';

interface IProps {
  userAccount: string;
  tokenHolders: IHolder[];
  financeHolders: Record<string, IFinanceHolder>;
}

function Members(props: IProps & StylesProps) {
  const { classes, tokenHolders, financeHolders, userAccount } = props;

  const members: IMember[] = React.useMemo(() => {
    return tokenHolders.map<IMember>(item => {
      const financeHolder = financeHolders[item.address] || {
        address: '',
        balance: 0,
        credit: 0,
        debit: 0,
      };

      return {
        address: item.address,
        balance: financeHolder.balance,
        credit: financeHolder.credit,
        debit: financeHolder.debit,
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
