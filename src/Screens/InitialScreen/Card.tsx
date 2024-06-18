import React, {useCallback} from 'react';

import {useNavigation} from '@react-navigation/native';
import {Screens} from '@/Helpers';
import {Button, TouchableRipple} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';

interface CardProps {
  title: string;
  screen: Screens;
  index: number;
}

const AnimatedTouchableRipple =
  Animated.createAnimatedComponent(TouchableRipple);

export default (props: CardProps) => {
  const {title, screen, index} = props;
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.navigate(screen as never);
  }, [navigation, screen]);

  return (
    <AnimatedTouchableRipple
      entering={FadeInDown.delay(index * 50).springify()}
      style={styles.container}>
      <Button mode="contained-tonal" onPress={onPress}>
        {title}
      </Button>
    </AnimatedTouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});
