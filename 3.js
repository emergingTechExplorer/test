import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';

export default function AddBook({ navigation, onAdd }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [pages, setPages] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !author.trim() || !publishedYear || !pages) {
      Alert.alert('Missing info', 'Please fill in all fields.');
      return;
    }

    const bookData = {
      title: title.trim(),
      author: author.trim(),
      publishedYear: Number(publishedYear),
      pages: Number(pages),
    };

    onAdd(bookData);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Add New Book</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            placeholder="Enter book title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Author</Text>
          <TextInput
            placeholder="Enter author name"
            value={author}
            onChangeText={setAuthor}
            style={styles.input}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.field, styles.half]}>
            <Text style={styles.label}>Published Year</Text>
            <TextInput
              placeholder="e.g., 2020"
              keyboardType="number-pad"
              value={publishedYear}
              onChangeText={setPublishedYear}
              style={styles.input}
            />
          </View>

          <View style={[styles.field, styles.half]}>
            <Text style={styles.label}>Pages</Text>
            <TextInput
              placeholder="e.g., 350"
              keyboardType="number-pad"
              value={pages}
              onChangeText={setPages}
              style={styles.input}
            />
          </View>
        </View>

        <Button title="Add Book" onPress={handleSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  field: { marginBottom: 12 },
  label: { fontWeight: '600', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  row: { flexDirection: 'row', gap: 12 },
  half: { flex: 1 },
});