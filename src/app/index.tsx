// Import the useRouter hook from expo-router, which gives us the ability to navigate between screens.
import { useRouter } from 'expo-router';
// Import standard UI components from React Native to build our layout.
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Define the Landing component, which is exported as the default so Expo Router knows to render it.
export default function Landing() {
  // Initialize the router so we can use it to change screens when a button is clicked.
  const router = useRouter();

  return (
    // ImageBackground is a component that displays an image and allows us to put other components inside of it (on top of the image).
    <ImageBackground
      // Load the image from our local assets folder.
      source={require('../../assets/images/travel_landing_bg.jpg')}
      // Apply the 'background' style defined at the bottom of this file.
      style={styles.background}
      // 'cover' means the image will scale proportionally to completely fill the screen without being stretched out of shape.
      resizeMode="cover"
    >
      {/* We use a View here to act as a dark overlay. This darkens the image so the white text is easier to read. */}
      <View style={styles.overlay}>
        
        {/* This View holds all our text and the button, and adds padding around them. */}
        <View style={styles.contentContainer}>
          
          {/* Text component displaying the main headline. {'\n'} is used to force a line break. */}
          <Text style={styles.title}>Discover Your{'\n'}Next Adventure</Text>
          
          {/* Text component displaying a smaller subtitle description. */}
          <Text style={styles.subtitle}>
            Explore the most beautiful destinations around the world and book your dream vacation today.
          </Text>
          
          {/* TouchableOpacity is a button that slightly fades out when you press it (giving visual feedback). */}
          <TouchableOpacity 
            style={styles.button}
            // When pressed, replace the current screen with the home screen ('/home').
            // We use replace instead of push so the user can't press "back" to return to the landing screen.
            onPress={() => router.replace('/home')}
            // activeOpacity controls how transparent the button gets when pressed (0.8 = 80% opaque).
            activeOpacity={0.8}
          >
            {/* The text inside the button */}
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ImageBackground>
  );
}

// StyleSheet.create helps organize our styles and provides better performance and autocomplete.
const styles = StyleSheet.create({
  // The background needs to take up all available space.
  background: {
    flex: 1, // 'flex: 1' means it will expand to fill the parent container entirely.
    width: '100%',
    height: '100%',
  },
  // The dark overlay that sits on top of the background image.
  overlay: {
    flex: 1, // Fill the whole screen.
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // A black color with 40% opacity (transparency).
    justifyContent: 'flex-end', // Push all the content inside this view to the bottom of the screen.
  },
  // The container holding the text and button.
  contentContainer: {
    padding: 30, // Add 30 pixels of space on all sides (top, bottom, left, right).
    paddingBottom: 60, // Specifically add 60 pixels of space at the bottom to lift it up from the very edge.
  },
  // Style for the main headline text.
  title: {
    fontSize: 42, // Large text size.
    fontWeight: 'bold', // Thick text.
    color: '#ffffff', // White text color.
    marginBottom: 15, // Add 15 pixels of space below the title.
    lineHeight: 48, // Control the vertical spacing between the two lines of the title.
  },
  // Style for the smaller description text.
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)', // White text but with 80% opacity so it's slightly gray/dimmer than the title.
    marginBottom: 40, // Add 40 pixels of space below the subtitle, before the button.
    lineHeight: 24, // Make the text easier to read by spacing out the lines.
  },
  // Style for the Get Started button.
  button: {
    backgroundColor: '#0066FF', // Vibrant blue background color.
    paddingVertical: 18, // Add 18 pixels of space on the top and bottom inside the button.
    borderRadius: 16, // Curve the corners of the button by 16 pixels.
    alignItems: 'center', // Center the text horizontally inside the button.
    
    // The following properties create a shadow effect under the button (works differently on iOS and Android).
    shadowColor: '#0066FF', // Shadow color matches the button color.
    shadowOffset: { width: 0, height: 10 }, // Push the shadow 10 pixels downwards.
    shadowOpacity: 0.3, // Make the shadow 30% opaque.
    shadowRadius: 20, // Blur the shadow by 20 pixels.
    elevation: 10, // Required for shadows to show up on Android devices.
  },
  // Style for the text inside the button.
  buttonText: {
    color: '#ffffff', // White text.
    fontSize: 18,
    fontWeight: 'bold',
  },
});
