import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';

const people = [
    { id: 1, name: '게이서', image: require('../assets/face/chae1.jpg') },
    { id: 2, name: '망고집사', image: require('../assets/face/woo1.jpg') },
    { id: 3, name: '수원풀발', image: require('../assets/face/hyuk1.jpg') },
    { id: 4, name: '아오찬쌤', image: require('../assets/face/chan1.jpg') },
    { id: 5, name: '전라디언', image: require('../assets/face/yoon1.jpg') },
    { id: 6, name: '그라가스', image: require('../assets/face/min1.jpg') },
    { id: 7, name: '파란저장소', image: require('../assets/face/noh1.jpg') },
    { id: 8, name: '원대원', image: require('../assets/face/one1.jpg') },
    { id: 9, name: '엄윤호', image: require('../assets/face/um1.jpg') },
    { id: 10, name: '차박이', image: require('../assets/face/sano1.jpg') },
];

export default function Choose() {

    const [selectedPeople, setSelectedPeople] = useState([]);
    const [randomPeople, setRandomPeople] = useState([]);

    const toggleSelection = (id) => {
        setSelectedPeople(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(personId => personId !== id)
                : [...prevSelected, id]
        );
    };

    const pickRandomPeople = () => {
        if (selectedPeople.length < 2) {
            setRandomPeople([]);
            return;
        }
        const shuffled = selectedPeople.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 2);
        setRandomPeople(selected);
    };

    return (
        <View style={styles.container}>
            <View style={styles.resultsContainer}>
                {randomPeople.length > 0 ? (
                    randomPeople.map(personId => {
                        const person = people.find(p => p.id === personId);
                        return (
                            <View key={personId} style={styles.resultPersonContainer}>
                                <Image source={person.image} style={styles.resultPersonImage} />
                                <Text style={[{fontSize:15}]}>{person.name}</Text>
                            </View>
                        );
                    })
                ) : (
                    <Text style={styles.noResultsText}>No results yet</Text>
                )}
            </View>
            <View style={styles.peopleContainer}>
                {people.map(person => (
                    <TouchableOpacity
                        key={person.id}
                        style={[
                            styles.personContainer,
                            selectedPeople.includes(person.id) && styles.selectedPerson
                        ]}
                        onPress={() => toggleSelection(person.id)}
                    >
                        <Image source={person.image} style={styles.personImage} />
                        <Text style={styles.personName}>{person.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity onPress={pickRandomPeople} style={styles.button}>
                <Text style={styles.buttonText}>Pick</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    resultsContainer: {
        alignItems: 'center',
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center'

    },
    resultPersonContainer: {
        alignItems: 'center',
        marginHorizontal: 10,
   
    },
    resultPersonImage: {
        width: 100,
        height: 100,
        marginBottom: 5,
        borderRadius: 5
    },
    noResultsText: {
        fontSize: 18,
        color: 'gray',
     
    },
    peopleContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },
    personContainer: {
        alignItems: 'center',
        margin: 10,
        borderColor: '#ddd',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
    },
    selectedPerson: {
        borderColor: 'blue',
    },
    personImage: {
        width: 60,
        height: 60,
        marginBottom: 5,
    },
    personName: {
        fontSize: 12,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: 300,

    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});