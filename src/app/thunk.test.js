import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Action, fetchSearchResults } from './actions';
import { initialState } from './reducer';

import testResponse1 from './testJSON/testResponse1.json';
import testResponse2 from './testJSON/testResponse2.json';
import testResult from './testJSON/testResult.json';

const mockStore = configureMockStore([thunk]);

afterEach(() => fetchMock.restore());

it('does a full search request', done => {
    fetchMock.getOnce(s => s.endsWith(1), testResponse1).getOnce(s => s.endsWith(2), testResponse2);
    
    const query = "great gatsby";
    const expectedActions = [
        {
            type: Action.SEARCH_REQUEST,
            query
        },
        {
            type: Action.SEARCH_SUCCESS,
            result: testResult
        }
    ];

    const store = mockStore(initialState);
    store.dispatch(fetchSearchResults(query)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
    });
});

it('handles a failed search', done => {
    fetchMock.getOnce(s => s.endsWith(1), testResponse1).getOnce(s => s.endsWith(2), 404);

    const store = mockStore(initialState);
    store.dispatch(fetchSearchResults("test query")).then(() => {
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(Action.SEARCH_REQUEST);
        expect(actions[1].type).toBe(Action.SEARCH_FAILURE);
        expect(actions[1].error).toBeTruthy();
        done();
    });
})