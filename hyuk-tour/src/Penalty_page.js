import React, { useState, useRef } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, Animated, Easing } from 'react-native';

const slot1People = [
    { id: 1, name: '채희서', image: require('../assets/face/chae3.jpg'), probability: 0.1 },
    { id: 2, name: '이우진', image: require('../assets/face/woo3.jpg'), probability: 0.1 },
    { id: 3, name: '권혁찬', image: require('../assets/face/hyuk3.jpg'), probability: 0.1 },
    { id: 4, name: '이찬', image: require('../assets/face/chan3.jpg'), probability: 0.1 },
    { id: 5, name: '윤태민', image: require('../assets/face/yoon3.jpg'), probability: 0.1 },
    { id: 6, name: '김민재', image: require('../assets/face/min3.jpg'), probability: 0.1 },
    { id: 7, name: '노의성', image: require('../assets/face/noh3.jpg'), probability: 0.1 },
    { id: 8, name: '원대한', image: require('../assets/face/one3.jpg'), probability: 0.1 },
    { id: 9, name: '엄윤호', image: require('../assets/face/um3.jpg'), probability: 0.1 },
    { id: 10, name: '황상정', image: require('../assets/face/sano3.jpg'), probability: 0.1 },
  ];
  
  const slot2People = [
    { id: 11, name: '1잔', image: require('../assets/slotimg/slot2_1.jpg'), probability: 0.8 },
    { id: 12, name: '2잔', image: require('../assets/slotimg/slot2_2.jpg'), probability: 0.19 },
    { id: 13, name: '3잔', image: require('../assets/slotimg/slot2_3.jpg'), probability: 0.01 },
  ];
  
  const slot3People = [
    { id: 14, name: '패스', image: require('../assets/slotimg/slot3_1.jpg'), probability: 0.09 },
    { id: 15, name: '혼자', image: require('../assets/slotimg/slot3_2.jpg'), probability: 0.4 },
    { id: 16, name: '1명', image: require('../assets/slotimg/slot3_3.jpg'), probability: 0.5 },
    { id: 17, name: '3명', image: require('../assets/slotimg/slot3_4.jpg'), probability: 0.1 },
    { id: 18, name: '전부', image: require('../assets/slotimg/slot3_5.jpg'), probability: 0.01 },
  ];


const selectImageByProbability = (people) => {
  const random = Math.random();
  let cumulativeProbability = 0;

  for (let person of people) {
    cumulativeProbability += person.probability;
    if (random < cumulativeProbability) {
      return person;
    }
  }
  return people[people.length - 1]; 
};

const Penalty = () => {
  const [reels, setReels] = useState([slot1People[0], slot2People[0], slot3People[0]]);
  const [result, setResult] = useState([]);
  const animation = useRef(new Animated.Value(0)).current;

  const spinSlots = () => {
    animation.setValue(0);

    Animated.timing(animation, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      const newReels = [
        selectImageByProbability(slot1People),
        selectImageByProbability(slot2People),
        selectImageByProbability(slot3People),
      ];
      setReels(newReels);
      setResult(newReels.map(person => person.name));
    });
  };

  const spin = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.container}>
      <View style={styles.slotContainer}>
        {reels.map((person, index) => (
          <Animated.View key={index} style={{ transform: [{ rotate: spin }] }}>
            <Image source={person.image} style={styles.image} />
            <Text style={styles.name}>{person.name}</Text>
          </Animated.View>
        ))}
      </View>
      <TouchableOpacity onPress={spinSlots} style={styles.button}>
        <Text style={styles.buttonText}>Spin</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  slotContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  name: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Penalty;
