/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */

import React from 'react';
import {UserType} from '../AnimatedListUserScreen';

import Animated, {FadeInDown, PinwheelOut} from 'react-native-reanimated';
import {Avatar, List} from 'react-native-paper';
import {Pressable} from 'react-native';
interface UserItemProps {
  item: UserType;
  index: number;
  onPressDelete: () => void;
}
const UserItem = (props: UserItemProps) => {
  const {item, index, onPressDelete} = props;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      exiting={PinwheelOut.duration(1000)}>
      <List.Item
        title={item.name}
        description="Item description"
        right={props => (
          <Pressable onPress={onPressDelete}>
            <Avatar.Image
              size={45}
              {...props}
              source={require('../../../data/Images/bin.png')}
            />
          </Pressable>
        )}
        left={props => (
          <Avatar.Image
            {...props}
            source={{
              uri: item.profileImage,
            }}
          />
        )}
      />
    </Animated.View>
  );
};

export default UserItem;
