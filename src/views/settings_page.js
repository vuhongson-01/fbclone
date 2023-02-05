import React from 'react';
import {
  BackHandler,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {faPowerOff, faSignOut, faKey} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {COLOR} from '../constants/constants';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser, selectAuth} from '../store/auth/authSlice';
import {Avatar} from 'react-native-ui-lib';
import UserService from '../helper/services/UserService';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLOR.background,
    fontFamily: 'Roboto',
    padding: 10,
  },
  topContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  exitContainer: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    marginLeft: '5%',
  },
  logoutContainer: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    borderTopColor: COLOR.mainGray,
    borderTopWidth: 1,
    marginLeft: '5%',
    backgroundColor: COLOR.mainGraySmoke,
  },
  userContainer: {
    display: 'flex',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLOR.mainGray,
    borderBottomWidth: 1,
    marginLeft: '5%',
    paddingTop: 5,
    paddingBottom: 5,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
  },
  username: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOR.text,
  },
  viewProfile: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'normal',
    color: COLOR.placeholder,
  },
});

const Settings = ({navigation}) => {
  const {user} = useSelector(selectAuth);
  const dispatch = useDispatch();

  const logoutAction = () => {
    Alert.alert('Thông báo', 'Bạn có thực sự muốn đăng xuất', [
      {
        text: 'Hủy',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Có',
        onPress: () => {
          dispatch(logoutUser());
          navigation.reset({
            index: 0,
            routes: [{name: 'LogIn'}],
          });
        },
      },
    ]);
  };

  const changePassword = () => {
    UserService.changePassword({
      currentPassword: 'abc123',
      newPassword: 'abc123',
    })
      .then(res => {
        console.log(res.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View
          style={{
            borderBottomWidth: 2,
            borderColor: COLOR.placeholder,
          }}>
          <View style={{padding: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 22, color: COLOR.text}}>
              Menu
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProfileScreen', {userId: user?._id})
          }>
          <View style={styles.userContainer}>
            <Avatar source={{uri: user?.avatar}} size={64} />
            <View style={styles.textContainer}>
              <Text style={styles.username}>{user?.username}</Text>
              <Text style={styles.viewProfile}>Xem trang cá nhân của bạn</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.topContainer}>
        <View
          style={{
            borderBottomWidth: 2,
            borderColor: COLOR.placeholder,
          }}>
          <View style={{padding: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 22, color: COLOR.text}}>
              Thao tác
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.exitContainer}
          onPress={() => BackHandler.exitApp()}>
          <FontAwesomeIcon icon={faPowerOff} size={24} />
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              color: COLOR.text,
              marginLeft: 10,
            }}>
            Thoát ứng dụng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exitContainer} onPress={changePassword}>
          <FontAwesomeIcon icon={faKey} size={24} />
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              color: COLOR.text,
              marginLeft: 10,
            }}>
            Đổi mật khẩu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutContainer} onPress={logoutAction}>
          <FontAwesomeIcon icon={faSignOut} size={24} />
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              color: COLOR.text,
              marginLeft: 10,
            }}>
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
