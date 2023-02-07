import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Avatar, Text, View } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import { httpStatus } from '../../constants/constants';
import ChatService from '../../helper/services/ChatService';
import { selectAuth } from '../../store/auth/authSlice';
import { setDateDiff } from '../../utils/utils';

const SingleChat = ({ chatData, socket }) => {
    const lastMessageInit = { content: '', time: '' };
    const [receivedUser, setReceivedUser] = useState({});
    const [lastMessage, setLastMessage] = useState(lastMessageInit);
    const { user } = useSelector(selectAuth);
    const navigation = useNavigation()

    useEffect(() => {
        getChatInfo();
    }, [])

    const getChatInfo = async () => {
        const RUser = chatData.member.find(e => e._id !== user._id);
        try {
            const response = await ChatService.getSingleChat(chatData._id);
            const { status, data: { data } } = response;

            if (status == httpStatus.OK)
                data.length ? setLastMessage({ content: data[0].content, time: setDateDiff(data[0].createdAt) }) : setLastMessage(lastMessageInit);
        } catch (error) {
            console.log(error);
            setLastMessage(lastMessageInit);
        }

        setReceivedUser(RUser);
    }

    const onPressSingleChat = () => {
        navigation.navigate('Message', { chatId: chatData._id, receivedUser });
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => { navigation.navigate('Message', { chatId: chatData._id, receivedUser, socket }); }}>
            <Avatar size={60} source={{ uri: receivedUser.avatar }} />
            <View style={styles.textWrap}>
                <Text style={styles.text}>{receivedUser.username}</Text>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={styles.text}>{lastMessage.content ?? ''}</Text>
                    <Text style={styles.dot}>.</Text>
                    <Text style={styles.text}>{lastMessage.time ?? ''}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
    },
    textWrap: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
    },
    text: {
        fontFamily: 'Roboto',
        fontWeight: 'normal',
        fontSize: 17,
        color: '#000000',
        marginBottom: 2,
    },
    dot: {
        marginLeft: 3,
        marginRight: 3,
        lineHeight: 17,
    },
    action: {
        width: '100%',
        paddingLeft: '20%'
    },
    time: {
        fontFamily: 'Roboto',
        fontWeight: 'normal',
        fontSize: 16,
        color: '#000000'
    }
});

export default SingleChat