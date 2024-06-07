import {Button, View} from 'react-native';
import React, {useRef} from 'react';
import AppContainer from '@/Components/AppContianer';
import TopSheet, {TopSheetRef} from './Components/TopSheet';
import CommentItem from '@/Components/CommentItem';
import {randomData} from '@/data/RandomData';
import {CommonStyle} from '@/Helpers';
const parsedData = {
  id: +randomData[0][0],
  name: String(randomData[0][1]),
  email: String(randomData[0][3]),
  body:
    randomData[0][2] +
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut alias tenetur dolorum vero blanditiis eveniet nisi, mollitia ipsa repudiandae! Tempore facilis quaerat',
  image: 'https://picsum.photos/200/300',
};
const TopSheetWithGuard = () => {
  const sheetRef = useRef<TopSheetRef>(null);
  return (
    <AppContainer>
      <TopSheet ref={sheetRef}>
        <CommentItem item={parsedData} />
      </TopSheet>

      <View style={CommonStyle.centerFlex}>
        <Button title="Open" onPress={() => sheetRef.current?.toggle()} />
      </View>
    </AppContainer>
  );
};

export default TopSheetWithGuard;
