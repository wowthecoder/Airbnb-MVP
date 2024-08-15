import { StyleSheet, View, ImageBackground, Image, Text, TouchableHighlight, TouchableWithoutFeedback } from "react-native";
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import Global from '../global';
import data from '../database.json';

const MainMapScreen = () => {  
    const [msg, setMsg] = useState(Global.welcomeMsg);
    const [infi, setInfi] = useState(Global.handsUpImg);
    const [seasonIcon, setSeasonIcon] = useState(Global.winterIcon);
    const [showAreaInfo, setShowAreaInfo] = useState([false, false, false, false]);
    const navigation = useNavigation();

    const getGraphs = () => {
        navigation.navigate('Graph');
    }

    const getHints = () => {
        navigation.navigate('Hints');
    }

    const showInfo = ( number ) => {
        console.log(number);
        switch (number) { 
            case 1:
                setShowAreaInfo([true, false, false, false]);
                break;
            case 2:
                setShowAreaInfo([false, true, false, false]);
                break;
            case 3:
                setShowAreaInfo([false, false, true, false]);
                break;
            case 4:
                setShowAreaInfo([false, false, false, true]);
                break;
        };
    }

    const showPropertyInfo = ( number ) => {
        console.log(number);
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
                    <Image source={Global.areaInfoPtr} style={[styles.pointers, styles.infoPtr1]} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>showInfo(2)}>
                    <Image source={Global.areaInfoPtr} style={[styles.pointers, styles.infoPtr2]} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>showInfo(3)}>
                    <Image source={Global.areaInfoPtr} style={[styles.pointers, styles.infoPtr3]} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>showInfo(4)}>
                    <Image source={Global.areaInfoPtr} style={[styles.pointers, styles.infoPtr4]} />
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={()=>showPropertyInfo(1)}>
                    <Image source={Global.locationPtr1} style={[styles.pointers, styles.locationPtr1]} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>showPropertyInfo(2)}>
                    <Image source={Global.locationPtr2} style={[styles.pointers, styles.locationPtr2]} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>showPropertyInfo(3)}>
                    <Image source={Global.locationPtr3} style={[styles.pointers, styles.locationPtr3]} />
                </TouchableWithoutFeedback>

                {showAreaInfo[0] &&
                <Text style={styles.text}>{msg}</Text>
                }
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
    locationPtr1: {
        top: "7%",
        left: "55%",
    },
    locationPtr2: {
        top: "70%",
        left: "14%",
    },
    locationPtr3: {
        top: "49%",
        left: "87%",
    },
});

export default MainMapScreen;