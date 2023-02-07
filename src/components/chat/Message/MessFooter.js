import { faPaperPlane, faSmile } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { View } from 'react-native-ui-lib';
import { COLOR, httpStatus } from '../../../constants/constants';
import ChatService from '../../../helper/services/ChatService';

const MessFooter = ({ chatId }) => {
    const [messageContent, setMessageContent] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const sendMessage = async () => {
        if (messageContent === '')
            return;

        try {
            const { status, data: { data } } = await ChatService.sendMessage({
                chatId,
                type: ChatType.PRIVATE_CHAT,
                content: messageContent,
            });

            if (status == httpStatus.OK) {
                setShowEmojiPicker(false);
                setMessageContent('');
                const newMessage = { _id: data._id, user: data.user._id, content: data.content };
                setMessageList([...messageList, newMessage]);
                scrollViewRef.current.scrollToEnd({ animated: true });
            }
        } catch (error) {
            console.log(error);
            setShowEmojiPicker(false);
            setMessageContent('');
        }
    }

    return (
        <>
            <View style={styles.footer}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <TextInput
                        placeholder="Nhắn tin..."
                        style={styles.textInput}
                        value={messageContent}
                        onChangeText={(value) => setMessageContent(value)}
                    />
                </TouchableWithoutFeedback>
                <TouchableOpacity style={styles.iconWrap} onPress={() => {
                    setShowEmojiPicker(!showEmojiPicker);
                    Keyboard.dismiss();
                }}>
                    <FontAwesomeIcon size={24} icon={faSmile} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconWrap} onPress={() => sendMessage()}>
                    <FontAwesomeIcon size={24} icon={faPaperPlane} color={COLOR.icon} />
                </TouchableOpacity>
            </View>
            {showEmojiPicker &&
                <View style={styles.emojiWrap} >
                    <EmojiSelector
                        showSearchBar={false}
                        category={Categories.emotion}
                        showHistory={false}
                        showTabs={false}
                        showSectionTitles={false}
                        onEmojiSelected={(emoji) => {
                            setMessageContent(`${messageContent} ${emoji}`);
                        }}
                    />
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    footer: {
        width: '80%',
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center'
    },
    textInput: {
        width: '100%',
        borderRadius: 20,
        backgroundColor: '#EAEDED',
        fontSize: 18,
        paddingLeft: 10,
        color: COLOR.text,
        paddingTop: 10
    },
    iconWrap: {
        marginLeft: 10
    },
    emojiWrap: {
        height: '100%',
        width: '100%'
    }
})

export default MessFooter