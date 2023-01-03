import axios from 'axios';
import React from 'react';
import {Text, View} from 'react-native-ui-lib';
import {BASE_URL} from '../constants/constants';

class Login extends React.Component {
  async componentDidMount() {
    let params = {
      phonenumber: '222333',
      password: 'abc123',
    };
    let url = `${BASE_URL}users/login`;
    await axios
      .post(url, params)
      .then(res => console.log(res.data))
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <View>
        <Text>login</Text>
      </View>
    );
  }
}

export default Login;
