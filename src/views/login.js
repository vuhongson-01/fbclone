import { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { Avatar } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import MyButton from '../components/button';
import { Input } from '@rneui/themed';
import { COLOR } from '../constants/constants';
import { loginUser } from '../store/auth/authSlice';
import Notification from '../utils/Notification';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TouchableOpacity } from 'react-native';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isShow1, setIsShow1] = useState(false);
  const dispatch = useDispatch();

  const onPressLogin = async () => {
    let body = {
      phonenumber: username,
      password: password,
    };

    try {
      const loginData = await dispatch(loginUser(body)).unwrap();
      if (loginData.success) {
        // Notification.showSuccessMessage('Đăng nhập thành công');
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomePage' }],
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
      <View style={{ width: '100%', height: 200, alignItems: 'center' }}>
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
        <Input
          placeholder={'Email hoặc số điện thoại'}
          onChangeText={value => setUsername(value)}
          placeholderTextColor={COLOR.placeholder}
          style={{ color: COLOR.text }}
        />
        <Input
          placeholder={'Mật khẩu'}
          onChangeText={value => setPassword(value)}
          placeholderTextColor={COLOR.placeholder}
          secureTextEntry={!isShow1}
          style={{ color: COLOR.text }}
          rightIcon={
            <TouchableOpacity onPress={() => setIsShow1(!isShow1)}>
              <FontAwesomeIcon icon={isShow1 ? faEye : faEyeSlash} />
            </TouchableOpacity>
          }
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
              color: 'gray'
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
