import { createSlice } from "@reduxjs/toolkit";

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
      console.log("cnange : ", {
        ...state[action.payload.uuid],
      });

      state[action.payload.uuid] = {
        ...state[action.payload.uuid],
        ...action.payload,
      };
    },
  },
});

export default RequestSlice.reducer;
export const { ChangeRequest } = RequestSlice.actions;
