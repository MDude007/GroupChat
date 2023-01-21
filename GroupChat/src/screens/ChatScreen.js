import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useContext, useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import uuid from 'react-native-uuid';
import { DataContext } from "../../App";
import { Text } from 'react-native';

const ChatScreen = ({ route }) => {

    const { group } = route.params;

    const [messages, setMessages] = useState(group.messages);
    const { state, dispatch } = useContext(DataContext);

    const setAsyncStorageData = async (changedData) => {
        await AsyncStorage.setItem('groupData', JSON.stringify(changedData));
    }

    useEffect(() => {
        if (messages.length) {
            let temp = state.groupData;
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].id == group.id) {
                    temp[i].messages = messages;
                }
            }
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
                avatar: `https://ui-avatars.com/api/?background=09958E&color=FFF&name=U+${state.user.id[state.user.id.length - 1]}`
            }}
        />
    )
}

export default ChatScreen;