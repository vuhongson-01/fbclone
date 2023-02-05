import React, {useEffect, useState} from 'react';
import {View} from 'react-native-ui-lib';
import RootNavigator from './src/routes/RootNavigator';

import FlashMessage from 'react-native-flash-message';
import {useNetInfo} from '@react-native-community/netinfo';
import Notification from './src/utils/Notification';

export default function App() {
  const [isConnected, setIsConnected] = useState(true);
  const netInfo = useNetInfo();

  useEffect(() => {
    if (netInfo.type != 'wifi' && netInfo.type != 'cellular') {
      setIsConnected(false);
    } else {
      setIsConnected(true);
    }
  }, [netInfo]);

  useEffect(() => {
    if (isConnected) {
      Notification.showSuccessMessage('Đã kết nối internet');
    } else {
      Notification.showNotInternetMessage('Không có kết nối internet');
    }
  }, [isConnected]);

  return (
    <View style={{height: '100%', flex: 1}}>
      <RootNavigator />
      <FlashMessage position={isConnected ? 'top' : 'bottom'} />
    </View>
  );
}
