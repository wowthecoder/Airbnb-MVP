import { StyleSheet, View, ImageBackground, Image, Text, TouchableHighlight, TouchableWithoutFeedback } from "react-native";
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import Global from '../global';

const MainMapScreen = () => {  
    const [msg, setMsg] = useState(Global.welcomeMsg);
    const [infi, setInfi] = useState(Global.handsUpImg);
    const [seasonIcon, setSeasonIcon] = useState(Global.winterIcon);
    const navigation = useNavigation();

    const getGraphs = () => {
        navigation.navigate('Graph');
    }

    const getHints = () => {
        navigation.navigate('Hints');
    }

    const showInfo = ( number ) => {
        console.log(number);
        // switch (number) { 
        //     case 1:
        //         setMsg(Global.introMsg1);
        //         setInfi(Global.pointingImg);
        //         break;
        //     case 2:
        //         setMsg(Global.introMsg2);
        //         setInfi(Global.handsUpImg);
        //         break;
        //     case 3:
        //         setMsg(Global.introMsg3);
        //         setInfi(Global.handsUpImg);
        //         break;
        //     case 4:
        //         setMsg(Global.introMsg4);
        //         setInfi(Global.handsUpImg);
        //         break;
        // };
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={Global.cityImg} resizeMode="stretch" style={styles.citybg}>
                <View style={styles.header}>
                    <View style={styles.amountBox}>
                        <Text style={styles.amount}>Jan</Text>
                        <Image source={seasonIcon} style={styles.seasonIcon}/>
                        <Text style={styles.amount}>£200,000</Text>
                    </View>
                    <TouchableHighlight style={styles.graphButton} onPress={getGraphs} underlayColor='green'>
                        <Image source={Global.graphIcon} style={styles.graphIcon} />
                    </TouchableHighlight>
                </View>

                <TouchableWithoutFeedback onPress={getHints}>
                    <Image source={Global.infiHQptr} style={[styles.pointers, styles.infiHQ]} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>showInfo(1)}>
                    <Image source={Global.propertyInfoPtr} style={[styles.pointers, styles.infoPtr1]} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>showInfo(2)}>
                    <Image source={Global.propertyInfoPtr} style={[styles.pointers, styles.infoPtr2]} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>showInfo(3)}>
                    <Image source={Global.propertyInfoPtr} style={[styles.pointers, styles.infoPtr3]} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>showInfo(4)}>
                    <Image source={Global.propertyInfoPtr} style={[styles.pointers, styles.infoPtr4]} />
                </TouchableWithoutFeedback>

                
            </ImageBackground>
        </View>
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
        alignItems: "flex-start",
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
    pointers: {
        position: 'absolute',
        width: "8%",
        height: "15%",
        resizeMode: 'contain',
    },
    infiHQ: {
        top: "55%",
        left: "55%",
        //override
        width: "10%",
        height: "20%",
    },
    infoPtr1: {
        top: "1%",
        left: "50%",
    },
    infoPtr2: {
        top: "36%",
        left: "45%",
    },
    infoPtr3: {
        top: "55%",
        left: "47%",
    },
    infoPtr4: {
        top: "80%",
        left: "87%",
    },
});

export default MainMapScreen;