import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useRef, useState } from "react";
import uuid from 'react-native-uuid';
import { DataContext } from "../../App";
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput } from 'react-native';
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ChatComponent from "../components/ChatComponent";

const ChatScreen = ({ route }) => {

    const { groupIndex } = route.params;

    const { state, dispatch } = useContext(DataContext);
    const [messages, setMessages] = useState(state.groupData[groupIndex].messages);


    const setAsyncStorageData = async (changedData) => {
        await AsyncStorage.setItem('groupData', JSON.stringify(changedData));
    }

    useEffect(() => {
        if (messages.length) {
            let temp = state.groupData;
            temp[groupIndex].messages = messages;
            setAsyncStorageData(temp);
            dispatch({ groupData: temp });
        }
    }, [messages])

    const flatlistRef = useRef(null);
    const [messageText, setMessageText] = useState("");

    console.log(messages);

    const onMessageSend = () => {
        setMessages(previousMessages => [...previousMessages, { messageID: uuid.v4(), messageText: messageText, userID: state.user.id }]);
        setMessageText("");
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <View style={styles.mainContainer}>
                <FlatList
                    ref={flatlistRef}
                    data={messages}
                    keyExtractor={(message) => message.messageID}
                    onContentSizeChange={() => { messages.length !== 0 ? flatlistRef.current.scrollToEnd() : null }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <ChatComponent message={item} />
                        )
                    }}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Enter Message'
                        style={styles.inputStyle}
                        value={messageText}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => setMessageText(text)} />
                    <TouchableOpacity onPress={onMessageSend}>
                        <Text style={styles.sendStyle}>Send</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.infoStyle}>
                    Write the message inside TextInput and press Send.
                    The message will appear at the bottom of the list.
                </Text>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: 10,
        paddingBottom: 20
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: '#09958E',
        height: 50,
        borderRadius: 25,
        paddingHorizontal: 25,
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        fontSize: 16,
        width: 300,
        color: '#09958E',
        borderWidth: 2,
        flex: 1
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 10,
    },
    sendStyle: {
        fontFamily: 'Avenir',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#09958E'
    },
    infoStyle: {
        fontFamily: 'Avenir',
        fontSize: 12,
        fontWeight: '500',
        color: '#00000099',
        paddingHorizontal: 10
    }
})

export default ChatScreen;