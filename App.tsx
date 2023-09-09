/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

import {AppNavigators} from './js/navigators/AppNavigators';
import {WelcomeContextProvider} from './js/hooks/use-welcome';

function App(): JSX.Element {
  return (
    <WelcomeContextProvider>
      <NavigationContainer>
        <AppNavigators />
      </NavigationContainer>
    </WelcomeContextProvider>
  );
}

export default App;
