const initialState = {
  tickets: null,
};

export default function AdminAccountReducer(state = initialState, action) {
  console.log("Action: ", action);
  switch (action.type) {
    case "RECEIVE_ADMIN_PROFILE": {
      return {
        status: "idle",
        tickets: action.supportData,
      };
    }
    case "REQUEST_ADMIN_PROFILE_ERROR": {
      return {
        ...state,
        status: action.error,
      };
    }

    case "DESTROY_ADMIN_PROFILE": {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
