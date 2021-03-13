import { API_REQUEST, API_SUCCESS, API_FAILURE } from "./actions";

const initialState = {
    fetching: false,
    error: null,
    articles:[],
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case API_REQUEST:
            return { ...state, fetching: true, error: null };
        case API_SUCCESS:
            const { articles } = action.payload
            return { ...state, fetching:false, error: null, articles };
        case API_FAILURE:
            return { ...state, fetching: false, error: action.error };    
        default:
            return state;
    }
}