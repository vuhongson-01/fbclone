import React from 'react';
import {View} from 'react-native-ui-lib';
import RootNavigator from './src/views/RootNavigator';

import FlashMessage from 'react-native-flash-message';

export default function App() {
  return (
    <View style={{height: '100%', flex: 1}}>
      <RootNavigator />
      <FlashMessage position="top" />
    </View>
  );
}
