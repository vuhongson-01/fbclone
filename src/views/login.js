import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import InputBar from '../components/input-bar';
import MyButton from '../components/button';
import {buttonColor} from '../constants/theme/config';
import UserService from '../helper/services/UserService';
import Notification from '../utils/Notification';
import {Avatar} from 'react-native-ui-lib';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onPressLogin = () => {
    let body = {
      phonenumber: username,
      password: password,
    };
    UserService.login(body)
      .then(res => {
        Notification.showSuccessMessage('Đăng nhập thành công');
        navigation.navigate('TopTop');
        console.log(res.data.token);
      })
      .catch(err => {
        Notification.showErrorMessage(
          'Tên đăng nhập hoặc mật khẩu chưa chính xác',
          '',
        );
      });
  };

  const onPressCreateNewAccount = () => {
    navigation.navigate('SignUp');
  };
  return (
    <View>
      <View style={{width: '100%', height: 200, alignItems: 'center'}}>
        <Image
          source={require('../../assets/images/cover.png')}
          resizeMode="cover"
          style={{
            width: '100%',
            height: 200,
          }}
        />
        <Avatar
          containerStyle={{
            position: 'absolute',
            top: 60,
            height: 80,
            width: 80,
          }}
          source={require('../../assets/images/logo.png')}
          size={80}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 32,
          paddingTop: 72,
          alignItems: 'center',
        }}>
        <InputBar
          placeholder={'Email hoặc số điện thoại'}
          setInput={setUsername}
          keyboardType={'email-address'}
        />
        <InputBar
          placeholder={'Mật khẩu'}
          isSecure={true}
          setInput={setPassword}
        />

        <MyButton
          label="Đăng nhập"
          backgroundColor={buttonColor.color1}
          color={'white'}
          rippleColor="#6868ff"
          onPress={onPressLogin}
        />
        <View
          style={{
            borderBottomWidth: 1,
            width: '100%',
            borderBottomColor: 'gray',
            position: 'relative',
            marginVertical: 40,
          }}>
          <Text
            style={{
              backgroundColor: 'inherit',
              bottom: -9,
              display: 'flex',
              alignSelf: 'center',
              position: 'absolute',
            }}>
            OR
          </Text>
        </View>
        <MyButton
          label="Tạo tài khoản mới"
          backgroundColor={buttonColor.color2}
          color={'white'}
          rippleColor="#0f8a0f"
          onPress={onPressCreateNewAccount}
        />
      </View>
    </View>
  );
};

export default Login;
