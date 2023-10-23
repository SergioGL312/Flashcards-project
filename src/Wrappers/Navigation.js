import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Constants
import { ROUTES } from '../Constants/navigation.constants';

// Screens
import Login from '../Screens/Login.screen';
import SignUp from "../Screens/SignUp.screen";
import Flashcards from "../Screens/Flashcards.screen";

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ROUTES.login} component={Login} />
        <Stack.Screen name={ROUTES.signup} component={SignUp} options={{
          headerShown: true,
          headerBackTitleVisible: true,
          title: ''
        }} />
        <Stack.Screen name={ROUTES.flashcards} component={Flashcards} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}