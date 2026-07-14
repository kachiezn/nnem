import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default function LandingScreen({ navigation }: any) {
  return (
    <View style={styles.container}>

      {/* Top left logo */}
      <Image
        source={require('../assets/icon.png')}
        style={styles.logoTopLeft}
      />

      {/* Bottom right logo */}
      <Image
        source={require('../assets/icon.png')}
        style={styles.logoBottomRight}
      />

      {/* Brand */}
      <View style={styles.brandContainer}>
        <Text style={styles.logo}>nnem</Text>
        <Text style={styles.tagline}>care that knows you</Text>
      </View>

      {/* CTA */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('QuizIntro')}
        >
          <Text style={styles.primaryButtonText}>Begin Your Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>I already have an account</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  logoTopLeft: {
    position: 'absolute',
    top: 48,
    left: -30,
    width: 180,
    height: 180,
    opacity: 0.15,
    transform: [{ rotate: '310deg' }],
  },
  logoBottomRight: {
    position: 'absolute',
    bottom: 40,
    right: -30,
    width: 180,
    height: 180,
    opacity: 0.15,
    transform: [{ rotate: '120deg' }],
  },
  brandContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 64,
    fontWeight: '300',
    color: '#F5F0E8',
    letterSpacing: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#8B7355',
    letterSpacing: 3,
    marginTop: 12,
    textTransform: 'uppercase',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#C4A882',
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#0D0D0D',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
  secondaryButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#8B7355',
    fontSize: 14,
    letterSpacing: 1,
  },
});