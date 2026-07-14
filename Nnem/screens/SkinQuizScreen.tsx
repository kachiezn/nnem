import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const questions = [
  {
    id: 'skin_type',
    question: 'How does your skin feel a few hours after washing your face?',
    options: [
      { label: 'Tight and dry all over', value: 'dry' },
      { label: 'Shiny and oily all over', value: 'oily' },
      { label: 'Oily in T-zone, dry on cheeks', value: 'combination' },
      { label: 'Comfortable and balanced', value: 'normal' },
      { label: 'Red, irritated or reactive', value: 'sensitive' },
    ],
  },
  {
    id: 'skin_tone',
    question: 'How would you describe your skin tone?',
    options: [
      { label: 'Fair — burns easily, rarely tans', value: 'fair' },
      { label: 'Light — burns sometimes, tans lightly', value: 'light' },
      { label: 'Medium — sometimes burns, tans easily', value: 'medium' },
      { label: 'Tan — rarely burns, tans well', value: 'tan' },
      { label: 'Deep — rarely burns, always tans', value: 'deep' },
    ],
  },
  {
    id: 'concerns',
    question: 'What are your biggest skin concerns? (pick all that apply)',
    options: [
      { label: 'Dark spots or hyperpigmentation', value: 'dark_spots' },
      { label: 'Acne or breakouts', value: 'acne' },
      { label: 'Uneven skin tone', value: 'uneven_tone' },
      { label: 'Dryness or dehydration', value: 'dryness' },
      { label: 'Oiliness or shine', value: 'oiliness' },
      { label: 'Fine lines or wrinkles', value: 'aging' },
      { label: 'Sensitivity or redness', value: 'sensitivity' },
      { label: 'Large pores', value: 'pores' },
    ],
    multi: true,
  },
  {
    id: 'routine',
    question: 'What does your current skincare routine look like?',
    options: [
      { label: 'Nothing — I use soap and water', value: 'none' },
      { label: 'Just a moisturizer', value: 'minimal' },
      { label: 'Cleanser and moisturizer', value: 'basic' },
      { label: 'A few targeted products', value: 'intermediate' },
      { label: 'Full routine morning and night', value: 'advanced' },
    ],
  },
  {
    id: 'sun_exposure',
    question: 'How much sun does your skin typically get?',
    options: [
      { label: 'Mostly indoors', value: 'low' },
      { label: 'Some outdoor time daily', value: 'medium' },
      { label: 'A lot — I spend most time outside', value: 'high' },
    ],
  },
];

export default function SkinQuizScreen({ navigation, route }: any) {
  const { hairAnswers } = route.params;
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [selected, setSelected] = useState<string[]>([]);

  const question = questions[currentQ];
  const isMulti = question.multi;
  const isLast = currentQ === questions.length - 1;

  function handleSelect(value: string) {
    if (isMulti) {
      setSelected(prev =>
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    } else {
      setSelected([value]);
    }
  }

  function handleNext() {
    if (selected.length === 0) return;
    const newAnswers = {
      ...answers,
      [question.id]: isMulti ? selected : selected[0],
    };
    setAnswers(newAnswers);
    setSelected([]);

    if (isLast) {
      navigation.navigate('Profile', {
        hairAnswers,
        skinAnswers: newAnswers,
      });
    } else {
      setCurrentQ(prev => prev + 1);
    }
  }

  const progress = ((currentQ + 1) / questions.length) * 100;

  return (
    <View style={styles.container}>
      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{currentQ + 1} of {questions.length}</Text>
      </View>

      {/* Question */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.section}>SKIN PROFILE</Text>
        <Text style={styles.question}>{question.question}</Text>
        {isMulti && (
          <Text style={styles.multiHint}>Select all that apply</Text>
        )}

        <View style={styles.options}>
          {question.options.map(option => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.option,
                selected.includes(option.value) && styles.optionSelected,
              ]}
              onPress={() => handleSelect(option.value)}
            >
              <View style={[
                styles.optionDot,
                selected.includes(option.value) && styles.optionDotSelected,
              ]} />
              <Text style={[
                styles.optionText,
                selected.includes(option.value) && styles.optionTextSelected,
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Next */}
      <TouchableOpacity
        style={[styles.button, selected.length === 0 && styles.buttonDisabled]}
        onPress={handleNext}
        disabled={selected.length === 0}
      >
        <Text style={styles.buttonText}>
          {isLast ? 'Build My Profile' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 40,
  },
  progressBar: {
    flex: 1,
    height: 2,
    backgroundColor: '#2A2A2A',
    borderRadius: 1,
  },
  progressFill: {
    height: 2,
    backgroundColor: '#C4A882',
    borderRadius: 1,
  },
  progressText: {
    color: '#6B6B6B',
    fontSize: 12,
    letterSpacing: 1,
  },
  content: {
    flex: 1,
  },
  section: {
    fontSize: 11,
    color: '#8B7355',
    letterSpacing: 3,
    marginBottom: 16,
  },
  question: {
    fontSize: 24,
    fontWeight: '300',
    color: '#F5F0E8',
    lineHeight: 34,
    marginBottom: 8,
  },
  multiHint: {
    fontSize: 13,
    color: '#6B6B6B',
    marginBottom: 24,
  },
  options: {
    gap: 12,
    marginTop: 24,
    paddingBottom: 24,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    backgroundColor: '#1A1A1A',
  },
  optionSelected: {
    borderColor: '#C4A882',
    backgroundColor: '#1F1A14',
  },
  optionDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#4A4A4A',
  },
  optionDotSelected: {
    borderColor: '#C4A882',
    backgroundColor: '#C4A882',
  },
  optionText: {
    color: '#6B6B6B',
    fontSize: 15,
    flex: 1,
  },
  optionTextSelected: {
    color: '#F5F0E8',
  },
  button: {
    backgroundColor: '#C4A882',
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.3,
  },
  buttonText: {
    color: '#0D0D0D',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
});