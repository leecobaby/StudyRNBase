import React, {useState} from 'react';
import WebView, {WebViewNavigation} from 'react-native-webview';
import {useTheme} from '@react-navigation/native';

import {ScreenProps} from '@/navigators/type';
import {useBackHandler} from '@/hooks/use-backhandler';
import {StyleSheet, View} from 'react-native';
import {NavigationBar} from '@/components/NavigationBar';
import {LeftBackButton} from '@/components/LeftBackButton';

type Props = ScreenProps<'WebViewPage'>;
let webViewRef: WebView | null = null;
export function WebViewPage({navigation, route}: Props) {
  const {colors} = useTheme();
  const {title} = route.params;
  const [url, setUrl] = useState(route.params.url);
  const [canGoBack, setCanGoBack] = useState(false);

  useBackHandler(onBack);
  function onBack() {
    if (canGoBack && webViewRef) {
      webViewRef.goBack();
      return true; // prevent default behavior (exit app)
    } else {
      navigation.goBack();
      return true;
    }
  }

  function onNavigationStateChange(nav: WebViewNavigation) {
    setCanGoBack(nav.canGoBack);
    setUrl(nav.url || '');
  }
  return (
    <View style={styles.container}>
      <NavigationBar
        title={title}
        style={{backgroundColor: colors.primary}}
        leftButton={<LeftBackButton onPress={() => onBack()} />}
      />
      <WebView
        source={{uri: url}}
        style={{flex: 1}}
        ref={ref => (webViewRef = ref)}
        startInLoadingState={true}
        onNavigationStateChange={onNavigationStateChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
