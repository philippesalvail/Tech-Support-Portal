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
