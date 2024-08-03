import { StyleSheet, View, ImageBackground, Image, Text, TouchableWithoutFeedback } from "react-native";
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import Global from '../global';

const ReadyStartScreen = () => {  
    const [msg, setMsg] = useState(Global.welcomeMsg);
    const [infi, setInfi] = useState(Global.handsUpImg);
    const navigation = useNavigation();

    const changeMsg = () => {   
        if (msg === Global.welcomeMsg) {
            setMsg(Global.introMsg1);
            setInfi(Global.pointingImg);
        } else if (msg == Global.introMsg1) {
            setMsg(Global.introMsg2);
        } else if (msg == Global.introMsg2) {   
            setMsg(Global.introMsg3);
        } else {
            navigation.navigate('ReadyStart');
        }
    }
    return (
        <TouchableWithoutFeedback onPress={changeMsg}>
            <View style={styles.container}>
                <ImageBackground source={Global.cityImg} resizeMode="stretch" style={styles.citybg}>
                    <Image source={infi} style={styles.infi} />
                    <Text style={styles.text}>{msg}</Text>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
    },
    citybg: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center", 
        alignItems: "center",
        padding: '5%',
    },
    infi: {
        width: "40%",
        height: "80%",
        resizeMode: "contain",
    },
    text: {
        color: "black",
        fontSize: 20,
        textAlign: "center",
        backgroundColor: "white",
        width: "60%",
        padding: 10,
        borderColor: "black",
        borderWidth: 3,
    }
});

export default ReadyStartScreen;