import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { DataContext } from '../../App';
import AddGroupModal from '../components/AddGroupModal';
import GroupItem from '../components/GroupItem';

const HomeScreen = () => {

    const { state, dispatch } = useContext(DataContext);
    const [addGroupModal, setAddGroupModal] = useState(false);

    const navigation = useNavigation();

    const onLogout = async () => {
        await AsyncStorage.removeItem('user');
        navigation.replace('LoginScreen')
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.optionContainer}>
                <Text style={styles.greetingText}>Hello, {state.user.name}</Text>
                <TouchableOpacity style={styles.logoutContainer} onPress={onLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={state.groupData}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                    if (item.users.includes(parseInt(state.user.id[4]))) {
                        return <GroupItem group={item} groupIndex={index} />
                    }
                    else return null;
                }}
            />
            <View style={{ width: '100%', alignItems: 'center' }}>
                <TouchableOpacity style={styles.addIconContainer} onPress={() => setAddGroupModal(true)}>
                    <Text style={styles.addIconText}>+</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={addGroupModal}
                onRequestClose={() => setAddGroupModal(false)}>
                <AddGroupModal setAddGroupModal={setAddGroupModal} />
            </Modal>
        </View>
    )

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 10
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
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 10
    },
    logoutText: {
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white',
        letterSpacing: -0.5
    },
    addIconContainer: {
        margin: 20,
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