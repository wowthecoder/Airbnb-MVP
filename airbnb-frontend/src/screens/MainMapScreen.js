import { StyleSheet, View, ImageBackground, Image, Text, TouchableHighlight, TouchableWithoutFeedback } from "react-native";
import LocationDescText from "../components/LocationDescText";
import PointerButton from "../components/PointerButton";
import PropertyInfoBox from "../components/PropertyInfoBox";
import { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getAreas } from "../backendFuncs";
import Global from '../global';
import data from '../database.json';

const numAreas = 4;
const numProperties = 3;

const MainMapScreen = () => {  
    const [seasonIcon, setSeasonIcon] = useState(Global.winterIcon);
    const [showAreaInfo, setShowAreaInfo] = useState(Array(numAreas).fill(false));
    const [areaDesc, setAreaDesc] = useState(Array(numAreas).fill("haha"));
    const [showPropertyInfo, setShowPropertyInfo] = useState(Array(numProperties).fill(""));
    const [hint, setHint] = useState("");
    const [propertyButtonText, setPropertyButtonText] = useState("Pay");
    const [showRentalSlider, setShowRentalSlider] = useState(false);
    const [rentalPrice, setRentalPrice] = useState(100);
    const [showEvent, setShowEvent] = useState(false);
    const navigation = useNavigation();
    
    useFocusEffect(
        useCallback(() => {
            getAreas(setAreaDesc);
        }, [])
    );

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
        arr = Array(numAreas).fill(false);
        if (showAreaInfo[number - 1]) {
            setShowAreaInfo(arr);
        }
        else {
            arr[number - 1] = true;
            setShowAreaInfo(arr);
        }
    }

    // Connect to db later
    const checkPropertyOwned = ( number ) => {
        return number > 1;
    }

    const getRentalPrice = ( number ) => {
        console.log(`Getting rental price for house ${number}`);
        return 100;
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

    const changeRentalPrice = (houseNum, amount) => {
        console.log(`Changed rental price for house ${houseNum} to £${amount}`);
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
            if (propertyButtonText === "Change Rental Price") { // display rental price
                setRentalPrice(getRentalPrice(number));
                setShowRentalSlider(true);
                setPropertyButtonText("Confirm")
            } else {
                changeRentalPrice(number, rentalPrice);
                setShowRentalSlider(false);
                setPropertyButtonText("Change Rental Price");
            }
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

                <PointerButton onPress={() => getHints(true)} imgSrc={Global.infiHQptr} locationOnScreen={styles.infiHQ} />

                <PointerButton onPress={() => showArea(1)} imgSrc={Global.areaInfoPtr} locationOnScreen={styles.infoPtr1} />

                <PointerButton onPress={() => showArea(2)} imgSrc={Global.areaInfoPtr} locationOnScreen={styles.infoPtr2} />

                <PointerButton onPress={() => showArea(3)} imgSrc={Global.areaInfoPtr} locationOnScreen={styles.infoPtr3} />

                <PointerButton onPress={() => showArea(4)} imgSrc={Global.areaInfoPtr} locationOnScreen={styles.infoPtr4} />

                <PointerButton onPress={() => showProperty(1)} imgSrc={Global.locationPtr1} locationOnScreen={styles.locationPtr1} />

                <PointerButton onPress={() => showProperty(2)} imgSrc={Global.locationPtr2} locationOnScreen={styles.locationPtr2} />

                <PointerButton onPress={() => showProperty(3)} imgSrc={Global.locationPtr3} locationOnScreen={styles.locationPtr3} />

                {showAreaInfo[0] &&
                <LocationDescText numOfLines={3} description={areaDesc[0]} positionOnScreen={styles.locationDesc1} />
                }
                {showAreaInfo[1] &&
                <LocationDescText numOfLines={3} description={areaDesc[1]} positionOnScreen={styles.locationDesc2} />
                }
                {showAreaInfo[2] &&
                <LocationDescText numOfLines={3} description={areaDesc[2]} positionOnScreen={styles.locationDesc3} />
                }
                {showAreaInfo[3] &&
                <LocationDescText numOfLines={2} description={areaDesc[3]} positionOnScreen={styles.locationDesc4} />
                }

                {showPropertyInfo[0] !== "" &&
                <PropertyInfoBox 
                    locationOnScreen={styles.propDesc1} 
                    infoText={showPropertyInfo[0]} 
                    onButtonPress={() => buyOrChangeRental(1)} 
                    buttonText={propertyButtonText} 
                    propertyOwned={checkPropertyOwned(1)}
                    showSlider={showRentalSlider} 
                    rentalPrice={rentalPrice}
                    setRentalPrice={setRentalPrice}
                />
                }
                {showPropertyInfo[1] !== "" &&
                <PropertyInfoBox 
                    locationOnScreen={styles.propDesc2} 
                    infoText={showPropertyInfo[1]} 
                    onButtonPress={() => buyOrChangeRental(2)} 
                    buttonText={propertyButtonText} 
                    propertyOwned={checkPropertyOwned(2)}
                    showSlider={showRentalSlider} 
                    rentalPrice={rentalPrice}
                    setRentalPrice={setRentalPrice}
                />
                }
                {showPropertyInfo[2] !== "" &&
                <PropertyInfoBox 
                    locationOnScreen={styles.propDesc3} 
                    infoText={showPropertyInfo[2]} 
                    onButtonPress={() => buyOrChangeRental(3)} 
                    buttonText={propertyButtonText}
                    propertyOwned={checkPropertyOwned(2)} 
                    showSlider={showRentalSlider} 
                    rentalPrice={rentalPrice}
                    setRentalPrice={setRentalPrice}
                />
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