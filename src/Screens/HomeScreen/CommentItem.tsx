import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
export interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
  image: string;
}
interface CommentItemProps {
  item: Comment;
}
const CommentItem = (props: CommentItemProps) => {
  const {item} = props;
  const backgroundColor =
    '#' + (1 * Math.pow(2, 24) * Math.random()).toString(16).padStart(6, '0');
  return (
    <View
      style={[
        styles.itemContainer,
        {
          backgroundColor,
        },
      ]}>
      <Text style={styles.nameTextStyle}>
        {item.name + '   '}
        <Text style={styles.emailTextStyle}>{item.email}</Text>
      </Text>

      <Text style={styles.bodyTextStyle}>{item.body}</Text>
      <Image
        style={styles.imageStyle}
        source={{
          uri: item.image,
        }}
      />
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  itemContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    rowGap: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imageStyle: {
    width: '100%',
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
