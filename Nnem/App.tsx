import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './screens/LandingScreen';
import QuizIntroScreen from './screens/QuizIntroScreen';
import HairQuizScreen from './screens/HairQuizScreen';
import SkinQuizScreen from './screens/SkinQuizScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="QuizIntro" component={QuizIntroScreen} />
        <Stack.Screen name="HairQuiz" component={HairQuizScreen} />
        <Stack.Screen name="SkinQuiz" component={SkinQuizScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}