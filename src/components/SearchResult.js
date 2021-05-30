import { useSelector } from "react-redux";
import { BOOKS_PER_PAGE } from "../app/reducer";
import Book from './Book';
import './SearchResult.css';

export default function SearchResult() {
    const page = useSelector(state => state.page);
    const query = useSelector(state => state.query);
    const loading = useSelector(state => state.loading);
    const result = useSelector(state => state.result);
    const error = useSelector(state => state.error);

    const firstIndex = page * BOOKS_PER_PAGE;
    const resultsClassName = "results";
    const resultsFeedbackClassName = "results-feedback";

    if(!query) {
        return <div className={resultsClassName}>
            <h1 className={resultsFeedbackClassName}>Type a query in the search box above</h1>
        </div>
    }else if(loading) {
        return <div className={resultsClassName}>
            <h1 className={resultsFeedbackClassName}>Looking for books...</h1>
            <div className="loading-icon">&#128213;</div>
        </div>
    }else if(error) {
        return <div className={resultsClassName}>
            <h1 className={resultsFeedbackClassName}>An error occured.</h1>
        </div>
    }else if(result.length <= 0) {
        return <div className={resultsClassName}>
            <h1 className={resultsFeedbackClassName}>No results for "{query}"</h1>
        </div>
    }else {
        return <div className={resultsClassName}>
            {result.slice(firstIndex, firstIndex + BOOKS_PER_PAGE).map((book,i) => <Book className={i % 2 === 1 ? "book-alt" : ""} key={firstIndex + i} book={book} />)}
        </div>
    }
}