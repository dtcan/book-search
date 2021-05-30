import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { nextPage, searchFailure, searchRequest, searchSuccess } from '../app/actions';
import { BOOKS_PER_PAGE, reducer } from '../app/reducer';
import SearchResult from './SearchResult';

it('renders search results', () => {
    const result = {
        numFound: 2,
        books: [
            {
                title: "A Great Book",
                isbn: "9876543210",
                published: 2020,
                author: ["John Smith"]
            },
            {
                title: "Another Great Book",
                isbn: "9876543211",
                published: 2021,
                author: ["Mary Sue"]
            }
        ]
    };

    const store = createStore(reducer);

    const component = render(
        <Provider store={store}>
            <SearchResult />
        </Provider>
    );

    store.dispatch(searchRequest("test query"));
    store.dispatch(searchSuccess(result));

    for(let book of result.books) {
        expect(component.getByText(book.title)).toBeInTheDocument();
        expect(component.getByText(s => s.includes(book.published))).toBeInTheDocument();
        for(let author of book.author) {
            expect(component.getByText(s => s.includes(author))).toBeInTheDocument();
        }
    }
});

it('renders no results', () => {
    const result = {
        numFound: 0,
        books: []
    };

    const store = createStore(reducer);

    const component = render(
        <Provider store={store}>
            <SearchResult />
        </Provider>
    );

    const query = "test query"
    store.dispatch(searchRequest(query));
    store.dispatch(searchSuccess(result));
    
    // If query has no results, we should mention the query on the page
    expect(component.getByText(s => s.includes(query))).toBeInTheDocument();
});

it('renders an error message', () => {
    const store = createStore(reducer);

    const component = render(
        <Provider store={store}>
            <SearchResult />
        </Provider>
    );

    store.dispatch(searchRequest("test query"));
    store.dispatch(searchFailure("error"));
    
    // The word 'error' should be mentioned somewhere on this page.
    expect(component.getByText(s => s.includes("error"))).toBeInTheDocument();
});

it('renders a second page of search results', () => {
    const result = {
        numFound: BOOKS_PER_PAGE * 2,
        books: new Array(BOOKS_PER_PAGE * 2).fill(undefined).map((_,i) => ({ title: `Book ${i+1}` }))
    };

    const store = createStore(reducer);

    const component = render(
        <Provider store={store}>
            <SearchResult />
        </Provider>
    );

    store.dispatch(searchRequest("test query"));
    store.dispatch(searchSuccess(result));
    store.dispatch(nextPage());
    
    expect(component.getByText(`Book ${BOOKS_PER_PAGE + 1}`)).toBeInTheDocument();
    expect(component.getByText(`Book ${BOOKS_PER_PAGE * 2}`)).toBeInTheDocument();
});