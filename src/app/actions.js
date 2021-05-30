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