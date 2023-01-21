import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

const SplashScreen = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.titleStyle}>GroupChat</Text>
            <LottieView
                source={require('../assets/group_chat_splash.json')}
                autoPlay={true}
                loop={false}
                speed={2}
                onAnimationFinish={() => navigation.replace("LoginScreen")}
                style={styles.splashStyle}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'white'
    },
    titleStyle: {
        fontFamily: 'Didot',
        fontSize: 36,
        fontWeight: 'bold',
        color: '#09958E'
    },
    splashStyle: {
        width: '80%',
    }
});

export default SplashScreen;