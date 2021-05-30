import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage } from "../app/actions";
import { BOOKS_PER_PAGE } from "../app/reducer";

export default function SearchNav() {
    const page = useSelector(state => state.page);
    const query = useSelector(state => state.query);
    const loading = useSelector(state => state.loading);
    const result = useSelector(state => state.result);
    const error = useSelector(state => state.error);
    const dispatch = useDispatch();

    if(query && !loading && !error && result.length > 0) {
        let firstIndex = (page * BOOKS_PER_PAGE) + 1;
        let lastIndex = Math.min(result.length, (page + 1) * BOOKS_PER_PAGE);
        return <nav>
            <button className="prev-button" disabled={firstIndex === 1} onClick={() => { dispatch(prevPage()); }}>Previous</button>
            <span className="results-indices">Viewing {firstIndex} - {lastIndex} out of {result.length} {result.length === 1 ? "result" : "results"}</span>
            <button className="next-button" disabled={lastIndex === result.length} onClick={() => { dispatch(nextPage()); }}>Next</button>
        </nav>
    }
    return <></>;
}