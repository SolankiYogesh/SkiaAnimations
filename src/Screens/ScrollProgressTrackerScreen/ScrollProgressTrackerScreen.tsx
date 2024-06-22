import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions
} from 'react-native/Libraries/NewAppScreen'
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

import ScrollProgressView from './Components/ScrollProgressView'
import Section from './Components/Section'

export default () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollHandler = useScrollViewOffset(scrollRef)
  const height = useSharedValue(0)
  const opacity = useSharedValue(0)

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        onTouchStart={() => {
          opacity.value = withTiming(1)
        }}
        onTouchEnd={() => {
          opacity.value = withTiming(0)
        }}
        onLayout={(event) => {
          height.value = event.nativeEvent.layout.height
        }}
        style={styles.container}
      >
        <Header />
        <View style={styles.container}>
          <Section title={'Step One'}>
            {'Edit '}
            <Text style={styles.highlight}>{'App.tsx'}</Text> {'to change this'}
            {'screen and then come back to see your edits.'}
          </Section>
          <Section title={'See Your Changes'}>
            <ReloadInstructions />
          </Section>
          <Section title={'Debug'}>
            <DebugInstructions />
          </Section>
          <Section title={'Learn More'}>{'Read the docs to discover what to do next:'}</Section>
          <LearnMoreLinks />
        </View>
      </Animated.ScrollView>
      <ScrollProgressView opacity={opacity} y={scrollHandler} height={height} />
    </View>
  )
}

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700'
  },
  container: {
    backgroundColor: Colors.lighter,
    flex: 1
  }
})
