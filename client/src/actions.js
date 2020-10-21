export const requestClientAccount = () => ({
  type: "REQUEST_CLIENT_ACCOUNT",
});
export const receiveClientAccount = (clientAccountData) => ({
  type: "RECEIVE_CLIENT_ACCOUNT",
  clientAccountData,
});
export const receiveClientAccountError = (error) => ({
  type: "RECEIVE_CLIENT_ACCOUNT_ERROR",
  error,
});
