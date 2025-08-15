import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookList from './screens/BookList';
import AddBook from './screens/AddBook';

const Stack = createNativeStackNavigator();

const initialBooks = [
  { id: 1, title: 'Mockingbird', author: 'Harper Lee', publishedYear: 1960, pages: 376 },
  { id: 2, title: 'Cloud Atlas', author: 'David Mitchell', publishedYear: 2004, pages: 328 },
  { id: 3, title: 'Adventures of Huckleberry Finn', author: 'Mark Twain', publishedYear: 1884, pages: 122 },
  { id: 4, title: 'The New York Trilogy', author: 'Paul Auster', publishedYear: 1987, pages: 228 },
  { id: 5, title: 'Beloved', author: 'Toni Morrison', publishedYear: 1987, pages: 328 },
  { id: 6, title: 'Invisible Man', author: 'Ralph Ellison', publishedYear: 1952, pages: 581 },
];

export default function App() {
  const [books, setBooks] = useState(initialBooks);

  const handleAddBook = (bookData) => {
    const nextId = books.length ? Math.max(...books.map(b => b.id)) + 1 : 1;
    const newBook = { id: nextId, ...bookData };
    setBooks(prev => [...prev, newBook]);
  };

  const handleDeleteBook = (id) => {
    setBooks(prev => prev.filter(b => b.id !== id));
  };

  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator>
        <Stack.Screen name="Books">
          {(props) => (
            <BookList
              {...props}
              books={books}
              onDelete={handleDeleteBook}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Add Book">
          {(props) => <AddBook {...props} onAdd={handleAddBook} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}