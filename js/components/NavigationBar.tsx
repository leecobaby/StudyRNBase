import {GlobalStyles} from '@/GlobalStyles';
import React from 'react';
import {Platform, StatusBar, StyleSheet, Text, View, ViewProps} from 'react-native';

const STATUS_BAR_HEIGHT = 20;

type StatusBarProps = {
  barStyle?: 'light-content' | 'default';
  hidden?: boolean;
  backgroundColor?: string;
};

interface Props {
  children?: React.ReactNode;
  style?: ViewProps['style'];
  title?: string;
  titleView?: React.ReactNode;
  titleLayoutStyle?: ViewProps['style'];
  hide?: boolean;
  statusBar?: StatusBarProps;
  rightButton?: React.ReactNode;
  leftButton?: React.ReactNode;
}

export const NavigationBar: React.FC<Props> = ({
  statusBar = {
    barStyle: 'default',
    hidden: false,
    backgroundColor: 'white',
  },
  style,
  title = '',
  titleView,
  titleLayoutStyle,
  hide = false,
  rightButton,
  leftButton,
}) => {
  function getStatusBarEl() {
    return !statusBar.hidden ? (
      <View style={styles.statusBar}>
        <StatusBar {...statusBar} />
      </View>
    ) : null;
  }

  function getTitleViewEl() {
    return titleView ? (
      titleView
    ) : (
      <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>
        {title}
      </Text>
    );
  }

  function getButtonEl(el?: React.ReactNode) {
    return <View style={styles.navBarButton}>{el || null}</View>;
  }

  function getContentEl() {
    return hide ? null : (
      <View style={styles.navBar}>
        {getButtonEl(leftButton)}
        <View style={[styles.navBarTitleContainer, titleLayoutStyle]}>{getTitleViewEl()}</View>
        {getButtonEl(rightButton)}
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      {getStatusBarEl()}
      {getContentEl()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
  },
  navBarButton: {
    alignItems: 'center',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Platform.OS === 'ios' ? GlobalStyles.nav_bar_height_ios : GlobalStyles.nav_bar_height_android,
  },
  navBarTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0,
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
  statusBar: {
    height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
  },
});
