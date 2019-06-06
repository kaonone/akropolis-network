import * as React from 'react';

export function useModalOpenHandlers(setIsOpened: (isOpen: boolean) => void, setError: (error: string) => void) {
  const closeModal = React.useCallback(() => {
    setIsOpened(false);
  }, []);
  const openModal = React.useCallback(() => {
    setIsOpened(true);
  }, []);
  const closeErrorModal = React.useCallback(() => {
    setIsOpened(false);
    setError('');
  }, []);
  const onRetry = React.useCallback(() => {
    setError('');
    setIsOpened(true);
  }, []);
  const onError = React.useCallback((error: string) => {
    setError(error);
    console.error(error);
  }, []);

  return { openModal, closeModal, closeErrorModal, onError, onRetry };
}
