import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        hobbies: [],
        hobbiesSaved: [],
        date: "",

        who: "",

        //Activité sélectionnée
        hobbiesPerso: [],
        hobbiesFamille: [],
        hobbiesAmis: [],

        //Activité validée en DB
        hobbiesSavedPerso : [],
        hobbiesSavedFamille : [],
        hobbiesSavedAmis : [],
    }
}

export const hobbiesSlice = createSlice({
    name: 'hobbies',
    initialState,
    reducers: {
        addHobbies : (state, action) => {
            if(!state.value.hobbies.some(e=> e === action.payload)) {
                state.value.hobbies.push(action.payload);
            }
        },
        removeHobbiesLogout: (state, action) => {
            state.value.hobbiesPerso = [];
            state.value.hobbiesFamille = [];
            state.value.hobbiesAmis = [];
            state.value.hobbiesSavedPerso = [];
            state.value.hobbiesSavedFamille = [];
            state.value.hobbiesSavedAmis = [];
        },
        removeHobbiesResult: (state, action) => {
            state.value.hobbies = state.value.hobbies.filter(e => e !== action.payload);
        },
        addDate : (state, action) => {
            state.value.date = action.payload;
        },
        storeHobbiesSaved: (state, action) => {
            action.payload.forEach(e => {
            if(!state.value.hobbiesSaved.some(f => f === e)) 
            {
                state.value.hobbiesSaved.push(e);
            }
        })
        },
        removeHobbiesSaved: (state, action) => {
            state.value.hobbiesSaved = state.value.hobbiesSaved.filter(e => e !== action.payload)
        },
        removeHobbies: (state, action) => {
            state.value.hobbies = state.value.hobbies.filter(e => e !== action.payload)
        },

        chooseWho : (state, action) => {
            state.value.who = action.payload;
        },
        addHobbiesPerso : (state, action) => {
            if(!state.value.hobbiesPerso.some(e=> e === action.payload)) {
                state.value.hobbiesPerso.push(action.payload);
            }
        },
        addHobbiesFamille : (state, action) => {
            if(!state.value.hobbiesFamille.some(e=> e === action.payload)) {
                state.value.hobbiesFamille.push(action.payload);
            }
        },
        addHobbiesAmis : (state, action) => {
            if(!state.value.hobbiesAmis.some(e=> e === action.payload)) {
                state.value.hobbiesAmis.push(action.payload);
            }
        },

        storeHobbiesSavedPerso: (state, action) => {
            action.payload.forEach(e => {
                if(!state.value.hobbiesSavedPerso.some(f => f === e)) 
                {
                    state.value.hobbiesSavedPerso.push(e);
                }
            })
        },
        storeHobbiesSavedFamille: (state, action) => {
            action.payload.forEach(e => {
                if(!state.value.hobbiesSavedFamille.some(f => f === e)) 
                {
                    state.value.hobbiesSavedFamille.push(e);
                }
            })
        },
        storeHobbiesSavedAmis: (state, action) => {
            action.payload.forEach(e => {
                if(!state.value.hobbiesSavedAmis.some(f => f === e)) 
                {
                    state.value.hobbiesSavedAmis.push(e);
                }
            })
        },

        removeHobbiesSavedPerso: (state, action) => {
            state.value.hobbiesSavedPerso = state.value.hobbiesSavedPerso.filter(e => e !== action.payload)
        },
        removeHobbiesSavedFamille: (state, action) => {
            state.value.hobbiesSavedFamille = state.value.hobbiesSavedFamille.filter(e => e !== action.payload)
        },
        removeHobbiesSavedAmis: (state, action) => {
            state.value.hobbiesSavedAmis = state.value.hobbiesSavedAmis.filter(e => e !== action.payload)
        },
        removeHobbiesAmis: (state, action) => {
            state.value.hobbiesAmis = state.value.hobbiesAmis.filter(e => e !== action.payload)
        },

        removeHobbiesPerso: (state, action) => {
            state.value.hobbiesPerso = state.value.hobbiesPerso.filter(e => e !== action.payload)
        },
        removeHobbiesFamille: (state, action) => {
            state.value.hobbiesFamille = state.value.hobbiesFamille.filter(e => e !== action.payload)
        }
    }
});

export const { addHobbies, 
    removeHobbies, 
    addDate, 
    storeHobbiesSaved, 
    removeHobbiesSaved, 
    removeHobbiesLogout, 
    storeHobbiesSavedAmis, 
    storeHobbiesSavedPerso, 
    storeHobbiesSavedFamille, 
    removeHobbiesAmis, 
    removeHobbiesPerso, 
    removeHobbiesFamille, 
    removeHobbiesSavedAmis, 
    removeHobbiesSavedFamille, 
    removeHobbiesSavedPerso, 
    addHobbiesAmis, 
    addHobbiesFamille, 
    addHobbiesPerso,
    chooseWho 
} = hobbiesSlice.actions;
export default hobbiesSlice.reducer;