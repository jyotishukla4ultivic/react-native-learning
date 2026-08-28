import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useProducts, Category } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

const CATEGORIES: Category[] = ['Lehengas', 'Suits', 'Sarees', 'Kurtas', 'Kurtis'];

export default function AdminDashboard() {
  const router = useRouter();
  const { role } = useAuth();
  const { products, addProduct, deleteProduct } = useProducts();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<Category>('Lehengas');

  // If the user somehow bypassed navigation and isn't an admin, tell them they can't be here.
  if (role !== 'admin') {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Unauthorized access</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleAddProduct = () => {
    if (!title || !price || !description || !imageUrl) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    
    addProduct({
      title,
      price: Number(price),
      description,
      imageUrl,
      category,
    });
    
    Alert.alert('Success', 'Product added successfully!');
    setTitle('');
    setPrice('');
    setDescription('');
    setImageUrl('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <Text style={styles.headerBackText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* === Add Product Form === */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Add New Item</Text>
          
          <TextInput style={styles.input} placeholder="Title (e.g. Bridal Red Lehenga)" value={title} onChangeText={setTitle} />
          <TextInput style={styles.input} placeholder="Price per day" value={price} onChangeText={setPrice} keyboardType="numeric" />
          <TextInput style={[styles.input, { height: 80 }]} placeholder="Description" value={description} onChangeText={setDescription} multiline />
          <TextInput style={styles.input} placeholder="Image URL" value={imageUrl} onChangeText={setImageUrl} />
          
          <Text style={styles.label}>Category:</Text>
          <View style={styles.categoryContainer}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity 
                key={cat} 
                style={[styles.catBadge, category === cat && styles.activeCatBadge]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[styles.catText, category === cat && styles.activeCatText]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handleAddProduct}>
            <Text style={styles.primaryButtonText}>Add Product</Text>
          </TouchableOpacity>
        </View>

        {/* === Manage Products === */}
        <View style={[styles.sectionCard, { marginTop: 20 }]}>
          <Text style={styles.sectionTitle}>Manage Inventory</Text>
          
          {products.map(item => (
            <View key={item.id} style={styles.productRow}>
              <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.title}</Text>
                <Text style={styles.productDetails}>{item.category} | ₹{item.price}</Text>
              </View>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteProduct(item.id)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
          
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#ff4444',
    marginBottom: 20,
  },
  backBtn: {
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  backBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerBack: {
    marginRight: 20,
  },
  headerBackText: {
    fontSize: 16,
    color: '#0066FF',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 60,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  catBadge: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
  activeCatBadge: {
    backgroundColor: '#D4AF37',
  },
  catText: {
    color: '#555',
    fontWeight: '600',
  },
  activeCatText: {
    color: '#fff',
  },
  primaryButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 15,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
