import { APIError } from '../api/types';

export function hasError(response: any): response is APIError {
    console.log(response);
    return response && response.reason;
}
