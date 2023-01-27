import { createSlice } from "@reduxjs/toolkit";

const drawerSlice = createSlice({
  name: "drawer",
  initialState: true,
  reducers: {
    openMenu(state) {
      return (state = true);
    },

    closeMenu(state) {
      return (state = false);
    },
  },
});

const { actions, reducer } = drawerSlice;
export const { openMenu, closeMenu } = actions;
export default reducer;
