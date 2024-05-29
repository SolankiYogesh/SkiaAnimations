import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, CommonStyle} from '@/Helpers';

interface FloatButtonProps {
  isActive: boolean;
  onPress: () => void;
}
const FloatButton = (props: FloatButtonProps) => {
  const {isActive, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text>{!isActive ? 'Start' : 'Stop'}</Text>
    </TouchableOpacity>
  );
};

export default FloatButton;

const styles = StyleSheet.create({
  container: {
    ...CommonStyle.shadow,
    width: 50,
    height: 50,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.white,
    ...CommonStyle.center,
  },
});
