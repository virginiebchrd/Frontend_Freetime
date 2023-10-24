import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  value: { email: "", password: "", token: null },
};

export const userSlice = createSlice({
  name: "userReducer",

  initialState,
  reducers: {
    //email
    //updateEmail: (state, action) => {
    //  state.value.email = action.payload;
    //},
    addEmail: (state, action) => {
      state.value.email = action.payload;//state.value.email.push(action.payload);
    },
    removeEmail: (state, action) => {
      state.value.email = state.value.email.filter(
        (email) => email !== action.payload
      );
    },
    //password
    addPassword: (state, action) => {
      state.value.password = action.payload;// state.value.password.push(action.payload);
    },
   // updatePassword: (state, action) => {
   //   state.value.password = action.payload;
   // },
    removePassword: (state, action) => {
      state.value.password = state.value.password.filter(
        (password) => password !== action.payload
      );
    },
    //connect
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.username;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.email = "";
      state.value.password = "";
    },
  },
});

export const {
  updateEmail,
  addEmail,
  removeEmail,
  updatePassword,
  addPassword,
  removePassword,
  login,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
