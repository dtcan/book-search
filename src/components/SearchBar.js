import { useSelector, useDispatch } from "react-redux";
import { fetchSearchResults } from "../app/actions";

export default function SearchBar() {
    const loading = useSelector(state => state.loading);
    const dispatch = useDispatch();

    const submit = e => {
        e.preventDefault();
        const query = e?.target?.[0]?.value;
        if(query) {
            dispatch(fetchSearchResults(query));
        }
    }

    return <div>
        <form className="search" role="search" onSubmit={submit}>
            <input className="search-input" disabled={loading} type="search" placeholder="Enter book title" />
            <button className="search-button" disabled={loading} type="submit">Search</button>
        </form>
    </div>;
}