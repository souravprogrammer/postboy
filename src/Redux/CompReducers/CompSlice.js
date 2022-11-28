import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sideBar: true,
  page: "",
  parentPage: "",
};

const compsSlice = createSlice({
  name: "comps",
  initialState,
  reducers: {
    ChangeSideBar: (state) => {
      state.sideBar = !state.sideBar;
    },
    ChangeCurrentPage: (state, action) => {
      state.page = action.payload;
    },
    ChangeParentPage: (state, action) => {
      state.parentPage = action.payload;
    },
  },
});

export default compsSlice.reducer;
export const { ChangeSideBar, ChangeCurrentPage, ChangeParentPage } =
  compsSlice.actions;
