import {
  faHouse,
  faMagnifyingGlass,
  faPencil,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { View } from 'react-native-ui-lib';
import io from 'socket.io-client';
import SingleChat from '../../components/chat/SingleChat';
import { COLOR, httpStatus } from '../../constants/constants';
import ChatService from '../../helper/services/ChatService';

const Chats = ({ navigation, route }) => {
  const { friend } = route.params;
  const [chatList, setChatList] = useState([]);
  const socket = io(`http://localhost:8000`, { autoConnect: false });

  useEffect(() => {
    socket.connect();
    fetchChatList();

    if (friend)
      navigateToMessage(friend);

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchChatList = async () => {
    try {
      const response = await ChatService.getAllChats();
      if (response.status == httpStatus.OK) setChatList(response.data.chats);
    } catch (error) {
      console.log(error);
      setChatList([]);
    }
  };

  const navigateToMessage = async friend => {
    try {
      const {
        status,
        data: { data },
      } = await ChatService.sendMessage({
        receivedId: friend._id,
        type: ChatType.PRIVATE_CHAT,
      });
      if (status == httpStatus.OK)
        navigation.navigate('Message', {
          chatId: data._id,
          receivedUser: friend,
          socket,
        });
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconWrap}
          onPress={() => navigation.navigate('HomePage')}>
          <FontAwesomeIcon size={24} icon={faHouse} color={COLOR.background} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tin nhắn</Text>
        <TouchableOpacity
          style={{ ...styles.iconWrap, marginLeft: 'auto' }}
          onPress={() => navigation.navigate('NewConversation', { socket })}>
          <FontAwesomeIcon size={24} icon={faPencil} color={COLOR.background} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.searchSection}>
            <FontAwesomeIcon
              style={styles.searchIcon}
              icon={faMagnifyingGlass}
            />
            <TextInput placeholder="Tìm kiếm" style={styles.input} />
          </View>
          {chatList.map(item => (
            <SingleChat key={item._id} chatData={item} socket={socket} />
          ))}
        </ScrollView>
      </View>
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
  },
  logo: {
    width: 28,
    height: 28,
  },
  headerTitle: {
    marginLeft: 20,
    fontFamily: 'Roboto',
    fontSize: 28,
    fontWeight: 'bold',
    color: COLOR.text,
  },
  body: {
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
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
  searchSection: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    backgroundColor: COLOR.mainGraySmoke,
    borderRadius: 100,
    marginBottom: 10,
  },
  searchIcon: {
    padding: 10,
    marginLeft: 10,
    color: COLOR.text,
  },
  input: {
    padding: 10,
    backgroundColor: COLOR.mainGraySmoke,
    color: COLOR.text,
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    backgroundColor: COLOR.icon,
    borderRadius: 50,
  },
  emojiWrap: {
    height: '100%',
    width: '100%',
  },
});

export default Chats;
