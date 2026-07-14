import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function QuizIntroScreen({ navigation }: any) {
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.eyebrow}>YOUR PROFILE</Text>
        <Text style={styles.title}>Let's get to know you</Text>
        <Text style={styles.subtitle}>
          Answer a few questions about your hair and skin. 
          Nnem will build a routine made entirely for you.
        </Text>
      </View>

      {/* What to expect */}
      <View style={styles.stepsContainer}>
        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>01</Text>
          </View>
          <View style={styles.stepText}>
            <Text style={styles.stepTitle}>Hair Profile</Text>
            <Text style={styles.stepDesc}>Type, porosity, scalp, concerns</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>02</Text>
          </View>
          <View style={styles.stepText}>
            <Text style={styles.stepTitle}>Skin Profile</Text>
            <Text style={styles.stepDesc}>Type, tone, concerns</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>03</Text>
          </View>
          <View style={styles.stepText}>
            <Text style={styles.stepTitle}>Your Routine</Text>
            <Text style={styles.stepDesc}>AI builds your personal care plan</Text>
          </View>
        </View>
      </View>

      {/* CTA */}
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => navigation.navigate('HairQuiz')}
      >
        <Text style={styles.primaryButtonText}>Start Hair Profile</Text>
      </TouchableOpacity>

      <Text style={styles.timeNote}>Takes about 3 minutes</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    paddingHorizontal: 24,
    paddingVertical: 60,
    justifyContent: 'space-between',
  },
  header: {
    gap: 12,
  },
  eyebrow: {
    fontSize: 11,
    color: '#8B7355',
    letterSpacing: 3,
  },
  title: {
    fontSize: 36,
    fontWeight: '300',
    color: '#F5F0E8',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B6B6B',
    lineHeight: 24,
    marginTop: 4,
  },
  stepsContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 24,
    gap: 0,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 8,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#8B7355',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#8B7355',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
  },
  stepText: {
    gap: 2,
  },
  stepTitle: {
    color: '#F5F0E8',
    fontSize: 15,
    fontWeight: '500',
  },
  stepDesc: {
    color: '#6B6B6B',
    fontSize: 13,
  },
  divider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginVertical: 8,
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
  timeNote: {
    textAlign: 'center',
    color: '#6B6B6B',
    fontSize: 13,
    letterSpacing: 1,
  },
});