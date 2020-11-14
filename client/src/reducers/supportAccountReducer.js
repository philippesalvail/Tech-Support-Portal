const initialState = {
  agent: null,
  agentTickets: null,
  status: "idle",
};

export default function SupportAccountReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_SUPPORTER_PROFILE": {
      return {
        ...state,
        status: "Loading",
      };
    }
    case "RECEIVE_SUPPORT_PROFILE": {
      return {
        status: "Idle",
        agent: action.supportData.agent,
        agentTickets: action.supportData.getAgentTickets,
      };
    }
    case "REQUEST_SUPPORT_PROFILE_ERROR": {
      return {
        ...state,
        status: action.error,
      };
    }
    case "DESTROY_SUPPORT_PROFILE": {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
