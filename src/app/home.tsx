// Import the useRouter hook to handle navigation between screens.
import { useRouter } from 'expo-router';
// Import essential UI components from React Native.
// ScrollView: allows content to be scrollable if it exceeds the screen size.
// StyleSheet: used to create CSS-like styles.
// Text: used to display text on the screen.
// TextInput: an input field where users can type text (like a search bar).
// TouchableOpacity: a wrapper that makes things clickable and fades them slightly when pressed.
// View: a fundamental container used to build layouts (similar to a <div> in HTML).
// Image: used to display images from a URL or local file.
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';

// Dummy data for our horizontal list of popular destinations.
// We define an array of objects, each containing an id, a name, and a web URL for an image.
const DESTINATIONS = [
  { id: '1', name: 'Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=600&auto=format&fit=crop' },
  { id: '2', name: 'Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop' },
  { id: '3', name: 'Paris', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600&auto=format&fit=crop' },
];

// Dummy data for our vertical list of recommended hotels.
const HOTELS = [
  { id: '1', name: 'Oceanview Villa', location: 'Maldives', price: '$450/night', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600&auto=format&fit=crop' },
  { id: '2', name: 'Jungle Retreat', location: 'Bali', price: '$210/night', image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=600&auto=format&fit=crop' },
];

export default function Home() {
  // Initialize our router so we can navigate around the app.
  const router = useRouter();

  return (
    // The main container View holding the entire screen.
    <View style={styles.container}>
      
      {/* ScrollView allows the user to scroll up and down if the content is too tall. */}
      {/* showsVerticalScrollIndicator={false} hides the scrollbar on the side of the screen. */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* === Header Section === */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Traveler!</Text>
            <Text style={styles.subtitle}>Where do you want to go?</Text>
          </View>
          {/* Avatar button. When clicked, it takes the user back to the landing page as an example. */}
          <TouchableOpacity 
            style={styles.avatarPlaceholder} 
            onPress={() => router.replace('/')}
          >
            <Text style={styles.avatarText}>T</Text>
          </TouchableOpacity>
        </View>

        {/* === Search Bar Section === */}
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Search destinations, hotels..."
            placeholderTextColor="#999" // Sets the color of the placeholder text.
          />
        </View>

        {/* === Popular Destinations Section === */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Destinations</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        
        {/* A horizontal ScrollView for our destination cards. */}
        <ScrollView 
          horizontal // This makes the scrolling left-to-right instead of up-and-down.
          showsHorizontalScrollIndicator={false} // Hide the horizontal scrollbar.
          style={styles.horizontalScroll}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {/* We use .map() to loop through our DESTINATIONS array and create a card for each item. */}
          {DESTINATIONS.map(item => (
            // A TouchableOpacity acts as the card wrapper so the whole card is clickable.
            // When looping in React, each item MUST have a unique 'key' prop.
            <TouchableOpacity key={item.id} style={styles.destinationCard}>
              {/* Load the image from the URL in our data array. */}
              <Image source={{ uri: item.image }} style={styles.destinationImage} />
              
              {/* A dark overlay at the bottom of the card to make the text readable. */}
              <View style={styles.destinationOverlay}>
                <Text style={styles.destinationName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* === Recommended Hotels Section === */}
        {/* We reuse the sectionHeader style, but add a 30px margin to the top just for this specific header. */}
        <View style={[styles.sectionHeader, { marginTop: 30 }]}>
          <Text style={styles.sectionTitle}>Recommended Hotels</Text>
        </View>
        
        {/* A simple View to hold our vertical list of hotels. */}
        <View style={styles.verticalList}>
          {/* Loop through our HOTELS array to create a card for each hotel. */}
          {HOTELS.map(item => (
            <TouchableOpacity key={item.id} style={styles.hotelCard}>
              <Image source={{ uri: item.image }} style={styles.hotelImage} />
              
              {/* This View groups the text information (name, location, price) together next to the image. */}
              <View style={styles.hotelInfo}>
                <Text style={styles.hotelName}>{item.name}</Text>
                <Text style={styles.hotelLocation}>{item.location}</Text>
                <Text style={styles.hotelPrice}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
      </ScrollView>
    </View>
  );
}

// === Styles Section ===
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the whole screen height.
    backgroundColor: '#FAFAFA', // A very light gray background color.
  },
  scrollContent: {
    paddingTop: 60, // Add space at the top so content doesn't hide behind the phone's status bar (clock/battery).
    paddingBottom: 40, // Add space at the bottom so the last item isn't cut off.
  },
  // Header styles
  header: {
    flexDirection: 'row', // Align the greeting text and avatar side-by-side instead of stacked.
    justifyContent: 'space-between', // Push the text to the left and avatar to the right.
    alignItems: 'center', // Vertically center them.
    paddingHorizontal: 20, // Add padding on the left and right sides.
    marginBottom: 25, // Add space below the header.
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
  avatarPlaceholder: {
    width: 45,
    height: 45,
    backgroundColor: '#0066FF',
    borderRadius: 25, // A border radius of half the width/height makes it a perfect circle.
    justifyContent: 'center', // Center the text 'T' vertically.
    alignItems: 'center', // Center the text 'T' horizontally.
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  // Search styles
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  searchInput: {
    backgroundColor: '#fff', // White background for the input box.
    paddingHorizontal: 20, // Space inside the input box on the left/right.
    paddingVertical: 15, // Space inside the input box on the top/bottom.
    borderRadius: 12,
    fontSize: 16,
    color: '#333',
    // Shadow properties for the search bar
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, // Very light shadow.
    shadowRadius: 8,
    elevation: 2,
  },
  // Reusable section header styles
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end', // Align text to the bottom baseline.
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    color: '#0066FF', // Blue accent color for the link.
    fontWeight: '600',
  },
  // Destination card styles
  horizontalScroll: {
    flexGrow: 0, // Prevents the horizontal scrollview from expanding vertically.
  },
  destinationCard: {
    width: 160,
    height: 220,
    marginRight: 15,
    borderRadius: 16,
    overflow: 'hidden', // Ensures the image doesn't bleed out of the rounded corners.
  },
  destinationImage: {
    width: '100%',
    height: '100%',
  },
  destinationOverlay: {
    position: 'absolute', // Allows us to place this View exactly where we want over the image.
    bottom: 0, // Stick to the bottom.
    left: 0, // Stick to the left.
    right: 0, // Stick to the right (making it full width).
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.3)', // Semi-transparent black background.
  },
  destinationName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Hotel card styles
  verticalList: {
    paddingHorizontal: 20,
  },
  hotelCard: {
    flexDirection: 'row', // Align image and text side-by-side.
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 15, // Space between cards.
    // Subtle shadow for the card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  hotelImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  hotelInfo: {
    flex: 1, // Takes up the remaining horizontal space after the image.
    marginLeft: 15, // Space between image and text.
    justifyContent: 'center', // Center the text vertically next to the image.
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  hotelLocation: {
    fontSize: 14,
    color: '#666', // Gray text for the location.
    marginBottom: 8,
  },
  hotelPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0066FF', // Blue text for the price to make it pop.
  },
});
