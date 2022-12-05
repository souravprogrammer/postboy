import { createSlice } from "@reduxjs/toolkit";
import uuid4 from "uuid4";

const initialState = [];
//  {
//   method: "",
//   url: "",
//   body: "",
//   headers: "",
// }

const CollectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    CreateCollection: (state, action) => {
      state.push({
        name: action?.payload?.name ?? "",
        uuid: uuid4(),
        request: [],
      });
    },
  },
  AddRequestInCollection: (state, action) => {
    state = state?.map((m, i) => {
      return m.uuid === action?.payload?.collectionuuid
        ? {
            ...m,
            request: [
              ...m.request,
              {
                name: action?.payload?.name,
                uuid: action?.payload?.requestuuid,
              },
            ],
          }
        : m;
    });
  },
});

export default CollectionSlice.reducer;
export const { CreateCollection, AddRequestInCollection } =
  CollectionSlice.actions;
