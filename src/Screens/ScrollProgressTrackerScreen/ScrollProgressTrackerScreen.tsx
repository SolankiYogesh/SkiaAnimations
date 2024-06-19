import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
  useSharedValue,
} from 'react-native-reanimated';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Section from './Components/Section';
import ScrollProgressView from './Components/ScrollProgressView';

export default () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollHandler = useScrollViewOffset(scrollRef);
  const height = useSharedValue(0);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={styles.container.backgroundColor}
      />
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        onLayout={event => {
          height.value = event.nativeEvent.layout.height;
        }}
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}>
        <Header />
        <View style={styles.container}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </Animated.ScrollView>
      <ScrollProgressView y={scrollHandler} height={height} />
    </View>
  );
};

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
  container: {
    backgroundColor: Colors.lighter,
    flex: 1,
  },
});
