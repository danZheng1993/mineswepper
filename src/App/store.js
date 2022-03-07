import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import mineFieldReducer from "./reducer";
import mineFieldSagas from "./saga";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const middleware = [...getDefaultMiddleware({ thunk: false }), ...middlewares];

const store = configureStore({
  reducer: {
    mineField: mineFieldReducer,
  },
  middleware: middleware,
});

sagaMiddleware.run(mineFieldSagas);

export default store;
