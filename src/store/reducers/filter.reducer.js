export const SET_FILTER = 'SET_FILTER'

const initialState = {
    filterBy: {
        name: '',
        inStock: null,
        labels: [],
    },
}

export function filterReducer( state = initialState, cmd = {}) {
    switch(cmd.type){
        case SET_FILTER: {
            return { ...state, filterBy: cmd.filterBy}
        }
        default: { 
            return state
        }
    }
}
