import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage, sortResult } from "../app/actions";
import { BOOKS_PER_PAGE } from "../app/reducer";
import './SearchNav.css';

export default function SearchNav() {
    const page = useSelector(state => state.page);
    const query = useSelector(state => state.query);
    const loading = useSelector(state => state.loading);
    const result = useSelector(state => state.result);
    const error = useSelector(state => state.error);
    const sortKey = useSelector(state => state.sortKey);
    const sortDesc = useSelector(state => state.sortDesc);
    const dispatch = useDispatch();

    const prev = () => {
        dispatch(prevPage());
        window.scrollTo(0,0);
    }

    const next = () => {
        dispatch(nextPage());
        window.scrollTo(0,0);
    }

    const sort = e => {
        const [key, order] = e.target.value.split(';');
        dispatch(sortResult(key, order === 'desc'));
    }

    if(query && !loading && !error && result.length > 0) {
        let firstIndex = (page * BOOKS_PER_PAGE) + 1;
        let lastIndex = Math.min(result.length, (page + 1) * BOOKS_PER_PAGE);
        return <nav>
            <button className="prev-button" disabled={firstIndex === 1} onClick={prev}>Previous</button>
            <div className="nav-content">
                <span className="nav-indices">Viewing {firstIndex} - {lastIndex} out of {result.length} {result.length === 1 ? "result" : "results"}</span><br />
                <select value={`${sortKey};${sortDesc ? 'desc' : 'asc'}`} onChange={sort}>
                    <option value="title;asc">Sort by Title (A to Z)</option>
                    <option value="title;desc">Sort by Title (Z to A)</option>
                    <option value="published;asc">Sort by Publish Year (Old to New)</option>
                    <option value="published;desc">Sort by Publish Year (New to Old)</option>
                </select>
            </div>
            <button className="next-button" disabled={lastIndex === result.length} onClick={next}>Next</button>
        </nav>
    }
    return <></>;
}