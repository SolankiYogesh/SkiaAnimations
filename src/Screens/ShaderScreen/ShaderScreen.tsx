import React from 'react'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import {useDerivedValue, useSharedValue, withTiming} from 'react-native-reanimated'
import {Canvas, Fill, Group, ImageShader, Shader, Skia, useImage} from '@shopify/react-native-skia'

import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@/Helpers/Measurements'
import CommonStyle from '@/Theme/CommonStyle'

const source = Skia.RuntimeEffect.Make(`

      uniform shader image1;
  uniform shader image2;

  uniform float progress;
  uniform float2 resolution;
  
  half4 getFromColor(float2 uv) {
    return image1.eval(uv * resolution);
  }
  
  half4 getToColor(float2 uv) {
    return image2.eval(uv * resolution);
  }
  
vec4 transition(vec2 UV) {
	float Radius = 1.0;

	float T = progress;

	UV -= vec2( 0.5, 0.5 );

	float Dist = length(UV);

	if ( Dist < Radius )
	{
		float Percent = (Radius - Dist) / Radius;
		float A = ( T <= 0.5 ) ? mix( 0.0, 1.0, T/0.5 ) : mix( 1.0, 0.0, (T-0.5)/0.5 );
		float Theta = Percent * Percent * A * 8.0 * 3.14159;
		float S = sin( Theta );
		float C = cos( Theta );
		UV = vec2( dot(UV, vec2(C, -S)), dot(UV, vec2(S, C)) );
	}
	UV += vec2( 0.5, 0.5 );

	vec4 C0 = getFromColor(UV);
	vec4 C1 = getToColor(UV);

	return mix( C0, C1, T );
}

  half4 main(vec2 xy) {
    vec2 uv = xy / resolution;
    return transition(uv);
  }


`)

const IMAGE_WIDTH = SCREEN_WIDTH * 0.8
const IMAGE_HEIGHT = 250

export default () => {
  const progress = useSharedValue(0)
  const isAnimating = useSharedValue(false)
  const image1 = useImage(
    'https://plus.unsplash.com/premium_photo-1676654935906-570ac2f94180?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
  )
  const image2 = useImage(
    'https://images.unsplash.com/photo-1687482976391-8de6c1122c7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
  )

  const gesture = Gesture.Tap().onStart(() => {
    if (isAnimating.value) {
      return
    }
    const value = progress.value === 0 ? 1 : 0
    isAnimating.value = true
    progress.value = withTiming(
      value,
      {
        duration: 2000
      },
      (isFinished) => {
        if (isFinished) {
          isAnimating.value = false
        }
      }
    )
  })

  const uniforms = useDerivedValue(() => ({
    progress: progress.value,
    resolution: [SCREEN_WIDTH, SCREEN_WIDTH]
  }))

  return (
    <GestureDetector gesture={gesture}>
      <Canvas style={CommonStyle.flex}>
        <Group>
          <Fill>
            {source && (
              <Shader uniforms={uniforms} source={source}>
                <ImageShader
                  image={image1}
                  fit={'cover'}
                  width={IMAGE_WIDTH}
                  height={IMAGE_HEIGHT}
                  x={(SCREEN_WIDTH - IMAGE_WIDTH) / 2}
                  y={(SCREEN_HEIGHT - IMAGE_HEIGHT) / 2}
                />
                <ImageShader
                  image={image2}
                  fit={'cover'}
                  width={IMAGE_WIDTH}
                  height={IMAGE_HEIGHT}
                  x={(SCREEN_WIDTH - IMAGE_WIDTH) / 2}
                  y={(SCREEN_HEIGHT - IMAGE_HEIGHT) / 2}
                />
              </Shader>
            )}
          </Fill>
        </Group>
      </Canvas>
    </GestureDetector>
  )
}
