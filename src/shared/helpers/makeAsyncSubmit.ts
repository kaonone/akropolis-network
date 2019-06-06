export function makeAsyncSubmit<FormData = object>(
  action: (values: FormData) => Promise<void>,
  changeRequest: (isRequesting: boolean) => void,
  onSuccess: () => void,
  onError?: (error: string) => void,
) {
  return async (values: FormData) => {
    try {
      changeRequest(true);
      await action(values);
      changeRequest(false);
      onSuccess();
    } catch (e) {
      changeRequest(false);
      onError && onError(String(e));
    }
  };
}
