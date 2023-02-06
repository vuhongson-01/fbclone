import {View, Text, TouchableHighlight, Animated} from 'react-native';
import React, {useRef, useState} from 'react';

const MyButton = ({label, onPress, backgroundColor, color, rippleColor}) => {
  const [isPressIn, setPress] = useState(false);
  const widthValue = useRef(new Animated.Value(0)).current;
  const width = widthValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['102%', '100%'],
  });
  const animClick = () => {
    const p1 = Animated.timing(widthValue, {
      toValue: 1,
      duration: 50,
      useNativeDriver: false,
    });

    const p2 = Animated.timing(widthValue, {
      toValue: 0,
      duration: 50,
      useNativeDriver: false,
    });

    Animated.sequence([p1, p2]).start();
  };
  return (
    <Animated.View
      style={{
        width: width,
      }}>
      <TouchableHighlight
        underlayColor={rippleColor}
        style={{
          backgroundColor: backgroundColor,
          width: '100%',
          height: 42,
          borderRadius: 5,
          overflow: 'hidden',
          marginTop: 20,
        }}
        onPress={() => {
          onPress();
        }}
        onPressIn={() => {
          animClick();
          setPress(true);
        }}
        onPressOut={() => {
          setPress(false);
        }}>
        <View
          style={{
            display: 'flex',
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: color,
              fontWeight: 'bold',
              fontSize: 18,
              lineHeight: 18,
            }}>
            {label}
          </Text>
          {/* <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: isPressIn ? 'flex' : 'none',
              backgroundColor: '#00000010',
            }}
          /> */}
        </View>
      </TouchableHighlight>
    </Animated.View>
  );
};

export default MyButton;