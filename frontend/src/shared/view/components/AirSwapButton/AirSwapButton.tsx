import * as React from 'react';
import { Helmet } from 'react-helmet';

import { IAirSwapOrder } from 'shared/types/models';
import { CircleProgressBar, Button } from 'shared/view/elements';
import { NETWORK_CONFIG } from 'core/constants';
import { GetProps } from '_helpers';

interface IProps {
  targetTokenAddress: string;
  onCreateOrder(order: IAirSwapOrder): void;
}

function AirSwapButton(props: GetProps<typeof Button> & IProps) {
  const { children, targetTokenAddress, onClick, onCreateOrder, ...rest } = props;
  const airSwapContentElementRef = React.useRef<HTMLDivElement>(null);
  const [isReadyScript, setIsReadyScript] = React.useState(false);

  const handleScriptInject: any = React.useCallback((_newState: any, { scriptTags }: { scriptTags: any[] }) => {
    if (scriptTags) {
      const scriptTag: HTMLScriptElement = scriptTags[0];
      scriptTag.addEventListener('load', setIsReadyScript.bind(null, true));
    }
  }, []);

  const _onClick = React.useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    onClick && onClick(event);
    window.AirSwapTrader && airSwapContentElementRef.current && window.AirSwapTrader.render(
      {
        env: NETWORK_CONFIG.id === 1 ? 'production' : 'development',
        order: {
          taker: {
            token: targetTokenAddress,
          },
        },
        onCreate: (order: any, cid: any) => {
          onCreateOrder({ ...order, cid });
        },
        onClose: () => void 0,
      },
      airSwapContentElementRef.current,
    );
  }, [targetTokenAddress, onCreateOrder]);

  return (
    <>
      <Button {...rest} disabled={rest.disabled || !isReadyScript} onClick={_onClick}>
        {isReadyScript ? children : <CircleProgressBar />}
      </Button>
      <Helmet
        script={[{ src: 'https://cdn.airswap.io/airswap-trader.js' }]}
        onChangeClientState={handleScriptInject}
      />
      <div ref={airSwapContentElementRef} />
    </>
  );
}

export default AirSwapButton;
