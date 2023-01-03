import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';
import React from 'react';
import {Dimensions} from 'react-native';
import defaultAvatar from '../../../assets/images/default-avatar-profile.jpg';
import {Drawer} from 'react-native-ui-lib';

const FriendList = ({data}) => {
  const windowWidth = Dimensions.get('window').width;
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topLeft}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Friends
          </Text>
          <Text
            style={{
              color: '#6e6e6e',
              fontSize: 18,
            }}>
            {data?.length ? data.length : 0} friends
          </Text>
        </View>
        <View style={styles.topRight}>
          <TouchableOpacity style={styles.seeAllFriends}>
            <Text
              style={{
                textAlign: 'right',
                color: 'blue',
                fontSize: 18,
              }}>
              See all friends
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.gridList}>
        {data?.map((friend, index) => {
          let d = (windowWidth - 32 - 16) / 3;
          if (index < 6)
            return (
              <View style={[styles.friend, {width: d}]} key={index}>
                <TouchableHighlight>
                  <Image
                    style={[styles.avaterImage, {width: d, height: d}]}
                    source={friend.avatar ? friend.avatar : defaultAvatar}
                  />
                </TouchableHighlight>
                <Text style={styles.friendName}>{friend.name}</Text>
              </View>
            );
        })}
      </View>
      <Drawer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    borderTopColor: '#b9b9b9',
    marginHorizontal: 16,
    borderTopWidth: 1,
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  topLeft: {},
  topRight: {},
  gridList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  avaterImage: {
    resizeMode: 'contain',
    borderRadius: 12,
  },
  friend: {
    marginBottom: 16,
  },
  friendName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    padding: 8,
  },
  seeAllFriends: {
    borderRadius: 6,
    paddingVertical: 10,
  },
  textBtn: {
    textAlign: 'center',
    fontSize: 16,
    color: '#212121',
  },
});
export default FriendList;
