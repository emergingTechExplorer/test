import React, { useLayoutEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';

export default function BookList({ navigation, books, onDelete }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Add" onPress={() => navigation.navigate('Add Book')} />,
    });
  }, [navigation]);

  const totalPages = books.reduce((sum, b) => sum + Number(b.pages || 0), 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Books Collection</Text>
        <Text style={styles.total}>Total Pages: {totalPages}</Text>
      </View>

      {books.length === 0 ? (
        <Text style={styles.muted}>No books found.</Text>
      ) : (
        books.map((book) => (
          <View key={book.id} style={styles.card}>
            <Text style={styles.title}>{book.title}</Text>
            <Text>Author: {book.author}</Text>
            <Text>Year: {book.publishedYear}</Text>
            <Text>Pages: {book.pages}</Text>
            <View style={styles.actions}>
              <Button title="Delete" onPress={() => onDelete(book.id)} />
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  header: { marginBottom: 8 },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  total: { fontSize: 16, fontWeight: '600' },
  muted: { opacity: 0.6 },
  card: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  actions: { marginTop: 8, alignSelf: 'flex-start' },
});