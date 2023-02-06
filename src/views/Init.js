import { COLOR } from '../constants/constants';
import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Avatar } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import {
  CreateTable,
  getFirstUsers,
  getAllUsers,
} from '../helper/sqlite/user_query';
import { loadToken, loadUser } from '../store/auth/authSlice';

const Init = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await CreateTable();
      const userData = await dispatch(loadUser()).unwrap();
      console.log(userData);
      if (userData.user) {
        // const user = await dispatch(loadUser()).unwrap();
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomePage' }],
        });
        // navigation.navigate('HomePage');
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'LogIn' }],
        });
      }
    };
    fetchData();
  }, []);
  return (
    <View style={styles.loadingScreen}>
      <Avatar source={require('../../assets/images/logo.png')} size={100} />
      <View style={styles.dotsWrapper}>
        <ActivityIndicator size="large" color={COLOR.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsWrapper: {
    marginTop: 10,
    width: '30%',
  },
});

export default Init;
