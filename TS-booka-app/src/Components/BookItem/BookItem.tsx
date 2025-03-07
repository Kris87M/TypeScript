import React from 'react';
import { FC } from 'react';
import { Book } from '../../interfaces/Book.interface';
import './BookItem.css';

type Props = {
  book: Book;
  removeBook: (id: string) => void
}

const BookItem: FC<Props> = ({book, removeBook}) => {
  return (
    <li className="book-item">
      {book.title} by {book.author}, ${book.price}
      <button onClick={() => removeBook(book.id)}>Remove</button>
    </li>
  )
}

export default BookItem;
