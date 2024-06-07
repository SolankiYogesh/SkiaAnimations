import React, {forwardRef, memo, useCallback, useImperativeHandle} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {height: SCREEN_HEIGHT, width: W_WIDTH} = Dimensions.get('window');

interface TopSheetProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export interface TopSheetRef {
  toggle: (isClose?: boolean) => void;
}
const TopSheet = forwardRef<TopSheetRef, TopSheetProps>((props, ref) => {
  const {children, onClose} = props;
  const translateY = useSharedValue(0);
  const isBackDrop = useSharedValue(0);
  const context = useSharedValue({y: 0});
  const viewHeight = useSharedValue(0);

  const {top} = useSafeAreaInsets();

  useImperativeHandle(ref, () => ({
    toggle: (isClose?: boolean) => {
      if (
        (isClose || translateY.value === viewHeight.value) &&
        isBackDrop.value
      ) {
        close();
      } else {
        open();
      }
    },
  }));

  const open = useCallback(() => {
    isBackDrop.value = withTiming(
      1,
      {
        duration: 50,
      },
      isFinished => {
        if (isFinished) {
          translateY.value = withTiming(viewHeight.value);
        }
      },
    );
  }, [isBackDrop, translateY, viewHeight.value]);

  const close = useCallback(() => {
    translateY.value = withTiming(0, {}, isFinished => {
      isBackDrop.value = 0;
      if (isFinished && onClose) {
        runOnJS(onClose)();
      }
    });
  }, [isBackDrop, onClose, translateY]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      const x = event.translationY + context.value.y;
      translateY.value = Math.min(x, viewHeight.value);
    })
    .onEnd(() => {
      if (translateY.value < viewHeight.value / 2) {
        runOnJS(close)();
      } else {
        runOnJS(open)();
      }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [0, viewHeight.value],
      [5, 20],
      Extrapolation.CLAMP,
    );

    return {
      borderRadius,
      transform: [{translateY: translateY.value}],
    };
  });

  const animatedBackdrop = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translateY.value, [0, viewHeight.value], [0, 1]),
      display: isBackDrop.value === 0 ? 'none' : 'flex',
    };
  }, []);

  return (
    <Animated.View style={[styles.backdropStyle, animatedBackdrop]}>
      <Animated.View
        pointerEvents={'box-only'}
        onTouchStart={close}
        style={[styles.backdrop, animatedBackdrop]}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View
          onLayout={e => {
            const h = e.nativeEvent.layout.height + top * 2;
            viewHeight.value = h;
          }}
          style={[
            styles.bottomSheetContainer,
            {
              bottom: SCREEN_HEIGHT,
              paddingTop: top,
            },
            rBottomSheetStyle,
          ]}>
          {children}
          <View style={styles.line} />
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
});

export default memo(TopSheet);

const styles = StyleSheet.create({
  bottomSheetContainer: {
    width: W_WIDTH,
    backgroundColor: 'white',
    borderRadius: 25,
    shadowColor: '',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    zIndex: 1,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
  backdropStyle: {
    width: W_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 'rgba(0,0,0,0.5)',
    opacity: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 999999,
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: W_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 'rgba(0,0,0,0.5)',
    opacity: 0,
    zIndex: -1,
  },
});
