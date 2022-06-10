import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shoesUpdate: {
    _id: "",
    shoesName: "",
    shoesPrice: 0,
    shoesImage: "",
  },
  shoesSearch: [
    {
      _id: "",
      shoesName: "",
      shoesPrice: 0,
      shoesImage: "",
    },
  ],

  statusDelete: false,
  statusLogin: false,
};

const shoesSlice = createSlice({
  name: "shoesSlice",
  initialState,
  reducers: {
    getShoesReducer: (state, action) => {
      state.shoesUpdate = action.payload;
    },
    searchShoesReducer: (state, action) => {
      state.shoesSearch = action.payload;
    },
    setStatusDelete: (state, action) => {
      state.statusDelete = action.payload;
    },
    setStatusLogin: (state, action) => {
      state.statusLogin = action.payload;
    },
  },
});

export const {
  getShoesReducer,
  searchShoesReducer,
  setStatusDelete,
  setStatusLogin,
} = shoesSlice.actions;
export default shoesSlice.reducer;
