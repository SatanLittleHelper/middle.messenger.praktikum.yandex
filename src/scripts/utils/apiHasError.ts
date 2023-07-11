/* eslint-disable import/extensions,import/no-unresolved */
import { APIError } from '../api/types';

// eslint-disable-next-line import/prefer-default-export
export function hasError(response: any): response is APIError {
  // eslint-disable-next-line no-mixed-operators
  return response && response.reason || !response;
}
