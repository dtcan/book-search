import { useSelector } from "react-redux";
import { BOOKS_PER_PAGE } from "../app/reducer";
import Book from './Book';

export default function SearchResult() {
    const page = useSelector(state => state.page);
    const query = useSelector(state => state.query);
    const loading = useSelector(state => state.loading);
    const result = useSelector(state => state.result);
    const error = useSelector(state => state.error);

    if(!query) {
        return <div>
            <h1>Type a query in the search box above</h1>
        </div>
    }else if(loading) {
        return <div>
            <h1>...</h1>
        </div>
    }else if(error) {
        return <div>
            <h1>An error occured.</h1>
        </div>
    }else if(result.length <= 0) {
        return <div>
            <h1>No results for "{query}"</h1>
        </div>
    }else {
        return <div>
            {result.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE).map(book => <Book book={book} />)}
        </div>
    }
}