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
        <form role="search" onSubmit={submit}>
            <input disabled={loading} type="search" placeholder="Enter book title" />
            <button disabled={loading} type="submit">Search</button>
        </form>
    </div>;
}