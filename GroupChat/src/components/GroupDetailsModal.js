import { useContext, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import GroupDetailsComponent from "./GroupDetailsComponent";
import EditGroup from "./EditGroup";
import { DataContext } from "../../App";

const GroupDetailsModal = ({ setGroupDetailsModal, groupIndex }) => {
    const [editDetails, setEditDetails] = useState(false);
    const { state, dispatch } = useContext(DataContext);

    return (
        <View style={styles.modalStyle}>
            <View style={styles.contentStyle}>
                <View style={[styles.optionsContainer, state.groupData[groupIndex].admin == state.user.id ? { justifyContent: 'space-between' } : { justifyContent: 'flex-end' }]}>
                    {
                        state.groupData[groupIndex].admin == state.user.id
                            ?
                            <TouchableOpacity style={styles.editContainer} onPress={() => setEditDetails((curr) => !curr)}>
                                <Text style={styles.editText}>{!editDetails ? 'Edit Group' : 'Back'}</Text>
                            </TouchableOpacity>
                            :
                            null
                    }
                    <TouchableOpacity style={styles.closeContainer} onPress={() => setGroupDetailsModal(false)} >
                        <Text style={styles.closeText}>X</Text>
                    </TouchableOpacity>
                </View>
                {
                    editDetails
                        ?
                        <EditGroup groupIndex={groupIndex} setGroupDetailsModal={setGroupDetailsModal} />
                        :
                        <GroupDetailsComponent groupIndex={groupIndex} />
                }
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    modalStyle: {
        flex: 1,
        backgroundColor: '#000000CC',
        justifyContent: 'center'
    },
    contentStyle: {
        flex: 1,
        marginVertical: 50,
        marginHorizontal: 20,
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    optionsContainer: {
        flexDirection: 'row',
        width: '100%',
        padding: 20,
        alignItems: 'center'
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
    editContainer: {
        backgroundColor: '#09958E',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        paddingHorizontal: 6,
        paddingVertical: 3
    },
    editText: {
        fontFamily: 'Avenir',
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white'
    }
})

export default GroupDetailsModal;