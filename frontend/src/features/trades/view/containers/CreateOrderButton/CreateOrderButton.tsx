import * as React from 'react';
import { connect } from 'react-redux';

import { actions } from 'services/trades';
import { AirSwapButton } from 'shared/view/components';
import { NETWORK_CONFIG } from 'core/constants';

interface IProps {
  addOrder: typeof actions.addTrade;
}

function CreateOrderButton(props: IProps) {
  const { addOrder } = props;
  return (
    <AirSwapButton
      variant="contained"
      color="primary"
      onCreateOrder={addOrder}
      targetTokenAddress={NETWORK_CONFIG.daiContract}
    >
      Create Order
    </AirSwapButton>
  );
}

const mapDispatch = {
  addOrder: actions.addTrade,
};

export default connect(null, mapDispatch)(CreateOrderButton);
