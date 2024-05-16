import {View} from 'react-native';
import React, {useEffect} from 'react';

import {FlashList} from '@shopify/flash-list';
import {randomData} from '@/data/RandomData';
import CommentItem, {Comment} from '@/Components/CommentItem';
import {CommonStyle} from '@/Helpers';

const CarouselCommentList = () => {
  const [data, setData] = React.useState<Comment[]>([]);

  useEffect(() => {
    const parsedData = randomData.map(item => {
      return {
        id: item[0],
        name: item[1],
        email: item[3],
        body:
          item[2] +
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut alias tenetur dolorum vero blanditiis eveniet nisi, mollitia ipsa repudiandae! Tempore facilis quaerat',
        image: [
          'https://picsum.photos/200/300',
          'https://picsum.photos/200/300',
        ],
      };
    });
    setData(parsedData as Comment[]);
  }, []);

  return (
    <View style={CommonStyle.flex}>
      <FlashList
        data={data}
        estimatedItemSize={300}
        renderItem={({item}) => <CommentItem item={item} />}
      />
    </View>
  );
};

export default CarouselCommentList;
