/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';

import {AppNavigators} from './navigators/AppNavigators';
import {WelcomeContextProvider} from './hooks/use-welcome';
import {store} from './store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <WelcomeContextProvider>
        <NavigationContainer>
          <AppNavigators />
        </NavigationContainer>
      </WelcomeContextProvider>
    </Provider>
  );
}

export default App;
