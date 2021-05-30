import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Action } from '../app/actions';
import { initialState } from '../app/reducer';
import SearchBar from './SearchBar';

const mockStore = configureMockStore([thunk]);

it('disables input while loading', () => {
    const store = mockStore({
        ...initialState,
        loading: true,
        query: "test query"
    });

    const component = render(
        <Provider store={store}>
            <SearchBar />
        </Provider>
    );
    const textInput = component.getByPlaceholderText(s => s.length > 0);
    const button = component.getByText("Search");

    expect(textInput).toBeDisabled();
    expect(button).toBeDisabled();
});

it('perform a search request', done => {
    const store = mockStore(initialState);

    const component = render(
        <Provider store={store}>
            <SearchBar />
        </Provider>
    );

    const query = "test query";
    store.subscribe(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: Action.SEARCH_REQUEST,
            query
        });
        done();
    });

    const form = component.getByRole("search");
    fireEvent.submit(form, { target: [{ value: query }] });
});