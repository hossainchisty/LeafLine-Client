import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    resetUserInfo: (state) => {
      state.userInfo = {};
    },
  },
});

export const { setUserInfo, resetUserInfo } = userSlice.actions;
export default userSlice.reducer;
