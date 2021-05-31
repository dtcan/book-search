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
    return [...result].sort((a,b) => {
        const aKey = a[key]?.toLowerCase?.() ?? a[key];
        const bKey = b[key]?.toLowerCase?.() ?? b[key];
        if(aKey === bKey) {
            return 0;
        }else if(aKey === undefined) {
            return 1;
        }else if(bKey === undefined) {
            return -1;
        }else if((aKey > bKey) === desc) {
            return -1;
        }
        return 1;
    });
}

export function reducer(state = initialState, action) {
    switch(action.type) {
        case Action.SEARCH_REQUEST:
            return {...state, loading: true, query: action.query, result: [], error: ""}
        case Action.SEARCH_SUCCESS:
            return {...state, loading: false, result: sortResult(action.result, state.sortKey, state.sortDesc)}
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
            let newResult = state.result;
            if(action.key !== state.sortKey || action.desc !== state.sortDesc) {
                newResult = sortResult(state.result, action.key, action.desc);
            }
            return {...state, result: newResult, sortKey: action.key, sortDesc: action.desc}
        default: return state
    }
}