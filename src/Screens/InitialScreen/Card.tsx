import React, {useCallback} from 'react';

import {useNavigation} from '@react-navigation/native';
import {Screens} from '@/Helpers';
import {Button, TouchableRipple} from 'react-native-paper';

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
    <TouchableRipple>
      <Button mode="contained-tonal" onPress={onPress}>
        {title}
      </Button>
    </TouchableRipple>
  );
};

export default Card;
