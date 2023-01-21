import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { DataContext } from '../../App';
import { TEMP_GROUPS, USERS } from '../constants';

const LoginScreen = () => {

    const navigation = useNavigation();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");

    const { state, dispatch } = useContext(DataContext);

    useEffect(() => {
        userIdCheck();
    }, [])

    const userIdCheck = async () => {
        let user = await AsyncStorage.getItem('user');
        if (typeof (user) != 'undefined' && user != null) {
            dispatch({ user: JSON.parse(user) });
            groupDataCheck();
            navigation.replace("HomeScreen");
        }
    }

    const groupDataCheck = async () => {
        let groupData = await AsyncStorage.getItem('groupData');
        if (typeof (groupData) == 'undefined' || groupData == null) {
            await AsyncStorage.setItem('groupData', JSON.stringify(TEMP_GROUPS));
            dispatch({ groupData: TEMP_GROUPS });
        }
        else {
            dispatch({ groupData: JSON.parse(groupData) });
        }
    }

    const onLoginHandler = async () => {
        if (id == "") {
            setError("Please enter User ID.");
        }
        else if (password == "") {
            setError("Please enter the password.")
        }
        else {
            let match = 0;
            for (let i = 0; i < USERS.length; i++) {
                if (USERS[i].id == id && USERS[i].password == password) {
                    match = 1;
                    await AsyncStorage.setItem('user', JSON.stringify(USERS[i]));
                    dispatch({ user: USERS[i] });
                    groupDataCheck();
                    navigation.replace("HomeScreen")
                }
            }
            if (match == 0) {
                setError("Incorrect Credentials.")
            }
        }

    }

    const onUserIdChange = (value) => {
        setError("");
        setId(value);
    }

    const onPasswordChange = (value) => {
        setError("");
        setPassword(value);
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.welcomeStyle}>Welcome!</Text>
            <View>
                <TextInput
                    placeholder='User ID'
                    style={styles.inputStyle}
                    value={id}
                    maxLength={10}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={onUserIdChange} />
                <TextInput
                    placeholder='Password'
                    style={styles.inputStyle}
                    value={password}
                    maxLength={10}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={onPasswordChange} />
            </View>
            {
                error != "" ?
                    <Text style={styles.errorStyle}>{error}</Text>
                    :
                    null
            }
            <TouchableOpacity style={styles.loginButtonStyle} onPress={onLoginHandler} >
                <Text style={styles.loginTextStyle}>Login</Text>
            </TouchableOpacity>

            <View>
                <Text style={styles.helpTextStyle}>User IDs : user0, user1, user2, ..., user9</Text>
                <Text style={styles.helpTextStyle}>Password : password</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    welcomeStyle: {
        fontFamily: 'Papyrus',
        fontWeight: 'bold',
        fontSize: 30,
        marginVertical: 30,
        color: '#09958E'
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: '#09958E',
        height: 50,
        borderRadius: 25,
        paddingHorizontal: 25,
        marginHorizontal: 20,
        marginVertical: 10,
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        fontSize: 16,
        width: 300,
        color: '#09958E'
    },
    loginButtonStyle: {
        backgroundColor: '#09958E',
        marginVertical: 30,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 50,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginTextStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    helpTextStyle: {
        color: '#09958E',
        fontSize: 14
    },
    errorStyle: {
        color: 'red',
        marginTop: 10,
        fontSize: 14
    }
});

export default LoginScreen;