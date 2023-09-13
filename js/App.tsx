import React from 'react';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';

import {store} from './store';
import {AppNavigators} from './navigators/AppNavigators';
import {WelcomeContextProvider} from './hooks/use-welcome';
import {NavigationContainer} from './navigators/NavigationContainer';

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
