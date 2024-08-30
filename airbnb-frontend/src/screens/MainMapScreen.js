import { StyleSheet, View, ImageBackground, Image, Text, TouchableHighlight, TouchableWithoutFeedback } from "react-native";
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import Global from '../global';
import data from '../database.json';

const numAreas = 4;
const numProperties = 3;

const MainMapScreen = () => {  
    const [msg, setMsg] = useState(Global.welcomeMsg);
    const [infi, setInfi] = useState(Global.handsUpImg);
    const [seasonIcon, setSeasonIcon] = useState(Global.winterIcon);
    const [showAreaInfo, setShowAreaInfo] = useState(Array(numAreas).fill(false));
    const [showPropertyInfo, setShowPropertyInfo] = useState(Array(numProperties).fill(""));
    const [hint, setHint] = useState("");
    const [propertyButtonText, setPropertyButtonText] = useState("Pay");
    const [showRentalSlider, setShowRentalSlider] = useState(false);
    const navigation = useNavigation();

    const getGraphs = () => {
        navigation.navigate('Graph');
    }

    const getHints = (toggle) => {
        if (toggle) {
            setHint("Remember that you can choose many options to finance your property investment.");
        } else {
            setHint("");
        }
    }

    const showArea = ( number ) => {
        switch (number) { 
            case 1:
                if (showAreaInfo[0]) {
                    setShowAreaInfo(Array(numAreas).fill(false));
                }
                else {
                    setShowAreaInfo([true, false, false, false]);
                }
                break;
            case 2:
                if (showAreaInfo[1]) {
                    setShowAreaInfo(Array(numAreas).fill(false));
                }
                else {
                    setShowAreaInfo([false, true, false, false]);
                }
                break;
            case 3:
                if (showAreaInfo[2]) {
                    setShowAreaInfo(Array(numAreas).fill(false));
                }
                else {
                    setShowAreaInfo([false, false, true, false]);
                }
                break;
            case 4:
                if (showAreaInfo[3]) {
                    setShowAreaInfo(Array(numAreas).fill(false));
                }
                else {
                    setShowAreaInfo([false, false, false, true]);
                }
                break;
        };
    }

    const checkPropertyOwned = ( number ) => {
        return number % 2 == 0;
     }

    const fillText = ( owned, price, numHotels, hotelFee, renovationCost, note ) => {  
        let res = `Price: £${price}\n`
        + `Number of surrounding AirBnBs and hotels: ${numHotels} (Average £${hotelFee} per night)\n`
        if (!owned) {
            res += `Estimated renovation cost to meet AirBnB standards: £${renovationCost}\n`;
        }
        res += `Note: ${note}`;
        return res;
    }

    const setPropertyBtnTxt = ( owned ) => {
        setPropertyButtonText(owned ? "Change Rental Price" : "Pay");
    }

    const showProperty = ( number ) => {
        let owned = checkPropertyOwned(number);
        switch (number) { 
            case 1:
                if (showPropertyInfo[0] !== "") {
                    setShowPropertyInfo(Array(numProperties).fill(""));
                }
                else {
                    let prop = data.properties[0];
                    let info = fillText(owned, prop.price, prop["surrounding_hotels"], prop["avg_hotel_fee"], prop["renovation_costs"], prop["note"]);
                    setPropertyBtnTxt(owned);
                    setShowPropertyInfo([info, "", ""]);
                }
                break;
            case 2: 
                if (showPropertyInfo[1] !== "") {   
                    setShowPropertyInfo(Array(numProperties).fill(""));
                }
                else {
                    let prop = data.properties[1];
                    let info = fillText(owned, prop.price, prop["surrounding_hotels"], prop["avg_hotel_fee"], prop["renovation_costs"], prop["note"]);
                    setPropertyBtnTxt(owned);
                    setShowPropertyInfo(["", info, ""]);
                }
                break;
            case 3:
                if (showPropertyInfo[2] !== "") {
                    setShowPropertyInfo(Array(numProperties).fill(""));
                }
                else {
                    let prop = data.properties[2];
                    let info = fillText(owned, prop.price, prop["surrounding_hotels"], prop["avg_hotel_fee"], prop["renovation_costs"], prop["note"]);
                    setPropertyBtnTxt(owned);
                    setShowPropertyInfo(["", "", info]);
                }
                break;
        };
    }

    const changeRentalPrice = ( number ) => {
        console.log("Change rental price");
    }

    const buyProperty = ( number ) => {
        navigation.navigate('FinanceOptions');
        // switch (number) {
        //     case 1:
        //         Global.money -= data.properties[0].price;
        //         break;
        //     case 2:
        //         Global.money -= data.properties[1].price;
        //         break;
        //     case 3:
        //         Global.money -= data.properties[2].price;
        //         break;
        // }
    }

    const buyOrChangeRental = ( number ) => {
        if (checkPropertyOwned(number)) {
            changeRentalPrice(number);
        } else {
            buyProperty(number);
        }
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

                <TouchableWithoutFeedback onPress={() => getHints(true)}>
                    <Image source={Global.infiHQptr} style={[styles.pointers, styles.infiHQ]} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>showArea(1)}>
                    <Image source={Global.areaInfoPtr} style={[styles.pointers, styles.infoPtr1]} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>showArea(2)}>
                    <Image source={Global.areaInfoPtr} style={[styles.pointers, styles.infoPtr2]} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>showArea(3)}>
                    <Image source={Global.areaInfoPtr} style={[styles.pointers, styles.infoPtr3]} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>showArea(4)}>
                    <Image source={Global.areaInfoPtr} style={[styles.pointers, styles.infoPtr4]} />
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={()=>showProperty(1)}>
                    <Image source={Global.locationPtr1} style={[styles.pointers, styles.locationPtr1]} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>showProperty(2)}>
                    <Image source={Global.locationPtr2} style={[styles.pointers, styles.locationPtr2]} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>showProperty(3)}>
                    <Image source={Global.locationPtr3} style={[styles.pointers, styles.locationPtr3]} />
                </TouchableWithoutFeedback>

                {showAreaInfo[0] &&
                <Text adjustsFontSizeToFit numberOfLines={3} style={[styles.locationText, styles.locationDesc1]}>{data.areas[0].description}</Text>
                }
                {showAreaInfo[1] &&
                <Text adjustsFontSizeToFit numberOfLines={2} style={[styles.locationText, styles.locationDesc2]}>{data.areas[1].description}</Text>
                }
                {showAreaInfo[2] &&
                <Text adjustsFontSizeToFit numberOfLines={2} style={[styles.locationText, styles.locationDesc3]}>{data.areas[2].description}</Text>
                }
                {showAreaInfo[3] &&
                <Text adjustsFontSizeToFit numberOfLines={2} style={[styles.locationText, styles.locationDesc4]}>{data.areas[3].description}</Text>
                }

                {showPropertyInfo[0] !== "" &&
                <View style={[styles.propInfoContainer, styles.propDesc1]}>
                    <Text style={styles.propText}>{showPropertyInfo[0]}</Text>
                    <TouchableHighlight style={styles.payButton} onPress={() => buyProperty(1)} underlayColor='green'>
                        <Text style={styles.payText}>{propertyButtonText}</Text>
                    </TouchableHighlight>
                </View>
                }
                {showPropertyInfo[1] !== "" &&
                <View style={[styles.propInfoContainer, styles.propDesc2]}>
                    <Text style={styles.propText}>{showPropertyInfo[1]}</Text>
                    <TouchableHighlight style={styles.payButton} onPress={() => buyProperty(2)} underlayColor='green'>
                        <Text style={styles.payText}>{propertyButtonText}</Text>
                    </TouchableHighlight>
                </View>
                }
                {showPropertyInfo[2] !== "" &&
                <View style={[styles.propInfoContainer, styles.propDesc3]}>
                    <Text style={styles.propText}>{showPropertyInfo[2]}</Text>
                    <TouchableHighlight style={styles.payButton} onPress={() => buyProperty(3)} underlayColor='green'>
                        <Text style={styles.payText}>{propertyButtonText}</Text>
                    </TouchableHighlight>
                </View>
                }

                {hint !== "" &&
                <TouchableWithoutFeedback onPress={() => getHints(false)}>
                    <View style={styles.hintBox}>
                        <Text style={[styles.hint, { fontWeight: "bold" }]}>Hint:</Text>
                        <Text style={styles.hint}>{hint}</Text>
                    </View>
                </TouchableWithoutFeedback>
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
        justifyContent: "flex-start", 
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
    locationText: {
        color: "black",
        textAlign: "center",
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: "black",
        borderWidth: 3,
        position: "absolute",
        maxHeight: "20%",
        width: "40%",
    },
    locationDesc1: {
        top: "5%",
        left: "10%",
    },
    locationDesc2: {
        top: "33%",
        left: "53%",
    },
    locationDesc3: {
        top: "50%",
        left: "7%",
    },
    locationDesc4: {
        top: "80%",
        left: "47%",
    },
    propInfoContainer: {    
        position: "absolute",
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 3,
        alignItems: "center",
        padding: 10,
        width: "40%",
        maxHeight: "70%",
    },
    propText: {
        textAlign: "left",
    }, 
    propDesc1: {
        top: "5%",
        left: "15%",
    },
    propDesc2: {
        top: "20%",
        left: "20%",
    },
    propDesc3: {
        top: "20%",
        left: "46%",
    },
    payButton: {
        backgroundColor: 'royalblue',
        padding: 10,
        borderRadius: 10,
        minWidth: '40%',
        maxWidth: '90%',
        marginTop: 5,
    },
    payText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    hintBox: {
        width: "60%",
        // height: "40%",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        alignSelf: "center",
        marginTop: "5%",
    }, 
    hint: {
        fontSize: 20,
        textAlign: "center",
    },
});

export default MainMapScreen;