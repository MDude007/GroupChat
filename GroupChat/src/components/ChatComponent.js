import { useContext } from "react";
import { View, StyleSheet, Image, Text } from "react-native"
import { DataContext } from "../../App";

const ChatComponent = ({ message }) => {

    const { state } = useContext(DataContext);

    return (
        <View style={styles.mainContainer}>
            {
                state.user.id == message.userID
                    ?
                    <View style={styles.messageContainer}>
                        <View style={[styles.messageTextContainerStyle, { backgroundColor: '#09958E99' }]}>
                            <Text style={styles.messageTextStyle}>
                                {message.messageText}
                            </Text>
                        </View>
                    </View>
                    :
                    <View style={styles.avatarMessageContainer}>
                        <Image source={{ uri: `https://robohash.org/${message.userID}` }} style={styles.avatarStyle} />
                        <View style={[styles.messageTextContainerStyle, { backgroundColor: 'white' }]}>
                            <Text style={styles.messageTextStyle} >
                                {message.messageText}
                            </Text>
                        </View>
                    </View>
            }
        </View >
    )

}

const styles = StyleSheet.create({
    mainContainer: {
        marginVertical: 5
    },
    avatarStyle: {
        height: 40,
        width: 40,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 40,
    },
    messageContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    avatarMessageContainer: {
        flexDirection: 'row',
        flex: 1,
        gap: 5
    },
    messageTextContainerStyle: {
        maxWidth: '70%',
        textAlign: 'center',
        borderRadius: 6,
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    messageTextStyle: {
        fontFamily: 'Avenir',
        fontSize: 14,
        fontWeight: '600',
        color: 'black'
    }
})

export default ChatComponent;