import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useProducts } from '../context/ProductContext';
import { StatusBar } from 'expo-status-bar';

export default function BookingScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { products } = useProducts();
  const product = products.find(p => p.id === id) || products[0];

  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleBook = () => {
    if (!date || !address || !phone) return;
    alert('Booking Confirmed for ' + product?.title);
    router.replace('/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Cancel Booking</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.eyebrow}>RESERVE YOUR PIECE</Text>
          <Text style={styles.title}>{product?.title}</Text>
          <Text style={styles.priceInfo}>₹{product?.price} / 4 days</Text>
          <View style={styles.divider} />

          <TextInput
            style={styles.input}
            placeholder="Rental Start Date (DD/MM/YYYY)"
            placeholderTextColor="#7d715c"
            value={date}
            onChangeText={setDate}
          />
          <TextInput
            style={styles.input}
            placeholder="Delivery Address"
            placeholderTextColor="#7d715c"
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            placeholderTextColor="#7d715c"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <TouchableOpacity style={styles.btnRent} onPress={handleBook}>
            <Text style={styles.btnRentText}>Confirm Rental →</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0705', paddingTop: Platform.OS === 'android' ? 40 : 0 },
  keyboardView: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  backButton: { position: 'absolute', top: Platform.OS === 'android' ? 20 : 60, left: 20, padding: 10, zIndex: 10 },
  backButtonText: { color: '#c9a24a', fontSize: 16 },
  card: {
    width: '100%', maxWidth: 400, backgroundColor: '#151009', borderRadius: 20, padding: 40,
    borderWidth: 1, borderColor: 'rgba(201,162,74,0.15)', alignItems: 'center',
  },
  eyebrow: { color: '#c9a24a', fontSize: 12, letterSpacing: 4, marginBottom: 10, fontWeight: 'bold' },
  title: { fontSize: 26, color: '#f4ecdc', fontWeight: 'bold', fontFamily: Platform.OS === 'web' ? 'Playfair Display, serif' : 'serif', marginBottom: 10, textAlign: 'center' },
  priceInfo: { color: '#c9a24a', fontSize: 18, marginBottom: 20 },
  divider: { width: 40, height: 2, backgroundColor: '#c9a24a', marginVertical: 20 },
  input: {
    width: '100%', backgroundColor: '#0a0705', borderWidth: 1, borderColor: 'rgba(201,162,74,0.25)',
    borderRadius: 999, padding: 16, color: '#f4ecdc', marginBottom: 16, fontSize: 16,
  },
  btnRent: {
    width: '100%', backgroundColor: 'transparent', borderWidth: 1, borderColor: '#c9a24a',
    paddingVertical: 16, borderRadius: 999, alignItems: 'center', marginTop: 10,
  },
  btnRentText: { color: '#ecd8a3', fontWeight: 'bold', fontSize: 16 },
});
