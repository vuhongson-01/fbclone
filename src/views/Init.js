import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import LoadingDots from 'react-native-loading-dots';
import {Avatar} from 'react-native-ui-lib';
import {
  CreateTable,
  getFirstUsers,
  getAllUsers,
} from '../helper/sqlite/user_query';

const Init = ({navigation}) => {
  useEffect(() => {
    const fetchData = async () => {
      await CreateTable();
      let res = await getFirstUsers();
      if (res.length > 0) {
        console.log(res[0].token);
        setTimeout(() => {
          navigation.navigate('TopTop');
        }, 2000);
      } else {
        navigation.navigate('LogIn');
      }
    };
    fetchData();
  }, []);
  return (
    <View style={styles.loadingScreen}>
      <Avatar source={require('../../assets/images/logo.png')} size={100} />
      <View style={styles.dotsWrapper}>
        <LoadingDots dots={5} size={15} colors={[]} />
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
