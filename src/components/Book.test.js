import { render } from '@testing-library/react';
import Book from './Book';

it('renders book details', () => {
    const book = {
        title: "A Great Book",
        isbn: "9876543210",
        published: 2021,
        author: ["John Smith", "Mary Sue"]
    }

    const component = render(<Book book={book} />);
    expect(component.getByText(book.title)).toBeInTheDocument();
    expect(component.getByText(s => s.includes(book.published))).toBeInTheDocument();
    for(let author of book.author) {
        expect(component.getByText(s => s.includes(author))).toBeInTheDocument();
    }
});
