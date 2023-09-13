import React from 'react';
import {DarkTheme, DefaultTheme, NavigationContainer as _NavigationContainer} from '@react-navigation/native';

import {selectDark} from '@/store/themeSlice';
import {useAppSelector} from '@/hooks/store';

export function NavigationContainer({children}: {children: React.ReactNode}): JSX.Element {
  const dark = useAppSelector(selectDark);

  return <_NavigationContainer theme={dark ? DarkTheme : DefaultTheme}>{children}</_NavigationContainer>;
}
