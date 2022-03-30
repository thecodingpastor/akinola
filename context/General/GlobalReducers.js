import {
  GLOBAL_ERROR_TYPE,
  SET_ALERT_TYPE,
  TOGGLE_SHOW_MODAL_TYPE,
  SET_PAGE_IS_ROUTING_TYPE,
} from "./GlobalTypes";

const GlobalReducers = (state, action) => {
  switch (action.type) {
    case GLOBAL_ERROR_TYPE:
      return {
        ...state,
        GlobalIsLoading: false,
        GlobalError: action.payload,
      };
    case SET_ALERT_TYPE:
      return {
        ...state,
        AlertPopup: action.payload,
      };
    case TOGGLE_SHOW_MODAL_TYPE: {
      return {
        ...state,
        ShowModal: !state.ShowModal,
      };
    }
    default:
      return state;
  }
};

export default GlobalReducers;
