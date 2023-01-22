import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { DataContext } from "../../App";
import uuid from 'react-native-uuid';
import { USERS } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditGroup = ({ groupIndex, setGroupDetailsModal }) => {

    const { state, dispatch } = useContext(DataContext);
    const [error, setError] = useState("");
    const [groupName, setGroupName] = useState(state.groupData[groupIndex].name);
    const [refreshList, setRefreshList] = useState(false);

    const [usersState, setUsers] = useState(function () {
        let arr = [];
        for (let i = 0; i < 10; i++) {
            if (state.groupData[groupIndex].users.includes(i)) {
                arr.push(true);
            }
            else arr.push(false);
        }
        return arr;
    });


    const onTextInputChange = (value) => {
        setError("");
        setGroupName(value);
    }

    const onUserPress = (id) => {
        setUsers((curr) => {
            curr[id] = !curr[id];
            return curr;
        });
        setRefreshList((curr) => !curr);
    }

    const onUpdatePress = async () => {
        if (groupName == "") {
            setError("Please add the group name.")
        }
        else {
            let groups = state.groupData;
            let finalUsers = [];
            for (let i = 0; i < usersState.length; i++) {
                if (usersState[i] || i == parseInt(state.user.id[4])) {
                    finalUsers.push(i);
                }
            }
            groups[groupIndex].name = groupName;
            groups[groupIndex].users = finalUsers;
            await AsyncStorage.setItem('groupData', JSON.stringify(groups));
            dispatch({ groupData: groups });
            setGroupDetailsModal(false);
        }
    }

    return (
        <View style={styles.contentStyle}>
            <TextInput
                placeholder='Group Name'
                style={styles.inputStyle}
                value={groupName}
                maxLength={20}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={onTextInputChange}
                autoFocus
            />
            <Text style={styles.selectUsersText}>Select/unselect users to add/remove</Text>
            <FlatList
                data={USERS}
                extraData={refreshList}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <View>
                            {
                                USERS[index].id != state.user.id
                                    ?
                                    usersState[index]
                                        ?
                                        <TouchableOpacity style={[styles.usernameContainer, { backgroundColor: '#09958E' }]} onPress={() => onUserPress(index)}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={[styles.avatarContainer, { backgroundColor: 'white' }]}>
                                                    <Text style={[styles.avatarText, { color: '#09958E' }]}>{`U${item.id[4]}`}</Text>
                                                </View>
                                                <Text style={[styles.usernameStyle, { color: 'white' }]}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={styles.usernameContainer} onPress={() => onUserPress(index)}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={styles.avatarContainer}>
                                                    <Text style={styles.avatarText}>{`U${item.id[4]}`}</Text>
                                                </View>
                                                <Text style={styles.usernameStyle}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    :
                                    null
                            }
                        </View>

                    )
                }}
            />

            {error != "" ? <Text style={styles.errorStyle}>{error}</Text> : null}

            <TouchableOpacity style={styles.submitContainer} onPress={onUpdatePress}>
                <Text style={styles.submitText}>Update</Text>
            </TouchableOpacity>
        </View >
    )

}

const styles = StyleSheet.create({
    contentStyle: {
        flex: 1,
        marginHorizontal: 20,
        alignItems: 'center'
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
        width: 250,
        color: '#09958E',
        borderWidth: 2
    },
    usernameContainer: {
        flex: 1,
        width: 250,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 7,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        elevation: 4,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        borderColor: '#09958E',
        borderWidth: 1,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    usernameStyle: {
        fontFamily: 'Avenir',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#09958E'
    },
    closeTouchContainer: {
        width: '100%',
        alignItems: 'flex-end',
        paddingRight: 20,
        paddingTop: 20
    },
    closeContainer: {
        backgroundColor: 'white',
        borderRadius: 60,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#09958E',
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
    },
    closeText: {
        fontFamily: 'Avenir',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#09958E'
    },
    submitContainer: {
        backgroundColor: '#09958E',
        marginVertical: 20,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 50,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitText: {
        fontFamily: 'Avenir',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: -0.3
    },
    selectUsersText: {
        fontFamily: 'Avenir',
        fontSize: 14,
        color: '#09958E',
        marginVertical: 10,

    },
    avatarContainer: {
        borderRadius: 20,
        backgroundColor: '#09958E',
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    avatarText: {
        fontFamily: 'Avenir',
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold'
    },
    errorStyle: {
        color: 'red',
        fontFamily: 'Avenir',
        fontSize: 14,
        marginTop: 10,
        marginBottom: -10
    },
})

export default EditGroup;