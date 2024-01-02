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
import {isGitHubRepo} from '@/utils';
import {getDispatchAction} from '@/utils';
import {onFavorite} from '@/dao/FavoriteDao';
import {Flag} from '@/types/enum';

type Props = ScreenProps<'Detail'>;

const Domain = 'https://github.com';
let webViewRef: WebView | null = null;
export const Detail: React.FC<Props> = ({navigation, route}) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [canGoBack, setCanGoBack] = useState(false);
  const {item, itemKey, index, flag} = route.params;
  const [isFavorite, setIsFavorite] = useState(item.isFavorite);
  useBackHandler(onBack);

  useEffect(() => {
    const name = isGitHubRepo(item) ? item.full_name : item.fullName;
    const url = isGitHubRepo(item) ? item.html_url : Domain + item.url;
    setTitle(name);
    setUrl(url);
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

  function onPressFavorite() {
    const dispatchAction = getDispatchAction(flag, itemKey);
    dispatch(dispatchAction({item: item as any, index, key: itemKey}));

    const newIsFavorite = !isFavorite;
    setIsFavorite(newIsFavorite);
    onFavorite(flag, item, newIsFavorite);
  }

  function RightButton() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={onPressFavorite}>
          <FontAwesom name={isFavorite ? 'star' : 'star-o'} size={20} style={{color: 'white', marginRight: 10}} />
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
