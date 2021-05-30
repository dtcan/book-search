import { search, BOOKS_PER_RESPONSE } from '../api/API';

export const Action = {
    SEARCH_REQUEST: "SEARCH_REQUEST",
    SEARCH_SUCCESS: "SEARCH_SUCCESS",
    SEARCH_FAILURE: "SEARCH_FAILURE",
    NEXT_PAGE: "NEXT_PAGE",
    PREV_PAGE: "PREV_PAGE"
}

export function searchRequest(query) {
    return {
        type: Action.SEARCH_REQUEST,
        query
    }
}

export function searchSuccess(result) {
    return {
        type: Action.SEARCH_SUCCESS,
        result
    }
}

export function searchFailure(error) {
    return {
        type: Action.SEARCH_FAILURE,
        error
    }
}

export function fetchSearchResults(query) {
    return async dispatch => {
        dispatch(searchRequest(query));
        try {
            const result = await search(query);
            if (result.numFound > BOOKS_PER_RESPONSE) {
                const results = await Promise.all(new Array(Math.ceil(result.numFound / BOOKS_PER_RESPONSE) - 1).map((_, i) => search(query, i + 1)))
                for(let newResult of results) {
                    result.books.push.apply(result.books, newResult.books);
                }
            }
            return dispatch(searchSuccess(result));
        }catch(error) {
            return dispatch(searchFailure(error));
        }
    }
}

export function nextPage() {
    return {
        type: Action.NEXT_PAGE
    }
}

export function prevPage() {
    return {
        type: Action.PREV_PAGE
    }
}