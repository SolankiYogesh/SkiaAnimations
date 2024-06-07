import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {UserType} from '../AnimatedListUserScreen';
import {Colors, CommonStyle} from '@/Helpers';
import Animated, {FadeInDown, PinwheelOut} from 'react-native-reanimated';
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
      exiting={PinwheelOut.duration(1000)}
      style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={{
          uri: item.profileImage,
        }}
      />
      <View style={CommonStyle.flex}>
        <Text style={styles.nameStyle}>{item.name}</Text>
        <Text style={styles.scoreStyle}>{'Score : ' + item.score}</Text>
      </View>
      <TouchableOpacity
        onPress={onPressDelete}
        style={styles.deleteIconContainer}>
        <Image
          source={require('../../../data/Images/bin.png')}
          style={styles.deleteImageStyle}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    flex: 1,
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    ...CommonStyle.shadow,
    columnGap: 20,
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 300,
  },
  nameStyle: {
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: 16,
  },
  scoreStyle: {
    fontWeight: '400',
    color: Colors.blue,
    fontSize: 14,
  },
  deleteImageStyle: {
    width: '100%',
    height: '100%',
  },
  deleteIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 300,
    marginRight: 20,
  },
});
