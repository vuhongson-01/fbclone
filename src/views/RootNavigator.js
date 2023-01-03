import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DetailPost from '../components/detail_post';
import Settings from './settings_page';
import Login from './login';

import PersonalProfileScreen from './personal-profile';
import TmpScreen from './temporary';
import Register from './register';
import CreatePost from './createpost';
import PickImg from '../test/pickImage';

import EmojiTest from '../test/emoji_test';
import Comment from './Comment';
import Homepage from './HomePage';
import Init from './Init';
const Stack = createNativeStackNavigator();
const RootNavigator = () => {
  const options = {
    headerShown: false,
  };
  // const option1 = {};
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Init">
        <Stack.Screen name="Init" component={Init} options={options} />
        <Stack.Screen name="TopTop" component={TmpScreen} />
        <Stack.Screen name="HomePage" component={Homepage} options={options} />
        <Stack.Screen
          name="EmojiTest"
          component={EmojiTest}
          options={options}
        />
        <Stack.Screen
          name="CommentPage"
          component={Comment}
          options={options}
        />
        <Stack.Screen name="LogIn" component={Login} options={options} />
        <Stack.Screen name="SignUp" component={Register} options={options} />
        <Stack.Screen
          name="CreatePost"
          component={CreatePost}
          options={options}
        />
        <Stack.Screen name="PickImg" component={PickImg} options={options} />
        <Stack.Screen
          name="PersonalProfileScreen"
          component={PersonalProfileScreen}
          options={options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
