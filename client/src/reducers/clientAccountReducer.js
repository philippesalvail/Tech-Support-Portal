const initialState = {
  status: "idle",
  userName: undefined,
};

export default function ClientAccountReducer(state = initialState, action) {
  console.log("ClientAccountReducer: ", action);
  switch (action.type) {
    case "REQUEST_CLIENT_ACCOUNT": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_CLIENT_ACCOUNT": {
      return {
        status: "idle",
        userName: action.clientAccountData.username,
        loginInfo: action.clientAccountData.loginInfo,
        billingInfo: action.clientAccountData.billingInfo,
      };
    }
    case "RECEIVE_CLIENT_ACCOUNT_ERROR": {
      return {
        ...state,
        status: action.error,
      };
    }

    default: {
      return state;
    }
  }
}
