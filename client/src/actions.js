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

export const requestSupporterProfile = () => ({
  type: "REQUEST_SUPPORT_PROFILE",
});

export const receiveSupporterProfile = (supportData) => ({
  type: "RECEIVE_SUPPORT_PROFILE",
  supportData,
});
export const receiveSupporterProfileError = (error) => ({
  type: "REQUEST_SUPPORT_PROFILE_ERROR",
  error,
});

export const destroySupporterProfileError = (setAccountToNull) => ({
  type: "DESTROY_SUPPORT_PROFILE",
  setAccountToNull,
});
