import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';

import {
  Blur,
  Canvas,
  Circle,
  ImageShader,
  Skia,
  processTransform3d,
  toMatrix3,
  useImage,
  vec,
} from '@shopify/react-native-skia';
import {
  interpolate,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Images from '@/Theme/Images';

const {width, height} = Dimensions.get('window');

export default () => {
  const rotate = useSharedValue(0);
  const image = useImage(Images.dog);

  useEffect(() => {
    rotate.value = withRepeat(withTiming(1, {duration: 5000}), -1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const matrix = useDerivedValue(() => {
    const mat3 = toMatrix3(
      processTransform3d([
        {
          scale: rotate.value,
        },
      ]),
    );
    return Skia.Matrix(mat3);
  }, []);

  const reverseAnimated = useDerivedValue(() => {
    return 1 - rotate.value;
  }, []);

  const matrix1 = useDerivedValue(() => {
    const mat3 = toMatrix3(
      processTransform3d([
        {
          scale: reverseAnimated.value,
        },
      ]),
    );
    return Skia.Matrix(mat3);
  }, []);

  const blur = useDerivedValue(() => {
    return interpolate(rotate.value, [0, 1], [8, 0]);
  });

  const blur1 = useDerivedValue(() => {
    return interpolate(reverseAnimated.value, [0, 1], [8, 0]);
  });

  return (
    <View style={[styles.container]}>
      <Canvas style={styles.canvasContainer}>
        <Circle
          matrix={matrix}
          origin={vec(width / 2, height / 3)}
          cx={width / 2}
          cy={height / 3}
          r={128}>
          <ImageShader
            image={image}
            fit="contain"
            tx={'clamp'}
            ty={'clamp'}
            rect={{x: 0, y: 0, width: width, height: height}}
          />
          <Blur blur={blur} />
        </Circle>
        <Circle
          matrix={matrix1}
          origin={vec(width / 2, height / 1.5)}
          cx={width / 2}
          cy={height / 1.5}
          r={128}>
          <ImageShader
            image={image}
            fit="contain"
            tx={'clamp'}
            ty={'clamp'}
            rect={{x: 0, y: 0, width: width, height: height}}
          />
          <Blur blur={blur1} />
        </Circle>
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    flex: 1,
    overflow: 'hidden',
  },
  canvasContainer: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
});
