import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, Modal, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GroupDetailsModal from './GroupDetailsModal';

const GroupItem = ({ group, groupIndex }) => {

    const [groupDetailsModal, setGroupDetailsModal] = useState(false);

    const navigation = useNavigation();

    const onItemPress = () => {
        navigation.navigate('ChatScreen', { groupIndex: groupIndex });
    }

    return (
        <TouchableOpacity style={styles.mainContainer} onPress={onItemPress}>
            <Text style={styles.titleStyle}>{group.name}</Text>
            <TouchableOpacity onPress={() => setGroupDetailsModal(true)}>
                <Image source={require('../assets/menu_dots_white.png')} style={styles.menuDots} />
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={groupDetailsModal}
                onRequestClose={() => setGroupDetailsModal(false)}>
                <GroupDetailsModal setGroupDetailsModal={setGroupDetailsModal} groupIndex={groupIndex} />
            </Modal>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        elevation: 4,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        backgroundColor: '#09958E',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleStyle: {
        fontFamily: 'Avenir',
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    menuDots: {
        width: 30,
        height: 30,
    }
})

export default GroupItem;