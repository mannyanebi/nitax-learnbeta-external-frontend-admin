import { createSlice } from "@reduxjs/toolkit";
import {
  IAdvertisementMini,
  IAdvertisementStatus,
} from "../@types/advertisement";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState: IAdvertisementStatus = {
  advertisements: [],
  search: [],
  loading: false,
  delete: false,
  update: false,
};

export const advertisement = createSlice({
  name: "advertisement",
  initialState,
  reducers: {
    setAdvertisements: (state, action: PayloadAction<IAdvertisementMini[]>) => {
      state.advertisements = action.payload;
      state.search = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        state.search = state.advertisements.filter((item) =>
          item.name.toLowerCase().includes(action.payload.toLowerCase())
        );
      } else {
        state.search = state.advertisements;
      }
    },
    setLoading: (state) => {
      state.loading = !state.loading;
    },
    setUpdate: (state) => {
      state.update = !state.update;
    },
    setDelete: (state) => {
      state.delete = !state.delete;
    },
  },
});

export const {
  setAdvertisements,
  setFilter,
  setLoading,
  setUpdate,
  setDelete,
} = advertisement.actions;

export default advertisement.reducer;
