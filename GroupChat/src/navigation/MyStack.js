import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SplashScreen from "../screens/SplashScreen";

const Stack = createStackNavigator();

const MyStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="SplashScreen">
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
                title: "Login Screen",
                headerTitleStyle: {
                    color: 'black',
                    fontFamily: 'Didot',
                    fontSize: 20,
                    fontWeight: 'bold'
                },
                headerStyle: {
                    backgroundColor: '#e1eefb'
                }
            }} />
        </Stack.Navigator >
    )
}

export default MyStack