import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Screens} from '@/Helpers';
import {
  CarouselCommentList,
  InitialScreen,
  ReelsScreen,
  SimpleCommentList,
} from '@/Screens';

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerTitle: 'Explore',
          }}
          name={Screens.Initial}
          component={InitialScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Simple List',
          }}
          name={Screens.SimpleCommentList}
          component={SimpleCommentList}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Carousel List',
          }}
          name={Screens.CarouselCommentList}
          component={CarouselCommentList}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={Screens.ReelsScreen}
          component={ReelsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
