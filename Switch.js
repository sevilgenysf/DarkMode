import React, {useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useMMKVObject} from 'react-native-mmkv';

const {width: w, height: h} = Dimensions.get('window');
const W = (v = 100) => Number(((w * v) / 100)?.toFixed(2));

const WIDTH = W(12);
const HEIGHT = W(6);

const Switch = ({onChange = () => {}}) => {
  const [theme] = useMMKVObject('theme');
  const [value, setValue] = useState(theme?.key == 'dark' ? true : false);
  const translateX = useSharedValue(theme?.key == 'dark' ? WIDTH / 2 + 2 : 2);
  const backgroundColor = useSharedValue(
    theme?.key == 'dark' ? theme?.green : '#aaa',
  );

  const animation = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const animationContainer = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));

  const changeValue = () => {
    translateX.value = withSpring(value ? 2 : WIDTH / 2 + 2, {
      stiffness: 140,
      mass: 0.7,
    });
    console.log(translateX.value);
    backgroundColor.value = withTiming(value ? '#aaa' : theme?.green, {
      duration: 500,
    });
    onChange(!value);
    setValue(prev => !prev);
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={changeValue}>
      <Animated.View style={[styles.container, animationContainer]}>
        <Animated.View style={[styles.circle, animation]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    borderRadius: 999,
    justifyContent: 'center',
  },
  circle: {
    width: WIDTH / 2 - 4,
    height: WIDTH / 2 - 4,
    borderRadius: 999,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
});

export default Switch;
