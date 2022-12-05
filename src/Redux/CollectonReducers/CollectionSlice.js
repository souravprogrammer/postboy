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
    AddRequestInCollection: (state, action) => {
      for (let collection of state) {
        if (collection.uuid === action?.payload?.collectionuuid) {
          collection.request.push({
            name: action?.payload?.name,
            uuid: action?.payload?.requestuuid,
          });
        }
      }
    },
  },
});

export default CollectionSlice.reducer;
export const { CreateCollection, AddRequestInCollection } =
  CollectionSlice.actions;
