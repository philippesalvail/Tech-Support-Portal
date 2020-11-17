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

export const requestProfile = () => ({
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

export const receiveAdminProfileError = (error) => ({
  type: "REQUEST_ADMIN_PROFILE_ERROR",
  error,
});

export const receiveAdminProfile = (supportData) => ({
  type: "RECEIVE_ADMIN_PROFILE",
  supportData,
});

export const destroyAdminProfileError = (setAccountToNull) => ({
  type: "DESTROY_ADMIN_PROFILE",
  setAccountToNull,
});
