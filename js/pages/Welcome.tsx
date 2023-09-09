import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import type {ScreenProps} from '@/js/navigators/type';
import {useWelcome} from '@/js/hooks/use-welcome';

type Props = ScreenProps<'WelcomePage'>;

export const WelcomePage: React.FC<Props> = ({navigation, route}) => {
  const {setIsShow} = useWelcome();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShow(false);
      // navigation.navigate('Main');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation, setIsShow]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    paddingTop: 30,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});
