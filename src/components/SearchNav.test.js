import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BOOKS_PER_PAGE, initialState } from '../app/reducer';
import SearchNav from './SearchNav';

const mockStore = configureMockStore();

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