export const BASE_URL = "https://openlibrary.org";

export async function search(query, page = 0) {
    const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}&page=${page + 1}`);
    const json = await response.json();
    return {
        numFound: json?.numFound,
        books: json?.docs?.map?.(doc => ({
            title: doc?.title,
            published: doc?.first_publish_year,
            isbn: doc?.isbn?.[0],
            author: doc?.author_name
        }))
    };
}

export function imageSrc(isbn) {
    return `https://openlibrary.org/b/isbn/${isbn}-M.jpg?default=false`;
}
