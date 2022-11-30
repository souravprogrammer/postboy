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
      // const keys = Object.keys(action?.payload);
      // const obj = {};
      // for (let k of keys) {
      //   obj[k] = action.payload[k];
      // }
      // state[action?.payload.uuid] = { ...state[action?.payload.uuid], ...obj };
      // console.log(state, obj);
      //   state.req.push(obj);
      //   state.sideBar = !state.sideBar;

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
