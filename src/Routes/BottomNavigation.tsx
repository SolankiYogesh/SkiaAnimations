/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'

import Screens from '../Helpers/Screens'
import {BottomBar} from '@/Components'
import {AnimatedListUserScreen, ReelsScreen, SimpleCommentList} from '@/Screens'

const Tab = createMaterialTopTabNavigator()
export default () => {
  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false
      }}
      tabBar={(props) => <BottomBar {...props} />}
    >
      <Tab.Screen name={Screens.SimpleCommentList} component={SimpleCommentList} />
      <Tab.Screen name={Screens.ReelsScreen} component={ReelsScreen} />
      <Tab.Screen name={Screens.AnimatedListUserScreen} component={AnimatedListUserScreen} />
    </Tab.Navigator>
  )
}
