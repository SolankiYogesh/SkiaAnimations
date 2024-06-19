/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import BottomBar from '../Components/BottomBar'
import Screens from '../Helpers/Screens'
import {
  AnimatedListUserScreen,
  CarouselCommentList,
  ReelsScreen,
  SimpleCommentList
} from '@/Screens'

const Tab = createBottomTabNavigator()
export default () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
      tabBar={(props) => <BottomBar {...props} />}
    >
      <Tab.Screen name={Screens.SimpleCommentList} component={SimpleCommentList} />
      <Tab.Screen name={Screens.CarouselCommentList} component={CarouselCommentList} />
      <Tab.Screen name={Screens.ReelsScreen} component={ReelsScreen} />
      <Tab.Screen name={Screens.AnimatedListUserScreen} component={AnimatedListUserScreen} />
    </Tab.Navigator>
  )
}
