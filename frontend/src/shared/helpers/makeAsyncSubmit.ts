export function makeAsyncSubmit<FormData = object, R = void>(
  action: (values: FormData) => Promise<R>,
  onSuccess: (result?: R) => void,
  onError?: (error: string) => void,
) {
  return async (values: FormData) => {
    try {
      const result = await action(values);
      onSuccess(result);
    } catch (e) {
      onError && onError(String(e));
    }
  };
}
