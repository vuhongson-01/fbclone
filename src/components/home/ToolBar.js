import {COLOR} from '../../constants/constants';
import React from 'react';

import {View, StyleSheet, Text} from 'react-native';

import {Avatar} from 'react-native-ui-lib';
import {TouchableOpacity} from 'react-native-ui-lib';

import {useSelector} from 'react-redux';
import {selectAuth} from '../../store/auth/authSlice';

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: 72,
    marginLeft: 12,
  },
  Row: {
    flexDirection: 'row',
    background: COLOR.background,
    width: '100%',
    paddingHorizontal: 0,
    paddingVertical: 11,
    alignUtems: 'center',
  },
  Input: {
    height: 50,
    width: '100%',
    paddingHorizontal: 0,
    paddingVertical: 8,
    marginLeft: 8,
    fontSize: 16,
    color: COLOR.mainBlack,
  },
  Divider: {
    width: '100%',
    height: 0.5,
    background: COLOR.mainGraySmoke,
  },
  Menu: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
  },
  MenuText: {
    paddingLeft: 11,
    fontWeight: 500,
    fontSize: 12,
  },
  Separator: {
    width: 1,
    height: 26,
    background: COLOR.mainGraySmoke,
  },
  BottomDivider: {
    width: '100%',
    height: 9,
    backgroundColor: '#bbb',
  },
});

const ToolBar = () => {
  const {user} = useSelector(selectAuth);

  return (
    <>
      <View style={styles.Container}>
        <View style={styles.Row}>
          <Avatar
            source={{uri: user?.avatar}}
            onPress={() => handleAvatarPress(user?._id)}
          />
          <TouchableOpacity onPress={() => handleFocus()}>
            <Text style={styles.Input}> Bạn đang nghĩ gì? </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.Divider} />
      <View style={styles.BottomDivider} />
    </>
  );
};

export default ToolBar;
