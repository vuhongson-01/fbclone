import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import HeaderSearch from '../header-search/HeaderSearch';

const Layout = ({navigation, children}) => {
  return (
    <View>
      <View style={styles.container}>
        <HeaderSearch navigation={navigation} />
        {children}
      </View>
      {/* <View style={styles.drawerContainer}></View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  drawerContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(33,33,33,0.2)',
  },
});

export default Layout;
