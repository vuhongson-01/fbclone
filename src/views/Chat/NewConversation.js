import {
  faArrowLeft,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {TextInput} from 'react-native';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import {Avatar, Text, View} from 'react-native-ui-lib';
import {ChatType, COLOR, httpStatus} from '../../constants/constants';
import ChatService from '../../helper/services/ChatService';
import FriendService from '../../helper/services/FriendService';

const NewConversation = ({navigation, route}) => {
  const {socket} = route.params;
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    fetchFriendList();
  }, []);

  const fetchFriendList = async () => {
    try {
      const {
        status,
        data: {data},
      } = await FriendService.getFriends();
      if (status == httpStatus.OK) setFriendList(data.friends);
    } catch (error) {
      console.log(error);
      setFriendList([]);
    }
  };

  const onPressNewConversation = async friend => {
    try {
      const {
        status,
        data: {data},
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
          style={styles.leftArrow}
          onPress={() => navigation.goBack()}>
          <FontAwesomeIcon size={28} icon={faArrowLeft} color={COLOR.icon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chọn bạn bè</Text>
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
          {friendList.map(friend => (
            <TouchableOpacity
              key={friend._id}
              style={styles.friend}
              onPress={() => onPressNewConversation(friend)}>
              <Avatar size={60} source={{uri: friend.avatar}} />
              <Text style={styles.friendText}>{friend.username}</Text>
            </TouchableOpacity>
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
    borderBottomColor: 'whitesmoke',
  },
  leftArrow: {
    marginLeft: 5,
    marginRight: 20,
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
  friend: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  friendText: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 21,
    marginLeft: 5,
  },
});

export default NewConversation;
