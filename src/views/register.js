import React, {useEffect, useState} from 'react';
import {
  Avatar,
  Incubator,
  View,
  RadioGroup,
  RadioButton,
  Text,
  Checkbox,
  Button,
} from 'react-native-ui-lib';
import _ from 'lodash';
import UserService from '../helper/services/UserService';
import {buttonColor} from '../constants/theme/config.js';
const {TextField} = Incubator;
const options = ['Nam', 'Nữ'];
const logo = require('../../assets/image/Logo.png');

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Nam');
  const [phonenumber, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [confirm, setConfirm] = useState(true);

  const [validName, setValidName] = useState(false);
  const [validGender, setValidGender] = useState(true);
  const [validPhone, setValidPhone] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const [isCheckpass, setCheckpass] = useState(false);

  const [validForm, setValidForm] = useState(false);

  const register = (name, gender, phone, password) => {
    const requestBody = {
      username: name,
      gender: gender,
      phonenumber: phone,
      password: password,
    };
    UserService.register(requestBody)
      .then(res => {
        // console.log(res.data.data);
        navigation.navigate('TopTop');
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (
      validName &&
      validGender &&
      validPhone &&
      validPass &&
      isCheckpass &&
      confirm
    ) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
    // console.log("validForm", validForm);
  }, [validName, validGender, validPhone, validPass, isCheckpass, confirm]);

  useEffect(() => {
    if (confirmPass != password) {
      setCheckpass(false);
    } else {
      setCheckpass(true);
    }
  }, [confirmPass]);

  function RenderRadioButton(value, text, select, props) {
    return (
      <View row marginR-10>
        <RadioButton
          value={value}
          label={text}
          selected={select}
          {...props}
          color={buttonColor.color1}
        />
      </View>
    );
  }

  return (
    <View centerV paddingH-20 paddingT-50>
      <View centerH>
        <Avatar source={logo} size={80} />
      </View>
      <View>
        <TextField
          fieldStyle={{borderBottomWidth: 1, padding: 2}}
          placeholder="Họ tên"
          floatingPlaceholder
          onChangeText={value => setName(value)}
          enableErrors
          validate={['required']}
          validateOnBlur
          validationMessage={['Trường bắt buộc']}
          onChangeValidity={isValid => {
            setValidName(isValid);
            // console.log('valid name:', isValid);
          }}
          maxLength={60}
        />
      </View>
      <View row>
        <RadioGroup
          row
          initialValue={this.gender}
          onValueChange={value => setGender(value)}>
          <Text text70 marginR-20 $textDefault>
            Giới tính:
          </Text>
          <View row>
            {RenderRadioButton('Nam', 'Nam', true, {marginLeft: 5})}
            {RenderRadioButton('Nữ', 'Nữ', false, {marginLeft: 5})}
            {RenderRadioButton('Khác', 'Khác', false)}
          </View>
        </RadioGroup>
      </View>
      <View>
        <TextField
          fieldStyle={{borderBottomWidth: 1, padding: 2}}
          placeholder={'Số điện thoại'}
          floatingPlaceholder
          onChangeText={value => setPhone(value)}
          enableErrors
          validate={['required', 'number', value => value.length == 10]}
          validateOnBlur
          validationMessage={[
            'Trường bắt buộc',
            'Điện thoại chỉ gồm số',
            'Số điện thoại không hợp lệ',
          ]}
          onChangeValidity={isValid => {
            setValidPhone(isValid);
            // console.log('phone', isValid);
          }}
          maxLength={30}
          keyboardType="numeric"
        />
      </View>
      <View>
        <TextField
          fieldStyle={{borderBottomWidth: 1, padding: 2}}
          placeholder={'Mật khẩu'}
          floatingPlaceholder
          onChangeText={value => setPassword(value)}
          enableErrors
          validate={['required', value => value.length >= 6]}
          validateOnBlur
          validationMessage={['Trường bắt buộc', 'Mật khẩu quá ngắn']}
          onChangeValidity={isValid => {
            setValidPass(isValid);
            // console.log('pass', isValid);
          }}
          maxLength={30}
          secureTextEntry={true}></TextField>
      </View>

      <View>
        <TextField
          fieldStyle={{borderBottomWidth: 1, padding: 2}}
          placeholder={'Xác nhận mật khẩu'}
          floatingPlaceholder
          onChangeText={value => setConfirmPass(value)}
          enableErrors
          validate={['required']}
          validateOnBlur
          validationMessage={['Trường bắt buộc']}
          maxLength={30}
          secureTextEntry={true}
        />
        {!isCheckpass && <Text red30>Confirm password doesn't match</Text>}
        <Text></Text>
      </View>

      <View row marginT-10>
        <Text marginR-10>
          Tôi đông ý với <Text>điều khoản sử dụng</Text>
        </Text>
        <Checkbox
          value={confirm}
          onValueChange={value6 => setConfirm(value6)}
          borderRadius={5}
          size={25}
          color={buttonColor.color1}
        />
      </View>

      <View marginT-20>
        <Button
          borderRadius={50}
          disabled={!validForm}
          label="Đăng ký"
          onPress={() => register(name, gender, phonenumber, password)}
        />
      </View>

      <View centerH row marginT-20>
        <Text>Bạn đã có tài khoản?</Text>
        <Button
          marginL-10
          text80
          link
          label="Đăng nhập"
          onPress={() => {
            navigation.goBack();
          }}></Button>
      </View>
    </View>
  );
};

export default Register;
