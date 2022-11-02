import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import InputBar from '../../component/input-bar';
import MyButton from '../../component/button';
import {buttonColor} from '../../theme/config';

const Login = ({navigation}) => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  // const [inputAccFocus, setInputAccFocus] = useState(false);
  // const [inputPw, setInputPw] = useState(false);
  const onPressLogin = () => {
    // if (account.length == 0) {
    //   console.log('acc empty');
    //   setInputAccFocus(true);
    // } else if (password.length == 0) {
    //   console.log('pw empty');
    //   setInputPw(true);
    // } else {
    // }
  };
  const onPressForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const onPressCreateNewAccount = () => {
    navigation.navigate('SignUp');
  };
  return (
    <View>
      <Image
        source={require('../../../assets/images/cover.png')}
        resizeMode="cover"
        style={{
          width: '100%',
          height: 200,
        }}
      />
      <View
        style={{
          paddingHorizontal: 32,
          paddingTop: 72,
          alignItems: 'center',
        }}>
        <InputBar placeholder={'Phone or Email'} setInput={setAccount} />
        <InputBar
          placeholder={'Password'}
          isSecure={true}
          setInput={setPassword}
        />

        <MyButton
          label="Log In"
          backgroundColor={buttonColor.color1}
          color={'white'}
          rippleColor="#6868ff"
          onPress={onPressLogin}
        />

        <MyButton
          label="Forgot Password?"
          backgroundColor={buttonColor.transparent}
          color={'#3e3efc'}
          rippleColor="#c1c1c1"
          onPress={onPressForgotPassword}
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
          label="Create new Facebook account"
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
