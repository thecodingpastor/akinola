import { createContext, useReducer } from "react";
import GlobalReducers from "./GlobalReducers";

import { SET_ALERT_TYPE, TOGGLE_SHOW_MODAL_TYPE } from "./GlobalTypes";

const INITIAL_STATE = {
  AlertPopup: null,
  ShowModal: false,
  GlobalError: null,
};

const GlobalContext = createContext(INITIAL_STATE);

export const GlobalContextProvider = ({ children }) => {
  const [state, GlobalDispatch] = useReducer(GlobalReducers, INITIAL_STATE);

  const SetAlert = (data) =>
    GlobalDispatch({ type: SET_ALERT_TYPE, payload: data });

  const ToggleModal = () => GlobalDispatch({ type: TOGGLE_SHOW_MODAL_TYPE });

  const context = {
    ShowModal: state.ShowModal,
    ToggleModal,
    AlertPopup: state.AlertPopup,
    SetAlert,
    GlobalError: state.GlobalError,
  };

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContext;
