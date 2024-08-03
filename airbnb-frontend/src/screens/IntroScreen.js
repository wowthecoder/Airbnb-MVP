import { StyleSheet, View, ImageBackground, Image, Text, TouchableWithoutFeedback, TouchableHighlight } from "react-native";
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import Global from '../global';

const IntroScreen = () => {  
    const [msg, setMsg] = useState(Global.welcomeMsg);
    const [infi, setInfi] = useState(Global.handsUpImg);
    const [pointer, setPointer] = useState(false);
    const navigation = useNavigation();

    const changeMsg = () => {   
        if (msg === Global.welcomeMsg) {
            setMsg(Global.introMsg1);
            setInfi(Global.pointingImg);
        } else if (msg == Global.introMsg1) {
            setMsg(Global.introMsg2);
            setPointer(true);
        } else if (msg == Global.introMsg2) {   
            setMsg(Global.introMsg3);
        } else {
            navigation.navigate('ReadyStart');
        }
    }

    const showGraph = () => {   

    }

    return (
        <TouchableWithoutFeedback onPress={changeMsg}>
            <View style={styles.container}>
                <ImageBackground source={Global.cityImg} resizeMode="stretch" style={styles.citybg}>
                    <View style={styles.header}>
                        <View style={styles.amountBox}>
                            <Text style={styles.amount}>$0.00</Text>
                        </View>
                        <TouchableHighlight onPress={showGraph} style={styles.graphButton} underlayColor='green'>
                            <Image source={Global.graphIcon} style={styles.graphIcon} />
                        </TouchableHighlight>
                    </View>
                    <View style={styles.body}>
                        <Image source={infi} style={styles.infi} />
                        <Text style={styles.text}>{msg}</Text>
                    </View>
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
        alignItems: "center",
        paddingHorizontal: '3%',
    },
    header: {
        width: '100%',
        height: '16%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    graphButton: {
        width: "9%",
        height: "90%",
        borderRadius: 10,
        backgroundColor: 'white',
        marginLeft: '1%',
    },
    graphIcon: {
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
    },
    amountBox: {
        width: "20%",
        height: "90%",
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '1%',
    },
    body: {
        width: "100%",
        height: "80%",
        flexDirection: "row",
        justifyContent: "center", 
        alignItems: "center",
        padding: '5%',
    },
    infi: {
        width: "40%",
        height: "100%",
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

export default IntroScreen;