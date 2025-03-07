import React from 'react';
import { FC } from 'react';
import AddBookForm from './components/AddBookForm/AddBookForm';
import BooksList from './components/BooksList/BooksList';

const App: FC = () => {

  return (
    <div className="container">
      <header>
        <h1>Books App</h1>
      </header>
      <BooksList />
      <AddBookForm />
    </div>
  );
}

export default App;