import Identicon, { IdenticonOptions } from 'identicon.js';

const defaultOptions: IdenticonOptions = {
  foreground: [176, 80, 247, 255],
  background: [52, 28, 107, 255],
  size: 24,
  format: 'svg',
};

export default function getIdenticonSrc(hash: string, options?: IdenticonOptions): string {
  const resultOptions = { ...defaultOptions, ...options };
  const base64: string = new Identicon(hash, { ...defaultOptions, ...options }).toString();
  return `data:image/${resultOptions.format === 'svg' ? 'svg+xml' : 'png'};base64,${base64}`;
}
