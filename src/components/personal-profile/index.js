import {COLOR} from '../../constants/constants';
import {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {LoaderScreen} from 'react-native-ui-lib';
import {useSelector} from 'react-redux';
import FriendList from '../../components/friend-list';
import PersonalProfileHeader from '../../components/personal-profile/persional-profile-header';
import InfoView from '../../components/personal-profile/personal-info';
import FriendService from '../../helper/services/FriendService';
import UserService from '../../helper/services/UserService';
import {selectAuth} from '../../store/auth/authSlice';
import ButtonFunction from './button-function';

const PersonalProfile = ({userId, navigation}) => {
  const [list_friend, setListFriend] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const {user} = useSelector(selectAuth);
  const isGuest = !(user._id === userId);
  const [somethingChanged, callback] = useState(false);
  // console.log('home', userInfo);
  const getData = () => {
    UserService.get(userId)
      .then(res => {
        navigation.setOptions({title: res.data.data.username});
        setUserInfo(res.data.data);
      })
      .catch(e => {
        console.log(e);
      });
    FriendService.getFriends()
      .then(res => {
        setListFriend(res.data.data.friends);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    getData();
  }, [somethingChanged]);
  return (
    <SafeAreaView>
      {!!userInfo ? (
        <ScrollView nestedScrollEnabled={true}>
          <View>
            <PersonalProfileHeader
              userInfo={userInfo}
              isGuest={isGuest}
              callback={() => callback(!somethingChanged)}
            />
            <ButtonFunction
              userInfo={userInfo}
              isGuest={isGuest}
              navigation={navigation}
            />
            <InfoView userInfo={userInfo} />
            <FriendList
              data={list_friend}
              navigation={navigation}
              hide={isGuest}
            />
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(33,33,33,0.5)',
          }}>
          <LoaderScreen color={COLOR.mainWhite} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default PersonalProfile;
