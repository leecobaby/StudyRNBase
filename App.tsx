/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

import {AuthContextProvider} from './hooks/use-auth';
import {AppNavigators, NativeStackNavigators} from './navigators/AppNavigators';

function App(): JSX.Element {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        {/* <AppNavigators /> */}
        <NativeStackNavigators />
      </NavigationContainer>
    </AuthContextProvider>
  );
}

export default App;
