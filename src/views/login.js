import {useState} from 'react';
import {Image, Text, View} from 'react-native';
import {Avatar} from 'react-native-ui-lib';
import {useDispatch} from 'react-redux';
import MyButton from '../components/button';
import InputBar from '../components/input-bar';
import {COLOR} from '../constants/constants';
import {loginUser} from '../store/auth/authSlice';
import Notification from '../utils/Notification';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onPressLogin = async () => {
    let body = {
      phonenumber: username,
      password: password,
    };

    try {
      const loginData = await dispatch(loginUser(body)).unwrap();
      if (loginData.success) {
        Notification.showSuccessMessage('Đăng nhập thành công');
        navigation.reset({
          index: 0,
          routes: [{name: 'HomePage'}],
        });
      } else {
        Notification.showErrorMessage(loginData.message);
      }
    } catch (error) {
      Notification.showErrorMessage(error.message);
    }
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
          backgroundColor={COLOR.mainBlue}
          color={COLOR.mainWhite}
          rippleColor={COLOR.mainBlue}
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
          backgroundColor={COLOR.mainGreen}
          color={COLOR.mainWhite}
          rippleColor={COLOR.mainGreen}
          onPress={onPressCreateNewAccount}
        />
      </View>
    </View>
  );
};

export default Login;
