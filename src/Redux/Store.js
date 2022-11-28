import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import CompSlice from "./CompReducers/CompSlice";
import logger from "redux-logger";

export const LocalStoreName = "POST_BOY";

function saveToLocalStorage(state) {
  try {
    const temp = { ...state };
    delete temp.api;
    const serialState = JSON.stringify(temp);
    localStorage.setItem(LocalStoreName, serialState);
  } catch (e) {
    console.warn(e);
  }
}
function loadFromLocalStorage() {
  try {
    const serialState = localStorage.getItem(LocalStoreName);
    if (serialState === null) return undefined;
    return JSON.parse(serialState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const Store = configureStore({
  reducer: {
    comp: CompSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  preloadedState: loadFromLocalStorage(),
});

Store.subscribe(() => saveToLocalStorage(Store.getState()));

setupListeners(Store.dispatch);

export default Store;
