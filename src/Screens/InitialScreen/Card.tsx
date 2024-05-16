import {Pressable, StyleSheet, Text} from 'react-native';
import React, {useCallback} from 'react';

import {useNavigation} from '@react-navigation/native';
import {Colors, CommonStyle, Screens} from '@/Helpers';

interface CardProps {
  title: string;
  screen: Screens;
}
const Card = (props: CardProps) => {
  const {title, screen} = props;
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.navigate(screen as never);
  }, [navigation, screen]);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.titleStyle}>{title}</Text>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    margin: 15,
    backgroundColor: Colors.white,
    ...CommonStyle.shadow,
    borderRadius: 20,
    ...CommonStyle.center,
  },
  titleStyle: {
    fontStyle: 'italic',
    fontSize: 15,
    color: Colors.blue,
  },
});
