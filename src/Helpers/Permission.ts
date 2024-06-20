import {Platform} from 'react-native'
import {PERMISSIONS, request} from 'react-native-permissions'

const getCameraPermission = () => {
  return new Promise<boolean>((resolve) => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
        macos: PERMISSIONS.IOS.CAMERA,
        native: PERMISSIONS.IOS.CAMERA,
        web: PERMISSIONS.IOS.CAMERA,
        windows: PERMISSIONS.IOS.CAMERA,
        default: PERMISSIONS.IOS.CAMERA
      })
    )
      .then((response) => {
        if (response === 'granted') {
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch(() => resolve(false))
  })
}

const getStoragePermission = () => {
  return new Promise<boolean>((resolve) => {
    const isAndroid13OrHigher = Number(Platform.Version) >= 33

    if (isAndroid13OrHigher || Platform.OS === 'ios') {
      resolve(true)
    } else {
      request(
        Platform.select({
          android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
          macos: PERMISSIONS.IOS.PHOTO_LIBRARY,
          native: PERMISSIONS.IOS.PHOTO_LIBRARY,
          web: PERMISSIONS.IOS.PHOTO_LIBRARY,
          windows: PERMISSIONS.IOS.PHOTO_LIBRARY,
          default: PERMISSIONS.IOS.PHOTO_LIBRARY
        })
      )
        .then((response) => {
          if (response === 'granted') {
            resolve(true)
          } else if (response === 'limited') {
            resolve(true)
          } else {
            resolve(false)
          }
        })
        .catch((e) => {
          return resolve(false)
        })
    }
  })
}

const Permission = {
  getCameraPermission,
  getStoragePermission
}

export default Permission
