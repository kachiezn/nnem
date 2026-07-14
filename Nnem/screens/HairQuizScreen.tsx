import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const questions = [
  {
    id: 'hair_type',
    question: 'What does your hair look like naturally — no products, air dried?',
    options: [
      { label: 'Straight, no wave at all', value: '1' },
      { label: 'Slight wave or bend', value: '2' },
      { label: 'Wavy, forms an S shape', value: '3' },
      { label: 'Curly, springy ringlets', value: '4' },
      { label: 'Coily or kinky, tight curls or zigzag', value: '5' },
    ],
  },
  {
    id: 'porosity',
    question: 'Drop a clean hair strand in a glass of water. What happens?',
    options: [
      { label: 'It floats on top (low porosity)', value: 'low' },
      { label: 'It slowly sinks to the middle (medium porosity)', value: 'medium' },
      { label: 'It sinks straight to the bottom (high porosity)', value: 'high' },
      { label: "I haven't tried this", value: 'unknown' },
    ],
  },
  {
    id: 'scalp',
    question: 'How does your scalp feel by end of day?',
    options: [
      { label: 'Oily or greasy', value: 'oily' },
      { label: 'Dry or tight', value: 'dry' },
      { label: 'Balanced, no issues', value: 'balanced' },
      { label: 'Itchy or sensitive', value: 'sensitive' },
      { label: 'Flaky', value: 'flaky' },
    ],
  },
  {
    id: 'thickness',
    question: 'Take a single strand of hair. How does it feel between your fingers?',
    options: [
      { label: "Can barely feel it — it's very fine", value: 'fine' },
      { label: 'I can feel it slightly', value: 'medium' },
      { label: 'Feels thick and strong', value: 'coarse' },
    ],
  },
  {
    id: 'concerns',
    question: 'What are your biggest hair concerns? (pick all that apply)',
    options: [
      { label: 'Breakage', value: 'breakage' },
      { label: 'Dryness', value: 'dryness' },
      { label: 'Frizz', value: 'frizz' },
      { label: 'Slow growth', value: 'growth' },
      { label: 'Scalp issues', value: 'scalp' },
      { label: 'Heat damage', value: 'heat_damage' },
      { label: 'Color damage', value: 'color_damage' },
    ],
    multi: true,
  },
];

export default function HairQuizScreen({ navigation }: any) {
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
      navigation.navigate('SkinQuiz', { hairAnswers: newAnswers });
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
        <Text style={styles.section}>HAIR PROFILE</Text>
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
          {isLast ? 'Continue to Skin Profile' : 'Next'}
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