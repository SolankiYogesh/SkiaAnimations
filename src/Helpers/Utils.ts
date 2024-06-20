import RNFS from 'react-native-fs'

import Constant from './Constant'

const randomColor = () => {
  const colors = [
    ['#009FFF', '#A5888D'],
    ['#a8ff78', '#78ffd6'],
    ['#12c2e9', '#c471ed', '#f64f59'],
    ['#A196E9', '#0D78E3']
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}
function hexadecimal(color: string) {
  return (percentage: number) => {
    const decimal = `0${Math.round(255 * (percentage / 100)).toString(16)}`.slice(-2).toUpperCase()
    return color + decimal
  }
}

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
        .catch((error) => {
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

export {createFolder, getPercentage, getSlideTime, hexadecimal, random, randomColor}
