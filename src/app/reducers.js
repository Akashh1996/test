import actionTypes from './actions';
export default function todoReducer(state, action) {
    console.log(action);
    switch (action.type) {
        case actionTypes.ADD_TODO:
            return {
                ...state,
                list: [...state.list, action.payload],
            };
        case actionTypes.REMOVE_TODO:
            return {
                ...state,
                list: [...state.list.filter((todo) => todo !== action.payload)],
            };
    }
}

const getpokemonReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.GET_POKEMON:
            return {
                ...state,
                count: action.payload.count,
                results: action.payload.results,
            };
        default:
            return state;
    }
}

export { getpokemonReducer }