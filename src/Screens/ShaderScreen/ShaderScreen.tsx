import React, {useEffect, useMemo, useState} from 'react'
import {StatusBar} from 'react-native'
import {
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated'
import {Canvas, Fill, Group, ImageShader, Shader, Skia, useImage} from '@shopify/react-native-skia'

import {Colors} from '@/Helpers'
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@/Helpers/Measurements'
import {random} from '@/Helpers/Utils'
import CommonStyle from '@/Theme/CommonStyle'
import Images from '@/Theme/Images'
import Transitions from '@/Transitions'

export default () => {
  const progress = useSharedValue(0)
  const [transition, setTransition] = useState(Transitions(random(0, 2)))
  const image1 = useImage(Images.image1)
  const image2 = useImage(Images.image2)

  const s = useMemo(() => Skia.RuntimeEffect.Make(transition), [transition])

  const stateUpdate = () => {
    setTransition(Transitions(random(0, 2)))
  }

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(
        1.5,
        {
          duration: 3000
        },
        (isFinished) => {
          if (isFinished) {
            runOnJS(stateUpdate)()
          }
        }
      ),
      -1,
      true
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const uniforms = useDerivedValue(() => ({
    progress: progress.value,
    resolution: [SCREEN_WIDTH, SCREEN_WIDTH]
  }))

  return (
    <>
      <StatusBar translucent backgroundColor={Colors.transparent} />
      <Canvas style={CommonStyle.flex}>
        <Group>
          <Fill>
            {s && (
              <Shader uniforms={uniforms} source={s}>
                <ImageShader
                  image={image1}
                  fit={'cover'}
                  width={SCREEN_WIDTH}
                  height={SCREEN_HEIGHT}
                  x={0}
                  y={0}
                />
                <ImageShader
                  image={image2}
                  fit={'cover'}
                  width={SCREEN_WIDTH}
                  height={SCREEN_HEIGHT}
                  x={0}
                  y={0}
                />
              </Shader>
            )}
          </Fill>
        </Group>
      </Canvas>
    </>
  )
}
