import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        hobbies: [],
        date: "",
        hobbiesSaved: [],
    }
}

export const hobbiesSlice = createSlice({
    name: 'hobbies',
    initialState,
    reducers: {
        addHobbies : (state, action) => {
            console.log('addHobbies', action.payload);
            if(!state.value.hobbies.some(e=> e === action.payload)) {
                state.value.hobbies.push(action.payload);
            }
        },
        removeHobbiesLogout: (state, action) => {
            state.value.hobbies = [];
        },
        removeHobbiesResult: (state, action) => {
            console.log('removeHobbiesResult', action.payload);
            state.value.hobbies = state.value.hobbies.filter(e => e !== action.payload);
        },
        addDate : (state, action) => {
            console.log('addDate', action.payload);
            state.value.date = action.payload;
        },
        storeHobbiesSaved: (state, action) => {
            console.log('addSaved',action.payload);
            action.payload.forEach(e => {
            if(!state.value.hobbiesSaved.some(f => f === e)) 
            {
                state.value.hobbiesSaved.push(e);
            }
        })
        },
        removeHobbiesSaved: (state, action) => {
            console.log('removeSaved',action.payload);
            state.value.hobbiesSaved = state.value.hobbiesSaved.filter(e => e !== action.payload)
        },
        removeHobbies: (state, action) => {
            console.log(('remove hobbies', action.payload));
            state.value.hobbies = state.value.hobbies.filter(e => e !== action.payload)
        }
    }
});

export const { addHobbies, removeHobbies, addDate, storeHobbiesSaved, removeHobbiesSaved, removeHobbiesLogout } = hobbiesSlice.actions;
export default hobbiesSlice.reducer;