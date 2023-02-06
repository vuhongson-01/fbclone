import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native';
import { Avatar, Text, View } from 'react-native-ui-lib';
import { COLOR, httpStatus } from '../../../constants/constants';
import ChatService from '../../../helper/services/ChatService';

const MessBody = ({ chatId, receivedId, avatar, scrollViewRef }) => {
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        console.log(chatId);
        fetchMessageData();
    }, [])

    const fetchMessageData = async () => {
        try {
            const response = await ChatService.getSingleChat(chatId);
            if (response.status == httpStatus.OK) {
                setMessageList(response.data.data.reverse());
                scrollViewRef.current.scrollToEnd({ animated: false });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ScrollView style={styles.body} ref={scrollViewRef}>
            {messageList.map(item => {
                const { _id, user, content } = item;
                const isSender = user !== receivedId;

                return (
                    <View key={_id} style={messageStyles({ isSender }).singleMessage}>
                        {!isSender && <Avatar size={40} source={{ uri: avatar }} />}
                        <Text style={messageStyles({ isSender }).mesageContainer}>{content}</Text>
                    </View>
                )
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
    },
});

const messageStyles = (props) => StyleSheet.create({
    singleMessage: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        alignSelf: props.isSender ? 'flex-end' : 'flex-start',
    },
    mesageContainer: {
        display: 'flex',
        alignItems: 'center',
        maxWidth: '75%',
        alignSelf: props.isSender ? 'flex-end' : 'flex-start',
        margin: 5,
        borderRadius: 25,
        padding: 12,
        paddingLeft: 18,
        paddingRight: 18,
        backgroundColor: props.isSender ? '#5540FF' : '#F1F1F1',
        color: props.isSender ? '#FFFFFF' : COLOR.text,
        fontFamily: 'Roboto',
        fontSize: 18,
    }
})


export default MessBody