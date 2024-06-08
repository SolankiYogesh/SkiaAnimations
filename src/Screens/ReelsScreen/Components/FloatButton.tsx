import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, CommonStyle} from '@/Helpers';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface FloatButtonProps {
  isActive: boolean;
  onPress: () => void;
}
const FloatButton = (props: FloatButtonProps) => {
  const {isActive, onPress} = props;
  const {bottom} = useSafeAreaInsets();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, {bottom: bottom + 20}]}>
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
    right: 20,
    backgroundColor: Colors.white,
    ...CommonStyle.center,
  },
});
