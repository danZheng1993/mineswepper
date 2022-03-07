import { createReducer } from "@reduxjs/toolkit";
import { setDocument, setMap, setLog } from "./actions";

const initialState = {
  document: "",
  log: "",
  map: [],
};

const mineFieldReducer = createReducer(initialState, (builder) => {
  builder.addCase(setDocument.type, (state, action) => {
    state.document = action.payload;
  });
  builder.addCase(setMap.type, (state, action) => {
    const data = action.payload.slice(5);
    const rows = data.split("\n").slice(0, -1);
    const parsedMap = rows.map((row) => row.split(""));
    state.map = parsedMap;
  });
  builder.addCase(setLog.type, (state, action) => {
    state.log = action.payload;
  });
});

export default mineFieldReducer;
