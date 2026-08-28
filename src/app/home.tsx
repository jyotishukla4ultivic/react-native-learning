import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const CATEGORIES = ['All', 'Lehengas', 'Suits', 'Sarees', 'Kurtas', 'Kurtis'];

export default function Home() {
  const router = useRouter();
  const { products } = useProducts();
  const { role, login, logout } = useAuth();
  
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleAdminToggle = () => {
    if (role === 'admin') {
      logout();
    } else {
      login('admin');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* === Header Section === */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome,</Text>
            <Text style={styles.subtitle}>{role === 'admin' ? 'Admin' : 'Guest'}</Text>
          </View>
          
          <View style={styles.headerActions}>
            {role === 'admin' && (
              <TouchableOpacity style={styles.adminButton} onPress={() => router.push('/admin')}>
                <Text style={styles.adminButtonText}>Dashboard</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.avatarPlaceholder} onPress={handleAdminToggle}>
              <Text style={styles.avatarText}>{role === 'admin' ? 'X' : 'A'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* === Search Bar Section === */}
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Search Lehengas, Kurtis..."
            placeholderTextColor="#999"
          />
        </View>

        {/* === Categories Section === */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoriesScroll}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {CATEGORIES.map((cat, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.categoryBadge, activeCategory === cat && styles.activeCategoryBadge]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.categoryText, activeCategory === cat && styles.activeCategoryText]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* === Products List === */}
        <View style={[styles.sectionHeader, { marginTop: 20 }]}>
          <Text style={styles.sectionTitle}>Featured Collection</Text>
        </View>
        
        <View style={styles.verticalList}>
          {filteredProducts.length === 0 ? (
            <Text style={styles.noDataText}>No items found in this category.</Text>
          ) : (
            filteredProducts.map(item => (
              <TouchableOpacity key={item.id} style={styles.productCard}>
                <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
                
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.title}</Text>
                  <Text style={styles.productCategory}>{item.category}</Text>
                  <Text style={styles.productPrice}>₹{item.price} / day</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  adminButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  adminButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  avatarPlaceholder: {
    width: 45,
    height: 45,
    backgroundColor: '#333',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  categoriesScroll: {
    flexGrow: 0,
    marginBottom: 10,
  },
  categoryBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: 10,
  },
  activeCategoryBadge: {
    backgroundColor: '#D4AF37',
  },
  categoryText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
  },
  activeCategoryText: {
    color: '#fff',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  verticalList: {
    paddingHorizontal: 20,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  productInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  noDataText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  }
});
