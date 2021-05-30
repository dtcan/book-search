import { imageSrc } from '../api/API';
import './Book.css';

export default function Book({ book, className }) {
    const DEFAULT_COVER = "./cover.jpg";
    
    const title = book?.title || "Unknown Title";
    const hasAuthor = book?.author?.length > 0;
    const hasMultipleAuthors = book?.author?.length > 1;
    
    // The object tag is used to handle an image not existing, the inner img tag is a fallback
    // Source: https://stackoverflow.com/questions/980855/
    return <div className={`book ${className}`}>
        <div className="book-cover">
            <object data={book?.isbn ? imageSrc(book.isbn) : DEFAULT_COVER} type="image/jpg">
                <img alt={title} src={DEFAULT_COVER} />
            </object>
        </div>
        <div className="book-details">
            <h3 className="book-title">{title}</h3>
            <p>
                <span>Author{hasMultipleAuthors > 0 ? 's' : ''}: {hasAuthor ? book.author.join(', ') : "Unknown"}</span><br />
                <span>First Published: {book?.published || "Unknown"}</span>
            </p>
        </div>
    </div>
}