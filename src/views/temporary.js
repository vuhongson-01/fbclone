import {Button, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React from 'react';
import Demo from '../../assets/icon/icon-demo';

const TmpScreen = ({navigation}) => {
  return (
    <View>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate('PersonalProfileScreen');
        }}>
        <Text style={styles.text}>PersonalProfileScreen</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate('LogIn');
        }}>
        <Text style={styles.text}>LogIn</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate('HomePage');
        }}>
        <Text style={styles.text}>Homepage</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate('SignUp');
        }}>
        <Text style={styles.text}>SignUp</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate('CreatePost');
        }}>
        <Text style={styles.text}>CreatePost</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate('PickImg');
        }}>
        <Text style={styles.text}>PickImg</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate('EmojiTest');
        }}>
        <Text style={styles.text}>Emoji Test</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate('CommentPage', {
            postId: '639db920e1077b28b889119f',
          });
        }}>
        <Text style={styles.text}>Comment Page</Text>
      </TouchableHighlight>
      <Demo />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 12,
    padding: 12,
    backgroundColor: 'blue',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default TmpScreen;
