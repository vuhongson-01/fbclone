import {Dimensions, Animated, TouchableHighlight} from 'react-native';
import React, {useRef, useEffect} from 'react';
import ArrowLeftIcon from '../../../assets/icon/ArrowLeftIcon';

const DrawerLayout = ({setOpen, children, direction}) => {
  if (direction === 'horizontal') return <HorizontalLayout setOpen={setOpen} />;
  if (direction === 'vertical') return <VerticalLayout setOpen={setOpen} />;
};

const HorizontalLayout = ({setOpen, children}) => {
  const windowWidth = Dimensions.get('window').width;
  const range = useRef(new Animated.Value(1)).current;
  const left = range.interpolate({
    inputRange: [0, 1],
    outputRange: [0, windowWidth],
  });
  const close = () => {
    Animated.timing(range, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  useEffect(() => {
    Animated.timing(range, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, []);
  return (
    <Animated.View
      style={{
        position: 'absolute',
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        left: left,
        zIndex: 2,
      }}>
      <TouchableHighlight
        underlayColor={'#e1e1e1'}
        onPress={() => {
          close();
        }}
        style={{
          padding: 12,
          borderRadius: 32,
        }}>
        <ArrowLeftIcon />
      </TouchableHighlight>
      {children}
    </Animated.View>
  );
};

const VerticalLayout = ({setOpen, children}) => {
  const windowHeight = Dimensions.get('window').height;
  const range = useRef(new Animated.Value(1)).current;
  const bottom = range.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -windowHeight / 2],
  });
  const close = () => {
    Animated.timing(range, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  useEffect(() => {
    Animated.timing(range, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, []);
  return (
    <Animated.View
      style={{
        position: 'absolute',
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        height: windowHeight / 2,
        bottom: bottom,
        zIndex: 2,
      }}>
      <TouchableHighlight
        underlayColor={'#e1e1e1'}
        onPress={() => {
          close();
        }}
        style={{
          padding: 12,
          borderRadius: 32,
        }}>
        <ArrowLeftIcon />
      </TouchableHighlight>
      {children}
    </Animated.View>
  );
};
export default DrawerLayout;
