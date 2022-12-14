import {View, Text, TextInput} from 'react-native';
import React, {useRef, useState} from 'react';

const InputBar = ({
  placeholder = '',
  isSecure = false,
  setInput,
  onChangeText = () => {},
  keyboardType = 'default',
}) => {
  const [isFocus, setFocus] = useState(false);
  // const refInput = useRef();

  // if (focus) refInput.current?.focus();
  // else refInput.current?.blur();
  return (
    <View style={{width: '100%'}}>
      <TextInput
        // ref={refInput}
        keyboardType={keyboardType}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => {
          // refInput.current?.blur();
          setFocus(false);
        }}
        onChangeText={input => {
          setInput(input);
          onChangeText();
        }}
        secureTextEntry={isSecure}
        style={{
          borderBottomColor: isFocus ? 'blue' : 'gray',
          borderBottomWidth: isFocus ? 1.5 : 1,
          fontSize: 18,
        }}
      />
    </View>
  );
};

export default InputBar;
