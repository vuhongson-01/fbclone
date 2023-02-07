import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Text, View} from 'react-native-ui-lib';
import {ChatType, COLOR, httpStatus} from '../../constants/constants';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {faPaperPlane, faSmile} from '@fortawesome/free-regular-svg-icons';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import ChatService from '../../helper/services/ChatService';

const Message = ({route, navigation}) => {
  const {
    chatId,
    receivedUser: {_id, avatar, username},
    socket,
  } = route.params;
  const receivedId = _id;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [messageList, setMessageList] = useState([]);
  const scrollViewRef = useRef();

  useEffect(() => {
    fetchMessageData();
    socket.connect();
    socket.emit('joinConversation', chatId);
    socket.on('newMessageSent', message => {
      setMessageList([...messageList, message]);
    });

    return () => {
      socket.off('newMessageSent');
      socket.emit('leaveConversation', chatId);
      socket.disconnect();
    };
  }, []);

  const fetchMessageData = async () => {
    try {
      const response = await ChatService.getSingleChat(chatId);
      if (response.status == httpStatus.OK) {
        setMessageList(response.data.data.reverse());
        scrollViewRef.current.scrollToEnd({animated: true});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    if (messageContent === '') return;

    try {
      const {
        status,
        data: {data},
      } = await ChatService.sendMessage({
        chatId,
        type: ChatType.PRIVATE_CHAT,
        content: messageContent,
      });

      if (status == httpStatus.OK) {
        setShowEmojiPicker(false);
        setMessageContent('');
        const newMessage = {
          _id: data._id,
          user: data.user._id,
          content: data.content,
        };
        setMessageList([...messageList, newMessage]);
        socket.emit('sendMessage', {...newMessage, chatId});
        scrollViewRef.current.scrollToEnd({animated: true});
      }
    } catch (error) {
      console.log(error);
      setShowEmojiPicker(false);
      setMessageContent('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.leftArrow}
          onPress={() => navigation.goBack()}>
          <FontAwesomeIcon size={28} icon={faArrowLeft} />
        </TouchableOpacity>
        <Avatar source={{uri: avatar}} />
        <Text style={styles.headerTitle}>{username}</Text>
      </View>
      <ScrollView style={styles.body} ref={scrollViewRef}>
        {messageList.map(item => {
          const {_id, user, content} = item;
          const isSender = user !== receivedId;

          return (
            <View key={_id} style={messageStyles({isSender}).singleMessage}>
              {!isSender && <Avatar size={40} source={{uri: avatar}} />}
              <Text style={messageStyles({isSender}).mesageContainer}>
                {content}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <TextInput
            placeholder="Nhắn tin..."
            style={styles.textInput}
            value={messageContent}
            onChangeText={value => setMessageContent(value)}
          />
        </TouchableWithoutFeedback>
        <TouchableOpacity
          style={styles.iconWrap}
          onPress={() => {
            setShowEmojiPicker(!showEmojiPicker);
            Keyboard.dismiss();
          }}>
          <FontAwesomeIcon size={24} icon={faSmile} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrap} onPress={() => sendMessage()}>
          <FontAwesomeIcon size={24} icon={faPaperPlane} color={COLOR.icon} />
        </TouchableOpacity>
      </View>
      {showEmojiPicker && (
        <View style={styles.emojiWrap}>
          <EmojiSelector
            showSearchBar={false}
            category={Categories.emotion}
            showHistory={false}
            showTabs={false}
            showSectionTitles={false}
            onEmojiSelected={emoji => {
              setMessageContent(`${messageContent} ${emoji}`);
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLOR.background,
  },
  header: {
    height: 60,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 2,
    marginRight: 2,
    borderBottomColor: 'whitesmoke',
  },
  headerTitle: {
    marginLeft: 10,
    fontFamily: 'Roboto',
    fontSize: 28,
    fontWeight: 'bold',
    color: COLOR.text,
  },
  leftArrow: {
    marginLeft: 5,
    marginRight: 20,
  },
  body: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  footer: {
    width: '80%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: COLOR.mainGraySmoke,
    fontSize: 18,
    paddingLeft: 10,
    color: COLOR.text,
    paddingTop: 10,
  },
  iconWrap: {
    marginLeft: 10,
  },
  emojiWrap: {
    height: '100%',
    width: '100%',
  },
});

const messageStyles = props =>
  StyleSheet.create({
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
      backgroundColor: props.isSender ? COLOR.mainBlue : COLOR.mainGraySmoke,
      color: props.isSender ? COLOR.mainWhite : COLOR.text,
      fontFamily: 'Roboto',
      fontSize: 18,
    },
  });

export default Message;
