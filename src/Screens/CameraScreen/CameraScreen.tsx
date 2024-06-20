import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View
} from 'react-native'
import AnimateableText from 'react-native-animateable-text'
import RNFS from 'react-native-fs'
import {Button} from 'react-native-paper'
import {openSettings} from 'react-native-permissions'
import Animated, {useAnimatedProps, useSharedValue, withTiming} from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {
  Camera,
  CameraPosition,
  CameraProps,
  useCameraDevice,
  useCameraFormat
} from 'react-native-vision-camera'
import {useIsFocused, useNavigation} from '@react-navigation/native'

import TopCameraBackground from './TopCameraBackground'
import {Colors, Screens} from '@/Helpers'
import Constant from '@/Helpers/Constant'
import {WINDOW_WIDTH} from '@/Helpers/Measurements'
import Permission from '@/Helpers/Permission'
import {createFolder} from '@/Helpers/Utils'
import {useAppState} from '@/Hooks'
import CommonStyle from '@/Theme/CommonStyle'
import Images from '@/Theme/Images'

Animated.addWhitelistedNativeProps({
  zoom: true
})
const ReanimatedCamera = Animated.createAnimatedComponent(Camera)

export default () => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false)
  const [position, setPosition] = useState<CameraPosition>('front')
  const device = useCameraDevice(position)

  const [torch, setTorch] = useState(false)
  const isFocused = useIsFocused()
  const appState = useAppState()
  const isActive = isFocused && appState === 'active'
  const {top, bottom} = useSafeAreaInsets()
  const zoomOffset = useSharedValue(device?.neutralZoom ?? 1)
  const camera = useRef<Camera>(null)
  const [images, setImages] = useState<string[]>([])
  const format = useCameraFormat(device, [
    {
      videoResolution: Dimensions.get('window')
    },
    {
      fps: 60
    }
  ])

  const navigation = useNavigation<any>()

  const onPresCapture = useCallback(async () => {
    const isStorage = await Permission.getStoragePermission()
    if (isStorage) {
      if (camera.current) {
        camera.current
          .takePhoto({
            enableShutterSound: true
          })
          .then(async (resp) => {
            try {
              const filePath = await createFolder(`/${'skia' + Date.now()}.jpg`)
              if (typeof filePath === 'string') {
                await RNFS.copyFile(resp.path, filePath)
                setImages(['file://' + filePath, ...images])
              }
            } catch (error) {}
          })
      }
    } else {
      ToastAndroid.show('Storage Permission Required', ToastAndroid.SHORT)
      openSettings()
    }
  }, [images])

  useEffect(() => {
    const getCameraPermission = () => {
      Permission.getCameraPermission().then(async (response) => {
        setIsPermissionGranted(response)
        const isStorage = await Permission.getStoragePermission()
        if (isStorage) {
          const files = await RNFS.readDir(Constant.Dir)
          const photos = files.map((file) => 'file://' + file.path)
          setImages(photos)
        } else {
          ToastAndroid.show('Storage Permission Required', ToastAndroid.SHORT)
          openSettings()
        }
      })
    }

    getCameraPermission()
  }, [])

  const animatedTextProps = useAnimatedProps(() => {
    return {
      text: `${parseInt(String(zoomOffset.value), 10)}x`
    }
  })

  const animatedProps = useAnimatedProps<CameraProps>(
    () => ({zoom: zoomOffset.value}),
    [zoomOffset]
  )

  const renderControls = useMemo(() => {
    return (
      <View style={StyleSheet.absoluteFill}>
        <TopCameraBackground />
        <View
          style={[
            styles.topContainer,
            {
              paddingTop: top
            }
          ]}
        >
          <Pressable
            style={styles.touchIconStyle}
            onPress={() => setPosition((pos) => (pos === 'front' ? 'back' : 'front'))}
          >
            <Image style={styles.imageStyle} source={Images.reverse} />
          </Pressable>
          {device?.hasTorch && (
            <Pressable style={styles.touchIconStyle} onPress={() => setTorch((state) => !state)}>
              <Image style={styles.imageStyle} source={Images.touch} />
            </Pressable>
          )}

          <Pressable style={styles.touchIconStyle} onPress={navigation.goBack}>
            <Image style={styles.imageStyle} source={Images.close} />
          </Pressable>
        </View>
        <View
          style={[
            styles.bottomContainer,
            {
              paddingBottom: bottom
            }
          ]}
        >
          <Pressable
            onPress={() => {
              const maxZoom = device?.maxZoom ?? 3
              const zoomValue = zoomOffset.value === maxZoom ? 0 : zoomOffset.value
              zoomOffset.value = withTiming(Math.min(maxZoom, zoomValue + 1), {
                duration: 200
              })
            }}
            style={styles.zoomContainer}
          >
            <AnimateableText style={styles.textStyle} animatedProps={animatedTextProps} />
          </Pressable>
          <Pressable onPress={onPresCapture} style={styles.cameraIconContainer}>
            <View style={styles.cameraIcon} />
          </Pressable>
          {images.length > 0 ?(
            <Pressable
              onPress={() => navigation.navigate(Screens.GalleryScreen)}
              style={styles.photoContianer}
            >
              <Image
                source={{
                  uri: images[0]
                }}
                style={styles.photoImageStyle}
              />
            </Pressable>
          ): <View
      
          style={styles.photoContianer}
        >
          <View
          
            style={styles.photoImageStyle}
          />
        </View>}
        </View>
      </View>
    )
  }, [
    top,
    device?.hasTorch,
    device?.maxZoom,
    navigation,
    bottom,
    animatedTextProps,
    onPresCapture,
    images,
    zoomOffset
  ])

  return (
    <View style={CommonStyle.flex}>
      <StatusBar translucent barStyle={'light-content'} backgroundColor={Colors.transparent} />
      {!device ? (
        <View style={CommonStyle.centerFlex}>
          <Text>{'Camera not supported'}</Text>
        </View>
      ) : !isPermissionGranted ? (
        <View style={CommonStyle.centerFlex}>
          <Button onPress={() => openSettings()} mode={'outlined'} compact>
            {'Allow Permission'}
          </Button>
        </View>
      ) : (
        <ReanimatedCamera
          isActive={isActive}
          pixelFormat={'rgb'}
          photo
          photoHdr
          ref={camera}
          outputOrientation={'portrait'}
          photoQualityBalance={'speed'}
          style={CommonStyle.flex}
          device={device}
          format={format}
          torch={torch ? 'on' : 'off'}
          fps={format?.maxFps}
          animatedProps={animatedProps}
        />
      )}
      {device && renderControls}
    </View>
  )
}
const styles = StyleSheet.create({
  imageStyle: {
    width: '80%',
    height: '80%',
    tintColor: Colors.white
  },
  touchIconStyle: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: WINDOW_WIDTH - 40,
    alignSelf: 'center'
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 50,
    width: WINDOW_WIDTH - 40,
    alignSelf: 'center'
  },
  zoomContainer: {
    backgroundColor: Colors.darkShade352,
    borderWidth: 3,
    borderColor: Colors.lighte7d,
    width: 55,
    height: 55,
    borderRadius: 300,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cameraIcon: {
    backgroundColor: Colors.white,
    borderWidth: 3,
    borderColor: Colors.white,
    width: 65,
    height: 65,
    borderRadius: 300
  },
  cameraIconContainer: {
    borderWidth: 3,
    borderColor: Colors.white,
    padding: 5,
    borderRadius: 300,
    alignItems: 'center',
    justifyContent: 'center'
  },
  photoImageStyle: {
    width: '100%',
    height: '100%'
  },
  photoContianer: {
    width: 65,
    height: 65,
    borderRadius: 10,
    overflow: 'hidden'
  },
  textStyle: {
    color: Colors.white
  }
})
