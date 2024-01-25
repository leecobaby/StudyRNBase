import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const BackgroundColor = '#F5FCFF';
export const GlobalStyles = {
  line: {
    height: 1,
    opacity: 0.5,
    backgroundColor: 'darkgray',
  },
  root_container: {
    flex: 1,
    backgroundColor: BackgroundColor,
  },
  backgroundColor: BackgroundColor,
  nav_bar_height_ios: 44,
  nav_bar_height_android: 50,
  window_width: width,
  window_height: height,
};
