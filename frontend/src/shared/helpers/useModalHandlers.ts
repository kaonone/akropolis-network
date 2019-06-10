import * as React from 'react';

export function useModalHandlers() {
  const [isOpened, setIsOpened] = React.useState(false);
  const [error, setError] = React.useState('');

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
  const onError = React.useCallback((_error: string) => {
    setError(_error);
    console.error(_error);
  }, []);

  return { isOpened, error, openModal, closeModal, closeErrorModal, onError, onRetry };
}
