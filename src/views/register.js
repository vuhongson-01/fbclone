import {useEffect, useState} from 'react';
import {Image, ScrollView} from 'react-native';
import {
  Avatar,
  Button,
  Checkbox,
  Incubator,
  Text,
  View,
} from 'react-native-ui-lib';
import MyButton from '../components/button';
import {COLOR} from '../constants/constants';
import UserService from '../helper/services/UserService';
import Notification from '../utils/Notification';
const {TextField} = Incubator;
const options = ['Nam', 'Nữ'];
const logo = require('../../assets/image/Logo.png');

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [phonenumber, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [confirm, setConfirm] = useState(true);

  const [validName, setValidName] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const [isCheckpass, setCheckpass] = useState(false);

  const [validForm, setValidForm] = useState(false);

  const register = (name, phone, password) => {
    const requestBody = {
      username: name,
      phonenumber: phone,
      password: password,
    };
    UserService.register(requestBody)
      .then(res => {
        Notification.showSuccessMessage('Đăng ký thành công');
        console.log(res.data.data);
      })
      .catch(err => {
        console.log(err);
        Notification.showErrorMessage('Đăng ký không thành công');
      });
  };

  useEffect(() => {
    if (validName && validPhone && validPass && isCheckpass && confirm) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
    // console.log("validForm", validForm);
  }, [validName, validPhone, validPass, isCheckpass, confirm]);

  useEffect(() => {
    if (confirmPass != password) {
      setCheckpass(false);
    } else {
      setCheckpass(true);
    }
  }, [confirmPass]);

  return (
    <ScrollView>
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
        <View centerV paddingH-32>
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
                console.log('valid name:', isValid);
              }}
              maxLength={30}
            />
          </View>
          <View>
            <TextField
              fieldStyle={{borderBottomWidth: 1, padding: 2}}
              placeholder={'Số điện thoại'}
              floatingPlaceholder
              onChangeText={value => setPhone(value)}
              enableErrors
              validate={['required', 'number', value => value.length >= 9]}
              validateOnBlur
              validationMessage={[
                'Trường bắt buộc',
                'Điện thoại chỉ gồm số',
                'Số điện thoại không hợp lệ',
              ]}
              onChangeValidity={isValid => {
                setValidPhone(isValid);
                console.log('phone', isValid);
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
                console.log('pass', isValid);
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
              color={COLOR.icon}
            />
          </View>

          <View marginT-10>
            <MyButton
              label="Đăng ký"
              backgroundColor={COLOR.mainBlue}
              color={COLOR.mainWhite}
              rippleColor={COLOR.mainBlue}
              onPress={() => register(name, phonenumber, password)}
              disabled={!validForm}
            />
            {/* <Button borderRadius={50} disabled={!validForm} label="Đăng ký" onPress={() => register(name, phonenumber, password)} /> */}
          </View>

          <View centerH row marginT-20>
            <Text>Bạn đã có tài khoản?</Text>
            <Button
              marginL-10
              text80
              link
              label="Đăng nhập"
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'LogIn'}],
                });
              }}></Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;
