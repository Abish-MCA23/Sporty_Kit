import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

export default function AboutUs() {
  return (
    <ScrollView style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
      <Image
          source={require('./assets/images/snack.jpeg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>Sporty Kit</Text>
      </View>

      {/* Banner Section */}
      <Image
        source={{ uri: 'https://d3jmn01ri1fzgl.cloudfront.net/photoadking/compressed/school-bus-yellow-sports-banner-template-tiwuo6e1f1bed2.jpg' }} // Sports-related banner image
        style={styles.bannerImage}
      />

      {/* Content */}
      <Text style={styles.title}>Welcome to Elite Sports Club</Text>
      <Text style={styles.description}>
        At Elite Sports Club, we are committed to providing a world-class sports experience. From soccer to basketball, we offer top-tier facilities, training programs, and competitions for athletes of all ages and skill levels.
      </Text>

      <Text style={styles.subtitle}>Our Sports Programs</Text>
      <Text style={styles.description}>
        Our club offers a wide range of sports programs including soccer, basketball, tennis, and swimming. Whether you're aiming for professional excellence or just want to stay active, our expert coaches and state-of-the-art facilities are here to support you.
      </Text>

      <Text style={styles.subtitle}>Why Choose Us?</Text>
      <Text style={styles.description}>
        With our experienced coaches, comprehensive training schedules, and strong community focus, Elite Sports Club is the perfect place to sharpen your skills, stay fit, and enjoy the camaraderie of sports. We believe in nurturing talent and providing a platform for growth.
      </Text>

      <Text style={styles.subtitle}>Our Facilities</Text>
      <Text style={styles.description}>
        From high-tech indoor courts to well-maintained outdoor fields, we take pride in offering premium facilities to ensure our members train in the best environment. We also offer recovery rooms, fitness centers, and lounges for relaxation.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1C1C1C', // Black background for a bold look
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFD700', // Golden yellow background for the logo
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700', // Golden yellow for the logo text
    marginTop: 10,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFD700', // Golden yellow for the title
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#FFD700', // Golden yellow for subtitles
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF', // White for the description text
  },
});
