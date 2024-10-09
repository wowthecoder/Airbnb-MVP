import { StyleSheet, View, Text, ImageBackground, TouchableHighlight, Platform } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';   
import * as Application from 'expo-application';
import Global from '../global';
import { checkUserIdExists, createUser } from "../backendFuncs";

const MenuScreen = () => { 
    const navigation = useNavigation();
    const [nextScreen, setNextScreen] = useState('Intro');
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const getDeviceId = async () => {
            let id = null;
            if (Platform.OS === 'android') {
                id = Application.getAndroidId(); // Gets Android-specific ID
            } else if (Platform.OS === 'ios') {
                id = await Application.getIosIdForVendorAsync(); // Gets iOS-specific ID
            }
            console.log("Device ID:", id);
            let exists = await checkUserIdExists(id);
            if (exists) {
                setNextScreen('MainMap');
            } else {
                setNextScreen('Intro');
                // Initialise player data
                createUser(id);
            }
            setUserId(id);
        };
    
        getDeviceId();
    }, []);

    // If device id exists in table, skip intro
    const startIntro = () => {
        navigation.navigate(nextScreen, { userId: userId });
    }

    return (
        <View style={styles.container}> 
            <ImageBackground source={Global.cityBannerImg} resizeMode="stretch" style={styles.citybg}>
                <TouchableHighlight onPress={startIntro} style={styles.button} underlayColor='green'>
                    <Text style={styles.text}>Start</Text>
                </TouchableHighlight>
            </ImageBackground>
        </View>
    );
}

styles = StyleSheet.create({ 
    container: {
        flex: 1,
    },
    citybg: {
        flex: 1,
        justifyContent: "center", 
    },
    button: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 10,
        width: '30%',
        marginTop: '10%',
        alignSelf: 'center',
    },
    text: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    }
});

export default MenuScreen;