import React, {useMemo} from 'react';
import {Dimensions, Image, Platform, StyleSheet, Text, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import {GlobalStyles} from '@/GlobalStyles';
import {LeftBackButton} from '@/components/LeftBackButton';
import {useBackHandler} from '@/hooks/use-backhandler';
import {ShareButton} from '@/components/ShareButton';

const window = Dimensions.get('window');
export const FLAG_ABOUT = {flag_about: 'about', flag_about_me: 'about_me'};
const AVATAR_SIZE = 90;
const PARALLAX_HEADER_HEIGHT = 270;
const TOP = Platform.OS === 'ios' ? 20 : 0;
const STICKY_HEADER_HEIGHT =
  Platform.OS === 'ios' ? GlobalStyles.nav_bar_height_ios + TOP : GlobalStyles.nav_bar_height_android;

interface Props {
  flagAbout: string;
  params: any;
  children?: React.ReactNode;
}

export function AboutBase({params, flagAbout, children}: Props) {
  const navigation = useNavigation();
  const {colors} = useTheme();
  useBackHandler(onBackPress);

  function onBackPress() {
    navigation.goBack();
    return true;
  }

  function onShare() {
    // TODO
  }

  // ... 其他函数和渲染逻辑
  function getParallaxRenderConfig() {
    let config = {} as {[key: string]: any};
    let avatar = typeof params.avatar === 'string' ? {uri: params.avatar} : params.avatar;
    config.renderBackground = () => (
      <View key="background">
        <Image source={{uri: params.backgroundImg, width: window.width, height: PARALLAX_HEADER_HEIGHT}} />
        <View style={styles.mask} />
      </View>
    );
    config.renderForeground = () => (
      <View key="parallax-header" style={styles.parallaxHeader}>
        <Image style={styles.avatar} source={avatar} />
        <Text style={styles.sectionSpeakerText}>{params.name}</Text>
        <Text style={styles.sectionTitleText}>{params.description}</Text>
      </View>
    );
    config.renderStickyHeader = () => (
      <View key="sticky-header" style={styles.stickySection}>
        <Text style={styles.stickySectionText}>{params.name}</Text>
      </View>
    );
    config.renderFixedHeader = () => (
      <View key="fixed-header" style={styles.fixedSection}>
        <LeftBackButton onPress={onBackPress} />
        <ShareButton onPress={onShare} />
      </View>
    );
    return config;
  }

  const parallaxRenderConfig = useMemo(getParallaxRenderConfig, [params]);

  return (
    <>
      <ParallaxScrollView
        backgroundColor={colors.background}
        contentBackgroundColor={GlobalStyles.backgroundColor}
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        backgroundScrollSpeed={10}
        {...parallaxRenderConfig}>
        {children}
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    top: 0,
    width: window.width,
    backgroundColor: 'rgba(0,0,0,.4)',
    height: PARALLAX_HEADER_HEIGHT,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT,
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    alignItems: 'center',
    paddingTop: TOP,
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10,
  },
  fixedSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: TOP,
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20,
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100,
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2,
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5,
    marginBottom: 10,
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
    marginLeft: 10,
  },
});
