import { Action } from "./actions"

export const initialState = {
    page: 0,
    query: "",
    loading: false,
    result: [],
    error: ""
}
export const BOOKS_PER_PAGE = 40;

export function reducer(state = initialState, action) {
    switch(action.type) {
        case Action.SEARCH_REQUEST:
            return {...state, loading: true, query: action.query, result: [], error: ""}
        case Action.SEARCH_SUCCESS:
            return {...state, loading: false, result: action.result}
        case Action.SEARCH_FAILURE:
            return {...state, loading: false, error: action.error}
        case Action.NEXT_PAGE:
            let nextPage = state.page + 1;
            let numPages = Math.ceil(state.result.length / BOOKS_PER_PAGE);
            if(nextPage >= numPages) {
                nextPage = numPages - 1;
            }
            return {...state, page: nextPage}
        case Action.PREV_PAGE:
            return {...state, page: Math.max(0, state.page - 1)}
        default: return state
    }
}