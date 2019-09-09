import * as React from 'react';
import Web3 from 'web3';

import erc20Abi from 'blockchain/abi/erc20.json';
import { NETWORK_CONFIG } from 'core/constants';
import { formatBalance } from 'shared/helpers/web3';

interface IProps {
  token: string;
  amount: string;
}

const web3 = new Web3(NETWORK_CONFIG.rpcUrl);

function ERC20Balance(props: IProps) {
  const { token, amount } = props;
  const [symbol, setSymbol] = React.useState<string | null>(null);
  const [decimals, setDecimals] = React.useState<number | null>(null);

  const contract = React.useMemo(() => {
    return new web3.eth.Contract(erc20Abi, token);
  }, [token]);

  React.useEffect(() => {
    (async () => {
      setDecimals(await contract.methods.decimals().call());
      setSymbol(await contract.methods.symbol().call());
    })();
  }, []);

  return (
    <>
      {symbol === null || decimals === null
        ? 'Loading...'
        : `${formatBalance(amount, { decimals })} ${symbol}`
      }
    </>
  );
}

export default ERC20Balance;
