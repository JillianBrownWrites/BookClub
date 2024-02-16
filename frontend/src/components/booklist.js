import React, { useState, useEffect } from "react";
import CalendarComponent from './calendar';
import Book from './book';
import { getBooks, addNewBook } from '../api/books';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDateFns }  from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import Stack from '@mui/material/Stack';
import '../App.css';

const BookSchedule = () => {
    cosnt [books, setBooks] = useState([]);
    const [newBookTitle, setNewBookTitle] = useState("");
    cosnt [newBookStart, setNewBookStart] = useState(new Date().toISOString());
    const [newBookEnd, setNewBookEnd] = useState(new Date().toISOString());

    useEffect(() => {
        async function fetchDate() {
            const booksData = await getBooks();
            setBooks(booksData);
        }
        fetchData();
    }, []);

    const onAddNewBook = async () => {
        const newBook = await addNewBook(newBookTitle, newBookStart, newBokEnd);
        setBooks((previousBooks) => [
            ...previousBooks, newBook
        ]);
    };

    const existingBooks = books.map((book) => {
        return (
            <Book key={book.id} bookId={book.id} bookTitle={book.title} bookStart={book.start} bookEnd={book.end} setBooks={setBooks} />
        )
    });

    return (
        <div>
          <CalendarComponent events={books} />
            <h3>Add a New Book to Read!</h3>
            <div className={'add-new'}>
              <form onSubmit={(e) => {
                  e.preventDefault()
                  onAddNewBook()
                }}
              >
                  <Stack spacing={2}>
                      <TextField id="standard-basic" required label="Add Book Title" variant="standard" onChange={e => setNewBookTitle(e.target.value)}/>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker label="Start Date" openTo="day" views={['year', 'month', 'day']} value={new Date(newBookStart)} onChange={(newValue) => {
                                  setNewBookStart(newValue.toISOString());
                              }}
                              slotProps={{ textField: { variant: 'outlined' } }}/>
                          <DatePicker label="End Date" openTo="day" views={['year', 'month', 'day']} value={new Date(newBookEnd)} onChange={(newValue) => {
                                  setNewBookEnd(newValue.toISOString());
                              }}
                              slotProps={{ textField: { variant: 'outlined' } }}/>
                      </LocalizationProvider>
                      <Button variant="contained" type="submit">
                          Add Book
                      </Button>
                  </Stack>
              </form>
            </div>
            <div className={'existing-books'}>
              <h3>Existing Book Schedules</h3>
              <List>
                {existingBooks}
              </List>
            </div>
        </div>
      ) 
}

export default BookSchedule;