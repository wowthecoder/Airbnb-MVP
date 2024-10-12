import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import Global from '../global';

const ScoreScreen = () => {
    return (
        <ImageBackground source={Global.insuranceOptionsBg} style={styles.background}>
            {/* Avatar Image */}
            <Image source={Global.pointingImg} style={styles.avatar} />

            {/* Text Box */}
            <View style={styles.textBox}>
                <Text style={styles.scoreText}>Your Score: 70</Text>
                <Text style={styles.coinText}>+ 100 🪙</Text> 
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        flexDirection: 'row',
        resizeMode: 'cover', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    avatar: {
        width: "30%", // Adjust the size as per your avatar image
        height: "70%",
        resizeMode: 'contain',
    },
    textBox: {
        backgroundColor: 'rgba(52, 152, 219, 1.0)', // Blue with transparency
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center', 
    },
    scoreText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    coinText: {
        color: 'yellow',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ScoreScreen;
