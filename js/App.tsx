import React from 'react';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import {ToastProvider} from 'react-native-toast-notifications';

import {store} from './store';
import {AppNavigators} from './navigators/AppNavigators';
import {WelcomeContextProvider} from './hooks/use-welcome';
import {NavigationContainer} from './navigators/NavigationContainer';

// clean storage
// import AsyncStorage from '@react-native-async-storage/async-storage';
// AsyncStorage.clear();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <WelcomeContextProvider>
        <NavigationContainer>
          <ToastProvider>
            <AppNavigators />
          </ToastProvider>
        </NavigationContainer>
      </WelcomeContextProvider>
    </Provider>
  );
}

export default App;
