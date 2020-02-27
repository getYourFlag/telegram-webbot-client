import errorMsg from "../../../config/errors.json";

const initialState = {
  loggedIn: localStorage.getItem("user_nick"),
  error: null,
  loading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "auth.AUTHENTICATING":
      return { ...state, loading: true };
    case "auth.ERROR":
      return { ...state, error: action.error, loggedIn: false };
    case "auth.SUCCESS":
      return { ...state, error: null, loggedIn: true };
    case "auth.LOGOUT":
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_nick");
      return { ...state, loggedIn: false };
    default:
      return state;
  }
};

export default authReducer;
