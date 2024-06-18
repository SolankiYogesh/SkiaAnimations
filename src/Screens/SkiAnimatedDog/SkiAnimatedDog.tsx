import {StatusBar, StyleSheet, View, useWindowDimensions} from 'react-native';
import React from 'react';
import {Blur, Canvas, Image, useImage} from '@shopify/react-native-skia';
import {CommonStyle} from '@/Helpers';

import CenterView from './CenterView';
import Images from '@/Theme/Images';

const SkiAnimatedDog = () => {
  const {height, width} = useWindowDimensions();
  const background = useImage(Images.background);
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />

      <CenterView />
      <Canvas style={[StyleSheet.absoluteFill, CommonStyle.flex]}>
        <Image
          x={-5}
          y={-5}
          width={width + 10}
          height={height + 10}
          image={background}
          fit="cover">
          <Blur blur={4} />
        </Image>
      </Canvas>
    </View>
  );
};

export default SkiAnimatedDog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
