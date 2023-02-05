import UserService from '../../helper/services/UserService';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons/faCircleExclamation';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import ListFriendComponent from '../../components/friends/list/ListFriendComponent';
import PersonalProfile from '../../components/personal-profile';
import UpdateInfoComponent from '../../components/personal-profile/update-info';
import {selectAuth} from '../../store/auth/authSlice';
import {COLOR} from '../../constants/constants';

const ProfileStack = createNativeStackNavigator();

const UpdateInfoScreen = ({route, navigation}) => {
  return <UpdateInfoComponent userId={route.params.userInfo._id} />;
};
const AnotherProfileScreen = ({route, navigation}) => {
  const [blockDiary, setBlockDiary] = useState(false);
  useEffect(() => {
    UserService.getCurrentUser()
      .then(res => {
        let block = res.data.data.blocked_diary?.includes(route.params.userId);
        if (block) {
          navigation.setOptions({title: 'Không thể truy cập'});
        }
        setBlockDiary(block);
      })
      .catch(error => {
        Notification.showErrorMessage(
          'Đã xảy ra lỗi khi lấy thông tin người dùng',
        );
      });
  }, []);
  return blockDiary ? (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(33,33,33,0.5)',
      }}>
      <FontAwesomeIcon icon={faCircleExclamation} color={COLOR.mainWhite} />
      <Text>Không thể truy cập</Text>
    </View>
  ) : (
    <PersonalProfile userId={route.params.userId} navigation={navigation} />
  );
};
const MainScreen = ({navigation}) => {
  const {user} = useSelector(selectAuth);
  return <PersonalProfile userId={user._id} navigation={navigation} />;
};

const FriendListScreen = ({navigation}) => {
  return <ListFriendComponent />;
};

const ProfileScreen = ({route, navigation}) => {
  let id = route.params.userId;
  const {user} = useSelector(selectAuth);
  return (
    <ProfileStack.Navigator
      initialRouteName={
        id === user._id ? 'MainScreen' : 'AnotherProfileScreen'
      }>
      <ProfileStack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          tabBarStyle: {display: 'none'},
          headerTitleAlign: 'center',
        }}
      />
      <ProfileStack.Screen
        name="UpdateInfoScreen"
        component={UpdateInfoScreen}
        options={{
          tabBarStyle: {display: 'none'},
          title: 'Sửa thông tin',
          headerTitleAlign: 'center',
        }}
      />
      <ProfileStack.Screen
        name="AnotherProfileScreen"
        component={AnotherProfileScreen}
        initialParams={{userId: id}}
        options={{
          tabBarStyle: {display: 'none'},
          headerTitleAlign: 'center',
        }}
      />
      <ProfileStack.Screen
        name="FriendListScreen"
        component={FriendListScreen}
        initialParams={{userId: id}}
        options={{
          tabBarStyle: {display: 'none'},
          headerTitleAlign: 'center',
          title: 'Danh sách bạn bè',
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileScreen;
