import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Button, StyleSheet, FlatList } from 'react-native';

const people = [
    { id: 1, name: '게이서', image: require('../assets/face/chae2.jpg') },
    { id: 2, name: '망고집사', image: require('../assets/face/woo2.jpg') },
    { id: 3, name: '수원풀발', image: require('../assets/face/hyuk2.jpg') },
    { id: 4, name: '아오찬쌤', image: require('../assets/face/chan2.jpg') },
    { id: 5, name: '전라디언', image: require('../assets/face/yoon2.jpg') },
    { id: 6, name: '그라가스', image: require('../assets/face/min2.jpg') },
    { id: 7, name: '파란저장소', image: require('../assets/face/noh2.jpg') },
    { id: 8, name: '원대원', image: require('../assets/face/one2.jpg') },
    { id: 9, name: '엄윤호', image: require('../assets/face/um2.jpg') },
    { id: 10, name: '차박이', image: require('../assets/face/sano2.jpg') },
];

const Tournament = () => {
    const [selectedPeople, setSelectedPeople] = useState([]);
    const [stage, setStage] = useState('selection');
    const [currentRound, setCurrentRound] = useState([]);
    const [nextRound, setNextRound] = useState([]);
    const [round, setRound] = useState(1);
    const [transitioning, setTransitioning] = useState(false);

    const togglePersonSelection = (id) => {
        if (selectedPeople.some(person => person.id === id)) {
            setSelectedPeople(selectedPeople.filter(person => person.id !== id));
        } else if (selectedPeople.length < 8) {
            const person = people.find(p => p.id === id);
            setSelectedPeople([...selectedPeople, person]);
        }
    };

    const startTournament = () => {
        if (selectedPeople.length === 8) {
            setStage('tournament');
            setCurrentRound([...selectedPeople]);
        } else {
            alert('8명을 선택해야 토너먼트를 시작할 수 있습니다.');
        }
    };

    useEffect(() => {
        if (transitioning) {
            const timer = setTimeout(() => {
                if (nextRound.length > 0) {
                    setCurrentRound(nextRound);
                    setNextRound([]);
                    if (nextRound.length === 4) {
                        setRound(2);
                    } else if (nextRound.length === 2) {
                        setRound(3);
                    } else if (nextRound.length === 1) {
                        setStage('final');
                    }
                }
                setTransitioning(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [transitioning, nextRound]);

    const handleMatchWin = (winner) => {
        setNextRound([...nextRound, winner]);

        if (currentRound.length === 2) {
            setTransitioning(true);
        } else {
            setCurrentRound(currentRound.slice(2));
        }
    };

    const getRoundText = () => {
        if (round === 1) return '1라운드';
        if (round === 2) return '2라운드';
        if (round === 3) return '결승';
    };

    const renderSelectionScreen = () => (
        <View style={styles.container}>
            <Text style={styles.title}>8명을 선택하세요</Text>
            <FlatList
                data={people}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => togglePersonSelection(item.id)}
                        accessibilityLabel={`Select ${item.name}`}
                        accessibilityRole="button"
                    >
                        <Image
                            source={item.image}
                            style={[
                                styles.image,
                                selectedPeople.some(person => person.id === item.id) && styles.selectedImage,
                            ]}
                            accessibilityLabel={item.name}
                        />
                        <Text style={styles.name}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity onPress={startTournament} style={styles.button}>
                <Text style={styles.buttonText}>토너먼트 하기</Text>
            </TouchableOpacity>
        </View>
    );

    const renderTournamentScreen = () => (
        <View style={styles.container}>
            <Text style={styles.title}>{getRoundText()}</Text>
            {transitioning ? (
                <Text>다음 라운드를 준비 중입니다...</Text>
            ) : (
                currentRound.length >= 2 && (
                    <View style={styles.matchup}>
                        <TouchableOpacity
                            onPress={() => handleMatchWin(currentRound[0])}
                            accessibilityLabel={`Select ${currentRound[0].name} for the win`}
                            accessibilityRole="button"
                        >
                            <Image
                                source={currentRound[0].image}
                                style={styles.image}
                                accessibilityLabel={currentRound[0].name}
                            />
                            <Text style={styles.name}>{currentRound[0].name}</Text>
                        </TouchableOpacity>
                        <Text style={styles.vs}>VS</Text>
                        <TouchableOpacity
                            onPress={() => handleMatchWin(currentRound[1])}
                            accessibilityLabel={`Select ${currentRound[1].name} for the win`}
                            accessibilityRole="button"
                        >
                            <Image
                                source={currentRound[1].image}
                                style={styles.image}
                                accessibilityLabel={currentRound[1].name}
                            />
                            <Text style={styles.name}>{currentRound[1].name}</Text>
                        </TouchableOpacity>
                    </View>
                )
            )}
        </View>
    );

    const renderFinalScreen = () => (
        <View style={styles.container}>
            <Text style={styles.title}>우승자!</Text>
            <Image source={currentRound[0].image} style={styles.image} />
            <Text style={styles.name}>{currentRound[0].name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {stage === 'selection'
                ? renderSelectionScreen()
                : stage === 'tournament'
                    ? renderTournamentScreen()
                    : renderFinalScreen()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: 90,
        height: 90,
        margin: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedImage: {
        borderColor: 'blue',
    },
    matchup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    vs: {
        fontSize: 24,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    name: {
        textAlign: 'center',
        marginBottom: 20,
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
});

export default Tournament;
