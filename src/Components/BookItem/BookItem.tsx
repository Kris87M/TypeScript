import React from 'react';
import { FC } from 'react';
import { Book } from '../../interfaces/Book.interface';
import './BookItem.css';

type Props = {
  book: Book;
}

const BookItem: FC<Props> = ({book}) => {
  return (
    <li className="book-item">{book.title} by {book.author}, ${book.price}</li>
  )
}

export default BookItem;
