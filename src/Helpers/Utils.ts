import RNFS from 'react-native-fs'
import _ from 'lodash'

import Constant from './Constant'

const getPercentage = (value: number, duration: number) => {
  const progress = (value / duration) * 100
  return Number.isNaN(progress) || !Number.isFinite(progress) ? 0 : progress
}

const getSlideTime = (percentage: number, duration: number) => {
  const progress = duration * (percentage / 100)
  return Number.isNaN(progress) || !Number.isFinite(progress) ? 0 : progress
}

const createFolder = (fileName: string) => {
  return new Promise<string | boolean>(async (resolve) => {
    try {
      const path = Constant.Dir
      RNFS.mkdir(path)
        .then(() => {
          resolve(path + '/' + fileName)
        })
        .catch(() => {
          resolve(false)
        })
    } catch (_) {
      resolve(false)
    }
  })
}

const random = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getFileNameFroUri = (uri: string) => {
  return uri.split('/').pop()
}

const sortUris = (uris: string[]) => {
  return _.orderBy(
    uris,
    (item) => {
      const timeStamp = getFileNameFroUri(item)?.replace('skia', '')
      return timeStamp
    },
    ['desc']
  )
}

export {createFolder, getPercentage, getSlideTime, random, sortUris}
