import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { DataContext } from '../../App';
import GroupItem from '../components/GroupItem';

const HomeScreen = () => {

    const { state, dispatch } = useContext(DataContext);

    const navigation = useNavigation();

    const onLogout = async () => {
        await AsyncStorage.removeItem('user');
        navigation.replace('LoginScreen')
    }

    console.log(JSON.stringify(state));

    return (
        <View style={styles.mainContainer}>
            <View style={styles.optionContainer}>
                <Text style={styles.greetingText}>Hi, {state.user.name}</Text>
                <TouchableOpacity style={styles.logoutContainer} onPress={onLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={state.groupData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return <GroupItem group={item} />
                }}

            />
            <TouchableOpacity style={styles.addIconContainer}>
                <Text style={styles.addIconText}>+</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 20
    },
    optionContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems: 'center'
    },
    greetingText: {
        fontFamily: 'Papyrus',
        fontSize: 26,
        fontWeight: 'bold',
        color: '#09958E'
    },
    logoutContainer: {
        backgroundColor: '#09958E',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10
    },
    logoutText: {
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
        letterSpacing: -0.5
    },
    addIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 30,
        borderRadius: 50,
        minWidth: 70,
        minHeight: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#09958E',
        backgroundColor: 'white',
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
    },
    addIconText: {
        fontFamily: 'Avenir',
        fontSize: 50,
        fontWeight: 'bold',
        color: '#09958E'
    }
})

export default HomeScreen;