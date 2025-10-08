export const SET_TOYS = 'SET_TOYS'
export const UPDATE_TOY = 'UPDATE_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const SET_ISLOADING = 'SET_ISLOADING'

const initialState = {
    toys: [],
    isLoading: false,
}

export function toysReducer(state = initialState, cmd = {}) {
    switch(cmd.type) {
        case SET_TOYS: {
            return { ...state, toys: cmd.toys }
        }
        case UPDATE_TOY: {
            return {
                ...state,
                toys: state.toys.map((toy) => (toy.id === cmd.toy.id ? cmd.toy : toy)),
            }
        }
        case REMOVE_TOY: {
            return {
                ...state,
                toys: state.toys.filter((toy) => toy.id !== cmd.toy.id),
            }
        }
        case ADD_TOY: {
            return { ...state, toys: [...state.toys, cmd.toy] }
        }
        case SET_ISLOADING: {
            return { ...state, isLoading: cmd.isLoading }
        }
        default: {
            return state
        }
    }

}
