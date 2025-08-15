import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const API_URL = 'https://api1508.onrender.com/api/books';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (!cancelled) {
          setBooks(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        if (!cancelled) setErr(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading books…</Text>
      </View>
    );
  }

  if (err) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>Failed to load: {err}</Text>
        <Button title="Logout" onPress={() => signOut(auth)} />
      </View>
    );
  }

  const totalPages = books.reduce((sum, b) => sum + Number(b.pages || 0), 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.heading}>Books Collection</Text>
        <Button title="Logout" onPress={() => signOut(auth)} />
      </View>

      <Text style={styles.total}>Total Pages: {totalPages}</Text>

      {books.length === 0 ? (
        <Text style={styles.muted}>No books found.</Text>
      ) : (
        books.map((book) => (
          <View key={book.id} style={styles.card}>
            <Text style={styles.title}>{book.title}</Text>
            <Text>Author: {book.author}</Text>
            <Text>Year: {book.publishedYear}</Text>
            <Text>Pages: {book.pages}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  heading: { fontSize: 20, fontWeight: 'bold' },
  total: { marginTop: 8, fontSize: 16, fontWeight: '600' },
  muted: { opacity: 0.6 },
  card: { padding: 12, borderRadius: 8, backgroundColor: '#f0f0f0' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
});