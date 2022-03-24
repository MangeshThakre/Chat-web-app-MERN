import { createSlice } from "@reduxjs/toolkit";
const initialCurrentUser = {
  token: null,
  user: null,
};

export const currentUserSplice = createSlice({
  name: "counter",
  initialState: initialCurrentUser,
  reducers: {
    TOKEN: (state, action) => {
      state.token = action.payload;
    },
    USER: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { TOKEN, USER } = currentUserSplice.actions;

export default currentUserSplice.reducer;
