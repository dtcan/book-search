import { imageSrc } from '../api/API';

export default function Book({ book }) {
    const DEFAULT_COVER = "./cover.jpg";
    
    const title = book?.title || "Unknown Title";
    const hasAuthor = book?.author?.length > 0;
    const hasMultipleAuthors = book?.author?.length > 1;
    
    // The object tag is used to handle an image not existing, the inner img tag is a fallback
    // Source: https://stackoverflow.com/questions/980855/
    return <div class="book">
        <div class="book-cover">
            <object data={book?.isbn ? imageSrc(book.isbn) : DEFAULT_COVER} type="image/jpg">
                <img alt={title} src={DEFAULT_COVER} />
            </object>
        </div>
        <div class="book-details">
            <h1>{title}</h1>
            <ul>
                <li>Author{hasMultipleAuthors > 0 ? 's' : ''}: {hasAuthor ? book.author.join(', ') : "Unknown"}</li>
                <li>First Published: {book?.published || "Unknown"}</li>
            </ul>
        </div>
    </div>
}