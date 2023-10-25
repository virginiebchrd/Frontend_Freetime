import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        hobbies: [],
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
        removeHobbies: (state, action) => {
            console.log('removeHobbies', action.payload);
            state.value.hobbies = state.value.hobbies.filter(e => e !== action.payload);
        }
    }
});

export const { addHobbies, removeHobbies } = hobbiesSlice.actions;
export default hobbiesSlice.reducer;