import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle, Text } from 'react-native-svg';

const CircularProgressBar = forwardRef((props, ref) => {
  const [countdown, setCountdown] = useState(100);

  let interval;
  useEffect(() =>{
      interval = setInterval(() => {
        if(countdown === 0){
            props.dispatch({type:"resendOTPTime", payload: true});
            clearInterval(interval);
        }
        if (countdown > 0) {
          setCountdown(countdown - 1);
        }
      }, 1000);
    return () => {
      clearInterval(interval);
    };

  }, [countdown]);

  const handlePauseResume = () => {
    clearInterval(interval)
    props.dispatch({type:"resendOTPTime", payload: true});
  };

  const handleRestart = () => {
    setCountdown(100);
  };

  useImperativeHandle(ref, () => ({
    handlePauseResume,
    handleRestart
  }));

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - countdown) / 100) * circumference;

  const textX = 60;
  const textY = 65;

  return (
    <View style={styles.container}>
      <Svg height="120" width="120">
        <Circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#afafaf"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={`${circumference}, ${circumference}`}
        />
        <Circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#0078d4"
          strokeWidth="5"
          fill="transparent"
          strokeDasharray={`${circumference}, ${circumference}`}
          strokeDashoffset={progress}
        />
        <Text x={textX} y={textY} textAnchor="middle" fontSize="18" fontWeight="bold" fill="black">
          {countdown}
        </Text>
      </Svg>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default CircularProgressBar;
