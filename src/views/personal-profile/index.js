import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PersonalProfileHeader from '../../components/personal-profile/persional-profile-header';
import FriendList from '../../components/friend-list';
import Layout from '../../components/layout/layout';
import UpPost from '../../components/up-post';
import InfoView from '../../components/personal-profile/personal-info';
import Feed from '../../components/khang_components/Feed';
import UserService from '../../helper/services/UserService';
import FriendService from '../../helper/services/FriendService';

const PersonalProfileScreen = ({navigation, routes}) => {
  const [list_friend, setListFriend] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    UserService.get('63b310a589a068ff8cda444f').then(res => {
      console.log(res.data.data);
      setUserInfo(res.data.data);
    });
    FriendService.getFriends().then(res => {
      console.log(res.data.data);
      setListFriend(res.data.data);
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Layout navigation={navigation}>
          <PersonalProfileHeader userInfo={userInfo} />
          <InfoView userInfo={userInfo} />
          <FriendList data={list_friend.friends} />
          <View style={[styles.blank, {height: 24}]} />
          {/* <UpPost userInfo={userInfo} /> */}
          {/* <View style={[styles.blank, {height: 12}]} /> */}
          <Feed />
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  description: {
    color: '#2f2f2f',
    fontSize: 16,
  },
  blank: {
    backgroundColor: '#b9b9b9',
    // paddingHorizontal: 16,
  },
});

export default PersonalProfileScreen;
