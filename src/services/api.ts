import { Platform } from 'react-native';

// Use 10.0.2.2 for Android emulator to access localhost, otherwise localhost for web/iOS simulator
export const API_BASE_URL = Platform.OS === 'android' 
  ? 'http://10.0.2.2:5000' 
  : 'http://localhost:5000';

export const endpoints = {
  // IMPORTANT: Adjust these paths based on your Node/Express routes!
  login: `${API_BASE_URL}/api/auth/login`,
  register: `${API_BASE_URL}/api/auth/register`,
};
