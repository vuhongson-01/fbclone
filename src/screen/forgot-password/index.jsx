import {View, Text} from 'react-native';
import React, {useState} from 'react';
import InputBar from '../../component/input-bar';
import MyButton from '../../component/button';
import {buttonColor} from '../../theme/config';

const ForgotPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notice, setNotice] = useState(false);
  const [usePhoneNumber, setProperty] = useState(true);
  const findYourAccount = () => {
    if (phoneNumber.length == 0) setNotice(true);
    else {
      console.log('find-account');
    }
  };

  const changeAddress = () => {
    setProperty(!usePhoneNumber);
  };
  return (
    <View
      style={{
        alignItems: 'center',
        padding: 20,
        height: '100%',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 14,
            marginBottom: 24,
          }}>
          Enter Your {usePhoneNumber ? 'Email' : 'Phone'} Number
        </Text>

        <InputBar
          placeholder={usePhoneNumber ? 'Email' : 'Phone'}
          setInput={setPhoneNumber}
          onChangeText={() => {
            setNotice(false);
          }}
          keyboardType={!usePhoneNumber ? 'numeric' : 'email-address'}
        />

        <Text
          style={{
            width: '100%',
            color: notice ? 'red' : 'transparent',
          }}>
          Enter your {usePhoneNumber ? 'email' : 'phone'}
        </Text>
        <MyButton
          label={'Find your account'}
          color={'white'}
          backgroundColor={buttonColor.color1}
          rippleColor={'#6868ff'}
          onPress={findYourAccount}
        />
      </View>

      <MyButton
        label={
          'Search by your ' + (usePhoneNumber ? 'phone' : 'email') + ' instead'
        }
        color={'#3e3efc'}
        backgroundColor={buttonColor.transparent}
        rippleColor={'#c1c1c1'}
        onPress={changeAddress}
      />
    </View>
  );
};

export default ForgotPassword;
