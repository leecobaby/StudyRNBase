import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import {useAuth} from '@/hooks/use-auth';
import {ScreenProps} from '@/navigators/type';

type Props = ScreenProps<'Login'>;

export const Login: React.FC<Props> = props => {
  const {navigation} = props;
  const {setIsLogin} = useAuth();

  return (
    <View style={{flex: 1, backgroundColor: 'lightgray', paddingTop: 30}}>
      <Text style={styles.text}>Login</Text>
      <Button
        title="登录"
        onPress={() => {
          setIsLogin(true);
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: 'white',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
  },
});
