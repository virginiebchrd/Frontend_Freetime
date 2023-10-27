import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    email: "",
    password: "",
    token: null,
    civility:"",
    lastname: "",
    firstname: "",
    birthday: "",
  },
};

export const userSlice = createSlice({
  name: "userReducer",

  initialState,
  reducers: {
    //email
    addEmail: (state, action) => {
      state.value.email = action.payload; //state.value.email.push(action.payload);
    },
    removeEmail: (state, action) => {
      state.value.email = state.value.email.filter(
        (email) => email !== action.payload
      );
    },
    //password
    addPassword: (state, action) => {
      state.value.password = action.payload; // state.value.password.push(action.payload);
    },
    
    removePassword: (state, action) => {
      state.value.password = state.value.password.filter(
        (password) => password !== action.payload
      );
    },
    addCivility: (state, action) => {
      state.value.civility = action.civility;
    },
    addLastname: (state, action) => {
      state.value.lastname = action.payload;
    },
    addFirstname: (state, action) => {
      state.value.firstname = action.payload;
    },
    addBirthday: (state, action) => {
      state.value.birthday = action.payload;
    },

    //connect
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.lastname = action.payload.lastname;  
      state.value.firstname = action.payload.firstname;
    },
    logout: (state) => {
      state.value.token = null;
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
  addCivility,
  addLastname,
  addFirstname,
  addBirthday,
} = userSlice.actions;
export default userSlice.reducer;
