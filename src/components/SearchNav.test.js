import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Action } from '../app/actions';
import { BOOKS_PER_PAGE, initialState } from '../app/reducer';
import SearchNav from './SearchNav';

const mockStore = configureMockStore();


// Rendering
it('renders details about results', () => {
    const store = mockStore({
        ...initialState,
        page: 2,
        query: "test query",
        result: new Array(Math.floor(BOOKS_PER_PAGE * 4))
    });

    const component = render(
        <Provider store={store}>
            <SearchNav />
        </Provider>
    );

    expect(component.getByText(s => s.includes((BOOKS_PER_PAGE * 2) + 1))).toBeInTheDocument(); // First index
    expect(component.getByText(s => s.includes(BOOKS_PER_PAGE * 3))).toBeInTheDocument(); // Last index
    expect(component.getByText(s => s.includes(BOOKS_PER_PAGE * 4))).toBeInTheDocument(); // Total number of results
});

it('renders nothing on error', () => {
    const store = mockStore({
        ...initialState,
        query: "test query",
        error: "Some error occured"
    });

    const component = render(
        <Provider store={store}>
            <SearchNav />
        </Provider>
    );

    expect(component.container).toBeEmpty();
});

it('renders nothing without query', () => {
    const store = mockStore(initialState);

    const component = render(
        <Provider store={store}>
            <SearchNav />
        </Provider>
    );

    expect(component.container).toBeEmpty();
});

it('renders nothing while loading', () => {
    const store = mockStore({
        ...initialState,
        query: "test query",
        loading: true
    });

    const component = render(
        <Provider store={store}>
            <SearchNav />
        </Provider>
    );

    expect(component.container).toBeEmpty();
});


// Input events
it('goes to next page when button is pressed', done => {
    global.scrollTo = jest.fn();
    const store = mockStore({
        ...initialState,
        page: 0,
        query: "test query",
        result: new Array(Math.floor(BOOKS_PER_PAGE * 2))
    });

    const component = render(
        <Provider store={store}>
            <SearchNav />
        </Provider>
    );

    store.subscribe(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(Action.NEXT_PAGE);
        done();
    });
    const nextPage = component.getByText("Next");
    fireEvent.click(nextPage);
});

it('goes to previous page when button is pressed', done => {
    global.scrollTo = jest.fn();
    const store = mockStore({
        ...initialState,
        page: 1,
        query: "test query",
        result: new Array(Math.floor(BOOKS_PER_PAGE * 2))
    });

    const component = render(
        <Provider store={store}>
            <SearchNav />
        </Provider>
    );

    store.subscribe(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(Action.PREV_PAGE);
        done();
    });
    const prevPage = component.getByText("Previous");
    fireEvent.click(prevPage);
});

it('changes the sort of the list', done => {
    const store = mockStore({
        ...initialState,
        page: 0,
        query: "test query",
        result: new Array(BOOKS_PER_PAGE)
    });

    const component = render(
        <Provider store={store}>
            <SearchNav />
        </Provider>
    );

    const key = "title";
    const desc = true;

    store.subscribe(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: Action.SORT_RESULT,
            key,
            desc
        });
        done();
    });
    const sortDropdown = component.container.querySelector('select');
    fireEvent.change(sortDropdown, { target: { value: `${key};${desc ? 'desc' : 'asc'}` } });
});