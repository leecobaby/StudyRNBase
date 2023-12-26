import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import FontAwesom from 'react-native-vector-icons/FontAwesome';

import {ScreenProps} from '@/navigators/type';
import {useAppDispatch} from '@/hooks/store';
import {NavigationBar} from '@/components/NavigationBar';
import {LeftBackButton} from '@/components/LeftBackButton';
import {ShareButton} from '@/components/ShareButton';
import WebView, {WebViewNavigation} from 'react-native-webview';
import {useBackHandler} from '@/hooks/use-backhandler';

type Props = ScreenProps<'Detail'>;

const Domain = 'https://github.com';
let webViewRef: WebView | null = null;
export const Detail: React.FC<Props> = ({navigation, route}) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [canGoBack, setCanGoBack] = useState(false);
  useBackHandler(onBack);

  useEffect(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();
      console.log('initialUrl', initialUrl);
    };

    getUrlAsync();
  }, []);

  useEffect(() => {
    const {item} = route.params;
    setTitle(item.full_name || item.fullName);
    setUrl(item.html_url || Domain + item.url);
  }, [route]);

  function onBack() {
    if (canGoBack && webViewRef) {
      webViewRef.goBack();
      return true; // prevent default behavior (exit app)
    } else {
      navigation.goBack();
      return true;
    }
  }

  function RightButton() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => {}}>
          <FontAwesom name="star-o" size={20} style={{color: 'white', marginRight: 10}} />
        </TouchableOpacity>
        <ShareButton />
      </View>
    );
  }

  function onNavigationStateChange(nav: WebViewNavigation) {
    setCanGoBack(nav.canGoBack);
    setUrl(nav.url || '');
  }

  const titleLayoutStyle = title.length > 20 ? {paddingRight: 30} : null;
  return (
    <View style={styles.container}>
      <NavigationBar
        title={title}
        style={{backgroundColor: '#678'}}
        titleLayoutStyle={titleLayoutStyle}
        leftButton={<LeftBackButton onPress={() => onBack()} />}
        rightButton={<RightButton />}
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
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
