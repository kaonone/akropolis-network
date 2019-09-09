export interface IAirSwapOrder {
  cid: string;
  expiry: number; // seconds
  nonce: number;
  maker: {
    wallet: string;
    token: string;
    param: string;
    kind: string;
  };
  taker: {
    wallet: string;
    token: string;
    param: string;
    kind: string;
  };
  signature: {
    version: string;
    signer: string;
    r: string;
    s: string;
    v: number;
  };
}
