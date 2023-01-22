import { useContext } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { DataContext } from "../../App";
import { USERS } from "../constants";

const GroupDetailsComponent = ({ groupIndex }) => {

    const { state, dispatch } = useContext(DataContext);

    return (
        <View style={{ flex: 1, paddingBottom: 20 }}>
            <Text style={styles.titleStyle}>{state.groupData[groupIndex].name}</Text>
            <FlatList
                data={state.groupData[groupIndex].users}
                keyExtractor={(item) => item}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    // return <Text style={styles.username}>{USERS[item].name}</Text>
                    return (
                        <View style={styles.usernameContainer}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={styles.avatarContainer}>
                                    <Text style={styles.avatarText}>{`U${USERS[item].id[4]}`}</Text>
                                </View>
                                <Text style={styles.usernameStyle}>{USERS[item].name}</Text>
                            </View>
                            {
                                USERS[item].id == state.groupData[groupIndex].admin
                                    ?
                                    <Text style={styles.adminText}>Admin</Text>
                                    :
                                    null
                            }
                        </View>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    titleStyle: {
        fontFamily: 'Avenir',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#09958E',
        textAlign: 'center',
        marginBottom: 10
    },
    usernameContainer: {
        flex: 1,
        width: 250,
        alignItems: 'center',
        justifyContent: 'space-between',
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
    adminText: {
        fontFamily: 'Avenir',
        color: '#09958E'
    }
})

export default GroupDetailsComponent;