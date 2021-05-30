import { nextPage, prevPage, searchFailure, searchRequest, searchSuccess, sortResult } from "./actions";
import { initialState, reducer, BOOKS_PER_PAGE } from "./reducer"

it('initializes the state', () => {
    expect(reducer(undefined, { type: "empty" })).toEqual(initialState);
});


// Pagination tests
it('increments the page', () => {
    expect(reducer({
        page: 0,
        result: new Array(BOOKS_PER_PAGE * 2)
    }, nextPage()).page).toEqual(1);
})

it('decrements the page', () => {
    expect(reducer({
        page: 5
    }, prevPage()).page).toEqual(4);
})

it('prevent incrementing page number past limit', () => {
    expect(reducer({
        page: 2,
        result: new Array(BOOKS_PER_PAGE * 3)
    }, nextPage()).page).toEqual(2);
});

it('prevent decrementing page number below', () => {
    expect(reducer({
        page: 0
    }, prevPage()).page).toEqual(0);
});


// Search tests
it('sets loading and query properties on request', () => {
    const query = "test query";
    const state = reducer(undefined, searchRequest(query));
    expect(state.loading).toBe(true);
    expect(state.query).toEqual(query);
});

it('loads the search results on success', () => {
    const result = new Array(10).fill(0).map(() => Math.random());
    const newState = reducer(undefined, searchSuccess(result));
    expect(newState.loading).toBe(false);
    expect(newState.result).toEqual(result);
    expect(newState.error).toBeFalsy();
});

it('sets error message on failure', () => {
    const error = "error message";
    const newState = reducer(undefined, searchFailure(error));
    expect(newState.loading).toBe(false);
    expect(newState.result.length).toEqual(0);
    expect(newState.error).toEqual(error);
});


// Sort test
it('sorts by a given property', () => {
    const result = new Array(10).fill(0).map(() => ({ 'a': Math.random(), 'b': Math.random() }));
    let state = reducer(undefined, searchSuccess([...result]));
    
    state = reducer(state, sortResult('a'));
    result.sort((a,b) => a['a'] - b['a']);
    expect(state.result).toEqual(result);

    state = reducer(state, sortResult('a', true));
    result.reverse();
    expect(state.result).toEqual(result);
    
    state = reducer(state, sortResult('b'));
    result.sort((a,b) => a['b'] - b['b']);
    expect(state.result).toEqual(result);
    
    state = reducer(state, sortResult('b', true));
    result.reverse();
    expect(state.result).toEqual(result);
})