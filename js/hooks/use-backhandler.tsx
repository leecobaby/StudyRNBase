import {useEffect} from 'react';
import {BackHandler} from 'react-native';

export function useBackHandler(handler: () => boolean) {
  useEffect(() => {
    const backHander = BackHandler.addEventListener('hardwareBackPress', handler);

    return () => backHander.remove();
  }, [handler]);
}
