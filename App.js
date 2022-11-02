import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screen/login';
import SignUp from './src/screen/signup';
import {View} from 'react-native';
import ForgotPassword from './src/screen/forgot-password';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LogIn"
          component={Login}
          options={{header: () => <View></View>}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: 'Create account',
            headerShadowVisible: false,
            headerBackground: () => (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'transparent',
                  borderBottomColor: '#b6b6b6',
                  borderBottomWidth: 0.5,
                }}></View>
            ),
            headerTitleStyle: {fontWeight: 'normal'},
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            title: 'Find your account',
            headerShadowVisible: false,
            headerBackground: () => (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'transparent',
                  borderBottomColor: '#b6b6b6',
                  borderBottomWidth: 0.5,
                }}></View>
            ),
            headerTitleStyle: {fontWeight: 'normal'},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
