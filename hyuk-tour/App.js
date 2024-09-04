import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Modal, Image, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Choose from './src/Choose_page.js';
import Penalty from './src/Penalty_page.js';
import Tournament from './src/Tournament_page.js';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Home = ({ navigation }) => {
  const [clickCount, setClickCount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleTitleClick = () => {
    setClickCount((prevCount) => prevCount + 1);
    if (clickCount + 1 === 5) {
      setIsModalVisible(true);
      setClickCount(0);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleTitleClick}>
        <Text style={styles.title}>2024 혁찬투어</Text>
      </TouchableOpacity>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Choose")}
          activeOpacity={0.8}>
          <Ionicons name="shuffle" size={40} color="#fff" />
          <Text style={styles.cardText}>뽑기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Penalty")}
          activeOpacity={0.8}>
          <Ionicons name="alert-circle" size={40} color="#fff" />
          <Text style={styles.cardText}>벌칙</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Tournament")}
          activeOpacity={0.8}>
          <Ionicons name="trophy" size={40} color="#fff" />
          <Text style={styles.cardText}>토너먼트</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>원대한 빡빡이</Text>
            <Image source={require('./assets/secret_image.png')} style={styles.modalImage} />
            <Button title="닫기" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Choose" component={Choose} />
        <Stack.Screen name="Penalty" component={Penalty} />
        <Stack.Screen name="Tournament" component={Tournament} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#444',
  },
  cardContainer: {
    width: '100%',
  },
  card: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  cardText: {
    fontSize: 25,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  }
});

export default App;

