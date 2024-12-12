import { SnackbarMessage, useSnackbar } from 'notistack';
import { useCallback } from 'react';

export const useNotify = () => {
  const { enqueueSnackbar } = useSnackbar();
  const success = useCallback(
    (message: SnackbarMessage) =>
      enqueueSnackbar(message, { variant: 'success', autoHideDuration: 5000 }),
    [enqueueSnackbar],
  );
  const error = useCallback(
    (message: SnackbarMessage) =>
      enqueueSnackbar(message, { variant: 'error', autoHideDuration: 5000 }),
    [enqueueSnackbar],
  );
  const warning = useCallback(
    (message: SnackbarMessage) =>
      enqueueSnackbar(message, {
        variant: 'warning',
        autoHideDuration: 8000,
      }),
    [enqueueSnackbar],
  );
  const info = useCallback(
    (message: SnackbarMessage) => enqueueSnackbar(message, { variant: 'info' }),
    [enqueueSnackbar],
  );

  return {
    success,
    error,
    warning,
    info,
  };
};
