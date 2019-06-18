import { toFixed as _toFixed } from 'accounting';

export function toFixed(value: number, digits: number) {
  return _toFixed(value, digits);
}

export function calculateGrowth(previous: number, current: number) {
  return (current - previous) / Math.abs(previous) * 100;
}
