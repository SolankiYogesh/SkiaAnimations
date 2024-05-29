import {View} from 'react-native';
import React from 'react';
import {CommonStyle} from '@/Helpers';
import {useTheme} from 'react-native-paper';
interface AppContainerProps {
  children: React.ReactNode;
}
const AppContainer = ({children}: AppContainerProps) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        CommonStyle.flex,
        {
          backgroundColor: colors.background,
        },
      ]}>
      {children}
    </View>
  );
};

export default AppContainer;
