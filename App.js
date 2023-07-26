import React, {useEffect} from 'react';
import {StyleSheet, StatusBar} from 'react-native';

import {useMMKVObject} from 'react-native-mmkv';
import {dark, light} from './palette';
import Switch from './Switch';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const App = () => {
  const [theme, setTheme] = useMMKVObject('theme');

  useEffect(() => {
    if (theme) {
      setTheme(theme?.key == 'dark' ? dark : light);
    } else {
      setTheme(light);
    }
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['top']}
        style={[styles.containerMain, {backgroundColor: theme?.back}]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <StatusBar
          backgroundColor={theme?.key == 'dark' ? '#000' : '#fff'}
          barStyle={theme?.key == 'dark' ? 'light-content' : 'dark-content'}
        />
        <GestureHandlerRootView>
          <Switch onChange={v => setTheme(v ? dark : light)} />
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
