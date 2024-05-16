import {Image, StyleSheet, Text} from 'react-native';
import React from 'react';
import CommonStyle from '../Helpers/CommonStyle';
import LinearGradient from 'react-native-linear-gradient';
import {randomColor} from '../Helpers/Utils';
import Carousel from 'react-native-reanimated-carousel';
import {widthPx} from '../Helpers/Responsive';
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
const CommentItem = (props: CommentItemProps) => {
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
          data={item.image}
          scrollAnimationDuration={1000}
          onSnapToItem={index => console.log('current index:', index)}
          renderItem={({item}) => (
            <Image
              style={styles.imageStyle}
              source={{
                uri: item,
              }}
            />
          )}
        />
      ) : (
        <Image
          style={styles.imageStyle}
          source={{
            uri: item.image as string,
          }}
        />
      )}
    </LinearGradient>
  );
};

export default CommentItem;

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
