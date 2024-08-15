import { StyleSheet, View, ImageBackground, Image, Text, TouchableWithoutFeedback, TouchableHighlight } from "react-native";
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import Global from '../global';

const IntroScreen = () => {  
    const [msg, setMsg] = useState(Global.welcomeMsg);
    const [infi, setInfi] = useState(Global.handsUpImg);
    const [seasonIcon, setSeasonIcon] = useState(Global.winterIcon);
    const [pointer, setPointer] = useState(false);
    const [nextBtn, setNextBtn] = useState(false);
    const [infoFontSize, setInfoFontSize] = useState(20);
    const [bgImg, setBgImg] = useState(Global.cityImg);
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
            setPointer(false);
            setNextBtn(true);
            setInfi(Global.handsUpImg);
        } else if (msg == Global.introMsg4) {
            navigation.navigate('MainMap');
        }
    }

    const readyStart = () => {  
        setMsg(Global.introMsg4);
        setNextBtn(false);
        setInfoFontSize(16);
        setBgImg(Global.cityPropertiesImg);
    }

    return (
        <TouchableWithoutFeedback onPress={changeMsg}>
            <View style={styles.container}>
                <ImageBackground source={bgImg} resizeMode="stretch" style={styles.citybg}>
                    <View style={styles.header}>
                        <View style={styles.amountBox}>
                            <Text style={styles.amount}>Jan</Text>
                            <Image source={seasonIcon} style={styles.seasonIcon}/>
                            <Text style={styles.amount}>£200,000</Text>
                        </View>
                        <TouchableHighlight style={styles.graphButton} underlayColor='green'>
                            <Image source={Global.graphIcon} style={styles.graphIcon} />
                        </TouchableHighlight>
                    </View>
                    {pointer && 
                    <Image source={Global.pointerImg} style={styles.pointer} /> 
                    }
                    <View style={styles.body}>
                        <Image source={infi} style={styles.infi} />
                        <View style={styles.textContainer}>
                            <Text style={[styles.text, {fontSize: infoFontSize}]}>{msg}</Text>
                            {nextBtn && 
                            <TouchableHighlight style={styles.nextButton} onPress={readyStart} underlayColor='green'>
                                <Text style={styles.buttonText}>Next</Text>
                            </TouchableHighlight>
                            }
                        </View>
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
        paddingHorizontal: '2%',
    },
    header: {
        width: '100%',
        height: '14%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    graphButton: {
        width: "8%",
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
        height: "80%",
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '1%',
    },
    seasonIcon: {
        width: "20%",
        height: "60%",
        resizeMode: 'contain',
    },
    pointer: {
        width: "5%",
        height: "15%",
        resizeMode: 'contain',
        position: 'absolute',
        top: '11%',
        left: '95%',
    },
    body: {
        width: "100%",
        height: "80%",
        flexDirection: "row",
        justifyContent: "center", 
        alignItems: "flex-start",
        padding: '5%',
    },
    infi: {
        width: "40%",
        height: "100%",
        resizeMode: "contain",
    },
    textContainer: {
        width: "60%",
    },
    text: {
        color: "black",
        textAlign: "center",
        backgroundColor: "white",
        padding: 10,
        borderColor: "black",
        borderWidth: 3,
    },
    nextButton: {
        width: '50%',
        backgroundColor: '#3d62fa',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: '5%',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    }
});

export default IntroScreen;