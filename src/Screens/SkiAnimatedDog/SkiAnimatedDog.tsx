import {StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {Blur, Canvas, Image, useImage} from '@shopify/react-native-skia';
import {Colors, CommonStyle} from '@/Helpers';

import CenterView from './CenterView';
import Images from '@/Theme/Images';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@/Helpers/Measurements';

export default () => {
  const background = useImage(Images.background);
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={Colors.transparent}
        barStyle={'light-content'}
      />

      <CenterView />
      <Canvas style={[StyleSheet.absoluteFill, CommonStyle.screen]}>
        <Image
          x={-5}
          y={-5}
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT + 10}
          image={background}
          fit="cover">
          <Blur blur={4} />
        </Image>
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
