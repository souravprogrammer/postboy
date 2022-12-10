import { createSlice } from "@reduxjs/toolkit";
import { NewRequest } from "../RequestReducers/RequestSlice";

const initialState = {
  sideBar: true,
  page: "coll",
  parentPage: "",
  currentCollection: "",
  tabOpen: [],
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
    ChangeCollection: (state, action) => {
      state.currentCollection = action.payload;
    },
    OpenTab: (state, action) => {
      // state.tabOpen = [];
      if (!state.tabOpen.includes(action.payload)) {
        state.tabOpen.push(action.payload);
      }
    },
    CloseTab: (state, action) => {
      const index = state.tabOpen.indexOf(action.payload);

      if (index > -1) {
        state.tabOpen.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(NewRequest, (state, action) => {
      if (!state.tabOpen.includes(action.payload?.uuid)) {
        state.tabOpen.push(action.payload?.uuid);
      }
    });
  },
});

export default compsSlice.reducer;
export const {
  ChangeSideBar,
  ChangeCurrentPage,
  ChangeParentPage,
  ChangeCollection,
  OpenTab,
  CloseTab,
} = compsSlice.actions;
