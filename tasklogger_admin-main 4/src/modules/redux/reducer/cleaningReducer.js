const initialState = {
  blocks: [],
  locations: [],
  userLoggedIn: false,
  user: {},
  allUsers: [],
};

const cleanerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "INITILIZE_LOCATIONS": {
      return { ...state, locations: payload };
    }
    case "ALL_USERS": {
      return {
        ...state,
        user: { ...state.user, ...payload.userInfo },
        allUsers: payload.otherUsersColl,
      };
    }
    case "LOGIN_USER": {
      return { ...state, userLoggedIn: true, user: payload };
    }
    case "LOGOUT_USER": {
      return { ...initialState };
    }
    default:
      return state;
  }
};

export default cleanerReducer;
