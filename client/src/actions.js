export const requestUserAccount = () => ({
  type: "REQUEST_USER_ACCOUNT",
});
export const receiveUserAccount = (clientAccountData) => ({
  type: "RECEIVE_USER_ACCOUNT",
  clientAccountData,
});
export const receiveUserAccountError = (error) => ({
  type: "RECEIVE_USER_ACCOUNT_ERROR",
  error,
});
