import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import { Image, Modal, StyleSheet, View } from 'react-native';
import HomeScreen from "../screens/HomeScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import ChatScreen from "../screens/ChatScreen";

const Stack = createStackNavigator();

const MyStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="SplashScreen">
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
                title: "Home Screen",
                headerTitleStyle: {
                    color: '#09958E',
                    fontFamily: 'Didot',
                    fontSize: 20,
                    fontWeight: 'bold'
                },
                headerStyle: {
                    backgroundColor: 'white'
                }
            }} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} options={{
                title: "Home Screen",
                headerTitleStyle: {
                    color: '#09958E',
                    fontFamily: 'Didot',
                    fontSize: 20,
                    fontWeight: 'bold'
                },
                headerStyle: {
                    backgroundColor: 'white'
                }
            }} />
        </Stack.Navigator >
    )
}

export default MyStack