import { imageSrc } from '../api/API';
import './Book.css';

export default function Book({ book, className }) {
    const DEFAULT_COVER = "./cover.jpg";
    
    const title = book?.title || "Unknown Title";
    const hasAuthor = book?.author?.length > 0;
    const hasMultipleAuthors = book?.author?.length > 1;
    
    return <div className={`book ${className}`}>
        <img className="book-cover" alt={title} src={book?.isbn ? imageSrc(book.isbn) : DEFAULT_COVER} onError={e => { e.target.src = DEFAULT_COVER; }} />
        <div className="book-details">
            <h3 className="book-title">{title}</h3>
            <p>
                <span>{hasMultipleAuthors > 0 ? 'Authors' : 'Author'}: {hasAuthor ? book.author.join(', ') : "Unknown"}</span><br />
                <span>First Published: {book?.published || "Unknown"}</span>
            </p>
        </div>
    </div>
}