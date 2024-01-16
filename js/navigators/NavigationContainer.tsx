import React, {useEffect, useState} from 'react';
import {DefaultTheme, NavigationContainer as _NavigationContainer} from '@react-navigation/native';

import {useAppDispatch, useAppSelector} from '@/hooks/store';
import {fetchTheme} from '@/store/themeSlice';

export function NavigationContainer({children}: {children: React.ReactNode}): JSX.Element {
  const dispatch = useAppDispatch();
  const color = useAppSelector(state => state.theme.theme);
  const [theme, setTheme] = useState(DefaultTheme);

  useEffect(() => {
    dispatch(fetchTheme());
  }, []);

  useEffect(() => {
    const customTheme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: color,
      },
    };
    setTheme(customTheme);
  }, [color]);

  return <_NavigationContainer theme={theme}>{children}</_NavigationContainer>;
}
