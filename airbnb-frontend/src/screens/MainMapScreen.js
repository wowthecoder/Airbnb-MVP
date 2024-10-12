import { StyleSheet, View, ImageBackground, Image, Text, TouchableHighlight, TouchableWithoutFeedback } from "react-native";
import LocationDescText from "../components/LocationDescText";
import PointerButton from "../components/PointerButton";
import PropertyInfoBox from "../components/PropertyInfoBox";
import MonthlySummaryBox from "../components/MonthlySummaryBox";
import { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getAreas, getProperties, getUserStats, getOwnedProperties, setRent, calcMonthlyFinances, advanceMonth} from "../backendFuncs";
import Global from '../global';

const numAreas = 4;
const numProperties = 3;
const monthMap = {
    "Jan": 1,
    "Feb": 2,
    "Mar": 3,
    "Apr": 4,
    "May": 5,
    "Jun": 6,
    "Jul": 7,
    "Aug": 8,
    "Sep": 9,
    "Oct": 10,
    "Nov": 11,
    "Dec": 12,
};

const MainMapScreen = ({ route }) => {  
    const { userId } = route.params;
    // [current month name, current season icon, money]
    const [stats, setStats] = useState(["Jan", Global.winterIcon, 200000]);
    // booleans controlling whether area info is displayed
    const [showAreaInfo, setShowAreaInfo] = useState(Array(numAreas).fill(false));
    // The area descriptions from db
    const [areaDesc, setAreaDesc] = useState([]);
    // The property description data from db
    const [properties, setProperties] = useState([]);
    // The property info text displayed to players
    const [showPropertyInfo, setShowPropertyInfo] = useState(Array(numProperties).fill(""));
    // The ids and rental prices of properties that the user owns
    const [ownedProperties, setOwnedProperties] = useState({});
    // Hint text
    const [hint, setHint] = useState("");
    // Pay if not owned, change rental price if owned
    const [propertyButtonText, setPropertyButtonText] = useState("Pay");
    // Boolean controlling whether rental price slider is displayed
    const [showRentalSlider, setShowRentalSlider] = useState(false);
    // Rental price display on slider
    const [rentalPrice, setRentalPrice] = useState(100);
    // Boolean controlling whether not enough money error is displayed
    const [showNoMoney, setShowNoMoney] = useState(false);
    // Event description
    const [eventDesc, setEventDesc] = useState("");
    // Monthy financial summary display (an object containing num of guests, income, expenses, cash flow, property values)
    const [monthSummary, setMonthSummary] = useState(null);
    // Boolean controlling whether results are shown (after Dec)
    const [showResults, setShowResults] = useState(false);

    const navigation = useNavigation();
    
    // Runs on every time this screen is loaded from other screens
    useFocusEffect(
        useCallback(() => {
            // Close all boxes
            setShowAreaInfo(Array(numAreas).fill(false));
            setShowPropertyInfo(Array(numProperties).fill(""));

            // set area descriptions
            getAreas(setAreaDesc);

            // set property descriptions
            getProperties(setProperties);

            // set user stats (current month name, current season icon, money)
            getUserStats(userId, setStats);

            // get a list of properties that the user owns
            getOwnedProperties(userId, setOwnedProperties);

            // get events in the current month
            // getEventsInMonth(setEventDesc);
        }, [])
    );

    const getGraphs = () => {
        navigation.navigate('Graph', { userId: userId });
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

    const checkPropertyOwned = ( number ) => {
        return number.toString() in ownedProperties;
    }

    const getRentalPrice = ( number ) => {
        return ownedProperties[number.toString()];
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

    const showProperty = ( number ) => {
        // Refresh stats
        getOwnedProperties(userId, setOwnedProperties);

        let owned = checkPropertyOwned(number);
        if (showPropertyInfo[number - 1] !== "") {
            setShowPropertyInfo(Array(numProperties).fill(""));
        } else {
            let prop = properties[number - 1];
            let info = fillText(owned, prop[1], prop[2], prop[3], prop[4], prop[5]);
            setPropertyButtonText(owned ? "Change Rental Price" : "Pay");
            let arr = Array(numProperties).fill("");
            arr[number - 1] = info;
            setShowPropertyInfo(arr);
            if (owned) {
                setRentalPrice(getRentalPrice(number));
                setShowRentalSlider(false);
            }
        }
    }

    const changeRentalPrice = (houseNum, amount) => {
        setRent(userId, houseNum, amount);
    }

    const buyProperty = ( number ) => {
        // if (stats[2] < properties[number - 1][1]) {
        //     setShowNoMoney(true);
        // } else { 
        navigation.navigate('FinanceOptions', {
            userId: userId, 
            propertyId: number, 
            initialRent: properties[number - 1][7],
            fullPrice: properties[number - 1][1],
            renovateCost: properties[number - 1][4],
        });
        // }
    }

    const buyOrChangeRental = ( number ) => {
        if (checkPropertyOwned(number)) {
            if (propertyButtonText === "Change Rental Price") { // display rental price
                setRentalPrice(getRentalPrice(number));
                setShowRentalSlider(true);
                setPropertyButtonText("Confirm")
            } else { // confirm change rental
                changeRentalPrice(number, rentalPrice);
                setShowRentalSlider(false);
                setPropertyButtonText("Change Rental Price");
            }
        } else {
            buyProperty(number);
        }
    }

    const monthlySummary = () => {
        calcMonthlyFinances(userId, monthMap[stats[0]], setMonthSummary);
    }

    const nextMonth = () => {
        setMonthSummary(null)
        if (stats[0] === "Dec") {
            setShowResults(true);
        } else {
            // show the change season screens
            if (stats[0] == "Mar") {
                navigation.navigate("ChangeSeason", { season: "spring", userId: userId });
            } else if (stats[0] == "Jun") {
                navigation.navigate("ChangeSeason", { season: "summer", userId: userId });
            } else if (stats[0] == "Sep") {
                navigation.navigate("ChangeSeason", { season: "autumn", userId: userId });
            }
            advanceMonth(userId, monthSummary["net_cash_flow"]);
            getUserStats(userId, setStats);
        }
    }

    const goToDebriefing = () => {  
        setShowResults(false);
        navigation.navigate('Video');
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={Global.cityImg} resizeMode="stretch" style={styles.citybg}>
                <View style={styles.header}>
                    <View style={styles.monthlySummaryBox}>
                        <TouchableHighlight style={[styles.graphButton, styles.monthlySummaryButton]} onPress={monthlySummary} underlayColor='green'>
                            <Image source={Global.monthlySummaryIcon} style={styles.graphIcon} />
                        </TouchableHighlight>
                    </View>
                    <View style={styles.amountBox}>
                        <Text style={styles.amount}>{stats[0]}</Text>
                        <Image source={stats[1]} style={styles.seasonIcon}/>
                        <Text style={styles.amount}>{stats[2]}</Text>
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
                    propertyOwned={checkPropertyOwned(3)} 
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

                {/* {showNoMoney &&
                <View style={styles.hintBox}>
                    <Text style={[styles.hint, { color: "red" }]}>You don't have enough money to buy this property.</Text>
                </View>
                } */}

                {monthSummary !== null &&
                <MonthlySummaryBox
                    guests={monthSummary["num_guests"]}
                    income={monthSummary["rental_income"]}
                    expenses={monthSummary["expenses"]}
                    propertyValues={monthSummary["property_values"]}
                    onStayCurrentMonth={() => setMonthSummary(null)}
                    onGoNextMonth={nextMonth}
                />
                }

                {showResults &&
                <View style={styles.rowContainer}>
                    {/* Avatar Image */}
                    <Image source={Global.pointingImg} style={styles.avatar} />
            
                    {/* Text Box and Button */}
                    <View style={styles.resultsBoxContainer}>
                        {/* Text Box */}
                        <View style={styles.resultsBox}>
                            <Text style={styles.debriefText}>{Global.successMsg}</Text>
                        </View>

                        {/* Debriefing Button */}
                        <TouchableHighlight style={styles.debriefingButton} onPress={goToDebriefing} underlayColor="green">
                            <Text style={styles.debriefText}>To Debriefing</Text>
                        </TouchableHighlight>
                    </View>
                </View>
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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    monthlySummaryBox: {
        width: "70%",
    },
    graphButton: {
        width: "8%",
        height: "90%",
        borderRadius: 10,
        backgroundColor: 'white',
        marginLeft: '1%',
    },
    monthlySummaryButton: {
        width: "12%",
        backgroundColor: 'blue',
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
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20,
        height: '80%',
    },
    avatar: {
        width: "30%", // Adjust the size of the avatar as needed
        height: "80%",
        resizeMode: 'contain',
        marginBottom: 20, // Space between avatar and text box
    },
    resultsBoxContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resultsBox: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        width: '80%', // Adjust width to fit the screen nicely
        marginBottom: 20, // Space between text box and button
    },
    debriefText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    },
    debriefingButton: {
        backgroundColor: '#007BFF', // Blue button
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }    
});

export default MainMapScreen;