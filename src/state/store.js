import { createStore as reduxCreateStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

/*
 * action types
 */

const SET_SCREEN_SEQUENCE = "SET_SCREEN_SEQUENCE";
const SET_LAST_SCREEN = "SET_LAST_SCREEN";
const SET_SIDEBAR_VISIBLE = "SET_SIDEBAR_VISIBLE";

/*
 * action creators
 */

export function setScreenSequence(val) {
  return { type: SET_SCREEN_SEQUENCE, val };
}

export function setLastScreen(val) {
  return { type: SET_LAST_SCREEN, val };
}

export function setSidebarVisible(val) {
  return { type: SET_SIDEBAR_VISIBLE, val };
}

/*
 * reducer
 */
const reducer = (state, action) => {
  switch (action.type) {
    case SET_SCREEN_SEQUENCE:
      return {
        ...state,
        screenSequence: action.val
      };

    case SET_LAST_SCREEN:
      return {
        ...state,
        lastScreen: action.val.obj,
        lastScreenPath: action.val.path
      };

    case SET_SIDEBAR_VISIBLE:
      return {
        ...state,
        sidebarVisible: action.val
      };

    default:
      return state;
  }
};

const initialState = {
  screenSequence: [],
  lastScreen: null,
  lastScreenPath: "",
  sidebarVisible: false
};

const createStore = () =>
  reduxCreateStore(reducer, initialState, composeWithDevTools(applyMiddleware()));
export default createStore;
