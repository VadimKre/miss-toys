import { combineReducers, createStore } from "redux"

import { toysReducer  } from "./reducers/toys.reducer.js"
import { filterReducer } from "./reducers/filter.reducer.js"

const initialState = {}

const rootReducer = combineReducers({
    toysModule: toysReducer,
    filterModule: filterReducer
})


export const store = createStore(rootReducer)

window.gStore = store

store.subscribe( () => {
    console.log('Current state: ', store.getState())
})