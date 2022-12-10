import { createSlice } from "@reduxjs/toolkit";
import { CloseTab } from "../CompReducers/CompSlice";

const initialState = {};
//  {
//   method: "",
//   url: "",
//   body: "",
//   headers: "",
// }

const RequestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    ChangeRequest: (state, action) => {
      state[action.payload.uuid] = {
        ...state[action.payload.uuid],
        ...action.payload,
      };
    },
    NewRequest: (state, action) => {
      state[action.payload.uuid] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CloseTab, (state, action) => {
      if (!state[action.payload].collectionuuid) {
        delete state[action.payload];
      }
    });
  },
});

export default RequestSlice.reducer;
export const { ChangeRequest, NewRequest } = RequestSlice.actions;
