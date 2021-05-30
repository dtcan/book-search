import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
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