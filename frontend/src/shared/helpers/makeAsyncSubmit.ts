export function makeAsyncSubmit<FormData = object>(
  action: (values: FormData) => Promise<void>,
  onSuccess: () => void,
  onError?: (error: string) => void,
) {
  return async (values: FormData) => {
    try {
      await action(values);
      onSuccess();
    } catch (e) {
      onError && onError(String(e));
    }
  };
}
