// file: handleErrors.ts
import { Dispatch, Action } from 'redux';
import { setAlert } from '../../../store/slices/alertSlice';

const defaultErrorMessages: { [key: number]: string } & { default: string } = {
  400: 'Bad Request', //'There was a problem with your request.'
  401: 'Unauthorized', //'You need to log in to perform this action.'
  403: 'Forbidden', //'You do not have permission to access this resource.'
  404: 'Not Found', //'The resource you are looking for could not be found.'
  408: 'Request Timeout', //'The server timed out waiting for the request.'
  429: 'Too Many Requests', //'You have exceeded the number of requests allowed.'
  500: 'Internal Server Error', //'There was an error on the server.'
  502: 'Bad Gateway', //'The server received an invalid response from the upstream server.'
  503: 'Service Unavailable', //'The server is temporarily unavailable.'
  504: 'Gateway Timeout', //'The server timed out waiting for the upstream server.'
  default: 'An unknown error occurred', //'An unexpected error occurred. Please try again.'
};

export function handleErrors(
  error: unknown,
  dispatch: Dispatch<Action>,
  customErrorMessages: Partial<typeof defaultErrorMessages> = {}
) {
  const errorMessages = { ...defaultErrorMessages, ...customErrorMessages };

  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    'status' in (error as { response: { status: number } }).response
  ) {
    const err = error as { response: { status: number } };
    const message = errorMessages[err.response.status] || errorMessages.default;
    dispatch(
      setAlert({
        status: 'error',
        message,
      })
    );
  } else {
    dispatch(
      setAlert({
        status: 'error',
        message: `An error occurred: ${error}`,
      })
    );
  }
}
