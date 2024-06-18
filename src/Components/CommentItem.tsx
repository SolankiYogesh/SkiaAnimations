import {Image, StyleSheet, Text} from 'react-native';
import React from 'react';

import LinearGradient from 'react-native-linear-gradient';

import Carousel from 'react-native-reanimated-carousel';
import {randomColor} from 'utils';
import {CommonStyle} from '@/Helpers';
import {widthPx} from 'measurements';
import Animated from 'react-native-reanimated';

export interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
  image: string | string[];
}
interface CommentItemProps {
  item: Comment;
}
export default (props: CommentItemProps) => {
  const {item} = props;

  return (
    <LinearGradient colors={randomColor()} style={[styles.itemContainer]}>
      <Text style={styles.nameTextStyle}>
        {item.name + '   '}
        <Text style={styles.emailTextStyle}>{item.email}</Text>
      </Text>

      <Text style={styles.bodyTextStyle}>{item.body}</Text>
      {item.image.length > 0 && typeof item.image === 'object' ? (
        <Carousel
          loop
          width={widthPx(90)}
          height={200}
          autoPlay={true}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          data={item.image}
          scrollAnimationDuration={500}
          renderItem={({item: ItemR}) => (
            <Image
              style={styles.imageStyle}
              source={{
                uri: ItemR,
              }}
            />
          )}
        />
      ) : (
        <Animated.Image
          style={styles.imageStyle}
          source={{
            uri: item.image as string,
          }}
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    rowGap: 10,
    ...CommonStyle.shadow,
  },
  imageStyle: {
    width: widthPx(90),
    height: 200,
    padding: 10,
    borderRadius: 20,
  },
  nameTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  emailTextStyle: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
  },
  bodyTextStyle: {
    fontSize: 13,
    fontWeight: '300',
  },
});
