import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, SafeAreaView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useProducts, Category } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { StatusBar } from 'expo-status-bar';

export default function AdminDashboard() {
  const router = useRouter();
  const { products, addProduct, deleteProduct } = useProducts();
  const { user } = useAuth();
  const role = user?.role;

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('Lehengas');
  const [imageUrl, setImageUrl] = useState('');

  // Protect route
  if (role !== 'admin') {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Access Denied. Admins only.</Text>
        <TouchableOpacity style={styles.btnOutline} onPress={() => router.back()}>
          <Text style={styles.btnOutlineText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleAddProduct = () => {
    if (!title || !price || !category || !imageUrl) return;
    addProduct({
      title,
      price: Number(price),
      category,
      description,
      imageUrl
    });
    // Reset form
    setTitle('');
    setPrice('');
    setDescription('');
    setImageUrl('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Panel</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.eyebrow}>INVENTORY MANAGEMENT</Text>
          <Text style={styles.title}>Add New Piece</Text>
          <View style={styles.divider} />

          <TextInput
            style={styles.input}
            placeholder="Piece Title (e.g. Silk Saree)"
            placeholderTextColor="#7d715c"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Rental Price (₹)"
            placeholderTextColor="#7d715c"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Category (e.g. Lehengas, Suits)"
            placeholderTextColor="#7d715c"
            value={category}
            onChangeText={(t) => setCategory(t as Category)}
          />
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            placeholderTextColor="#7d715c"
            value={imageUrl}
            onChangeText={setImageUrl}
          />
          <TextInput
            style={[styles.input, { borderRadius: 20, height: 80, paddingTop: 16 }]}
            placeholder="Description..."
            placeholderTextColor="#7d715c"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <TouchableOpacity style={styles.btnGold} onPress={handleAddProduct}>
            <Text style={styles.btnGoldText}>Add to Collection →</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Current Inventory ({products.length})</Text>

        {products.map((item) => (
          <View key={item.id} style={styles.productCard}>
            <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.title}</Text>
              <Text style={styles.productPrice}>₹{item.price} / rent</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteProduct(item.id)}>
              <Text style={styles.deleteButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0705', paddingTop: Platform.OS === 'android' ? 40 : 0 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a0705', padding: 20 },
  errorText: { color: '#f4ecdc', fontSize: 18, marginBottom: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderColor: 'rgba(201,162,74,0.1)' },
  backText: { color: '#c9a24a', fontSize: 16 },
  headerTitle: { color: '#f4ecdc', fontSize: 20, fontWeight: 'bold', fontFamily: Platform.OS === 'web' ? 'Playfair Display, serif' : 'serif' },
  scrollContent: { padding: 20, alignItems: 'center' },
  card: {
    width: '100%', maxWidth: 500, backgroundColor: '#151009', borderRadius: 20, padding: 30,
    borderWidth: 1, borderColor: 'rgba(201,162,74,0.15)', alignItems: 'center', marginBottom: 40,
  },
  eyebrow: { color: '#c9a24a', fontSize: 12, letterSpacing: 4, marginBottom: 10, fontWeight: 'bold' },
  title: { fontSize: 26, color: '#f4ecdc', fontWeight: 'bold', fontFamily: Platform.OS === 'web' ? 'Playfair Display, serif' : 'serif', marginBottom: 10, textAlign: 'center' },
  divider: { width: 40, height: 2, backgroundColor: '#c9a24a', marginVertical: 20 },
  input: {
    width: '100%', backgroundColor: '#0a0705', borderWidth: 1, borderColor: 'rgba(201,162,74,0.25)',
    borderRadius: 999, padding: 16, color: '#f4ecdc', marginBottom: 16, fontSize: 16,
  },
  btnGold: {
    width: '100%', backgroundColor: '#c9a24a', paddingVertical: 16, borderRadius: 999, alignItems: 'center', marginTop: 10,
  },
  btnGoldText: { color: '#221708', fontWeight: 'bold', fontSize: 16 },
  btnOutline: {
    backgroundColor: 'transparent', borderWidth: 1, borderColor: '#c9a24a',
    paddingVertical: 12, paddingHorizontal: 30, borderRadius: 999, alignItems: 'center',
  },
  btnOutlineText: { color: '#c9a24a', fontWeight: 'bold', fontSize: 16 },
  sectionTitle: { color: '#c9a24a', fontSize: 18, alignSelf: 'flex-start', marginBottom: 15, letterSpacing: 2 },
  productCard: {
    flexDirection: 'row', width: '100%', maxWidth: 500, backgroundColor: '#151009', borderRadius: 16, padding: 12,
    marginBottom: 15, borderWidth: 1, borderColor: 'rgba(201,162,74,0.1)'
  },
  productImage: { width: 60, height: 60, borderRadius: 8 },
  productInfo: { flex: 1, marginLeft: 15, justifyContent: 'center' },
  productName: { color: '#f4ecdc', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  productPrice: { color: '#c9a24a', fontSize: 14 },
  deleteButton: { justifyContent: 'center', paddingHorizontal: 15 },
  deleteButtonText: { color: '#7c2333', fontWeight: 'bold' },
});
