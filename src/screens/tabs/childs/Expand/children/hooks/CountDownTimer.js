import React, { useState, useEffect } from 'react';
import { Text, View,StyleSheet } from 'react-native';

const CountdownTimer = ({ seconds }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // Chuyển đổi giây thành định dạng giờ:phút:giây
  const formatTime = () => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
      <Text style={styles.allStatusTextTitle}>{formatTime()}</Text>
  );
};

export default CountdownTimer;


const styles = StyleSheet.create({
    allStatusTextTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
})