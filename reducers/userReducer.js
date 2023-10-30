import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  value: {
    email: "",
    password: "",
    token: "",
    civility:"",
    lastname: "",
    firstname: "",
    city: {},
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
 
    addCity: (state,action) => {
      console.log('city', action.payload);
      state.value.city = action.payload;
    },
    //connect
    login: (state, action) => {
      console.log(action.payload)
      state.value.token = action.payload.token;
      state.value.firstname = action.payload.firstname;
      state.value.lastname = action.payload.lastname;
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
  addCity,
  login,
  logout,
  addCivility,
  addLastname,
  addFirstname,
  } = userSlice.actions;
export default userSlice.reducer;
