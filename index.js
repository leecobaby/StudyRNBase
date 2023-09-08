/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {Welcome} from './js/pages/basic/s4/welcome';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Welcome);
