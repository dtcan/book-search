import { Action } from "./actions"

export const initialState = {
    page: 0,
    query: "",
    loading: false,
    result: [],
    error: "",
    sortKey: "title",
    sortDesc: false
}
export const BOOKS_PER_PAGE = 40;

function sortResult(result, key, desc) {
    result.sort((a,b) => {
        if(a[key] === b[key]) {
            return 0;
        }else if(a[key] < b[key]) {
            return desc ? 1 : -1;
        }
        return desc ? -1 : 1;
    });
}

export function reducer(state = initialState, action) {
    switch(action.type) {
        case Action.SEARCH_REQUEST:
            return {...state, loading: true, query: action.query, result: [], error: ""}
        case Action.SEARCH_SUCCESS:
            sortResult(action.result, state.sortKey);
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
        case Action.SORT_RESULT:
            if(action.key !== state.sortKey || action.desc !== state.sortDesc) {
                sortResult(state.result, action.key, action.desc);
            }
            return {...state, sortKey: action.key, sortDesc: action.desc}
        default: return state
    }
}