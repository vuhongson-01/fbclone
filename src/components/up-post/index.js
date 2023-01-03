import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native';
import React from 'react';
import defaultAvatar from '../../../assets/images/default-avatar-profile.jpg';
import ImageIcon from '../../../assets/icon/ImageIcon';

const UpPost = ({userInfo}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Posts</Text>
      <TouchableHighlight>
        <View style={styles.inputField}>
          <Image
            source={userInfo.avatar ? userInfo.avatar : defaultAvatar}
            style={{
              width: 48,
              height: 48,
              borderRadius: 48,
              resizeMode: 'contain',
              borderColor: '#e0e0e0',
              borderWidth: 1,
            }}
          />
          <Text
            style={{
              paddingHorizontal: 16,
              borderColor: '#e0e0e0',
              borderRadius: 32,
              paddingVertical: 10,
              borderWidth: 1,
              marginHorizontal: 12,
              color: '#212121',
              fontSize: 16,
              flex: 1,
            }}>
            What's on your mind?
          </Text>
          <ImageIcon />
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    paddingVertical: 12,
  },
  inputField: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default UpPost;
