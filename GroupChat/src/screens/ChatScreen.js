import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useContext, useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import uuid from 'react-native-uuid';
import { DataContext } from "../../App";
import { Text } from 'react-native';
import { View } from "react-native";

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

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: state.user.id,
                avatar: `https://ui-avatars.com/api/?background=09958E&color=FFF&name=U+${state.user.id[4]}`
            }}
            textInputProps={{
                autoCapitalize: "none",
                autoCorrect: false
            }}
        />
    )
}

export default ChatScreen;