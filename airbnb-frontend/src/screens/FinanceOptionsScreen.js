import { StyleSheet, Text, View, ImageBackground, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Global from '../global';
import data from '../database.json';

const FinanceOptionsScreen = ({ route }) => {
    const { userId, propertyId, initialRent, fullPrice } = route.params;
    const navigation = useNavigation();

    const backToMap = () => {
        navigation.navigate('MainMap', {userId: userId});
    }

    const buyInsurance = ( number ) => {
        let payment = 0;
        let mortgage = 0;
        switch (number) {
            case 1:
                payment = fullPrice;
                break;
            case 2:
                payment = fullPrice * 0.25;
                mortgage = (fullPrice / (30 * 12)) +  (fullPrice * 0.05 / 12);
                // Round to 2 decimal places
                mortgage = Math.round(mortgage * 100) / 100;
                console.log("Mortgage:", mortgage);
                break;
            case 3:
                payment = fullPrice * 0.25;
                mortgage = fullPrice * 0.065 / 12;
                // Round to 2 decimal places
                mortgage = Math.round(mortgage * 100) / 100;
                console.log("Mortgage:", mortgage);
                break;
        }
        // Pass in the full price so that insurance can come back to this screen
        navigation.navigate('InsuranceOptions', { 
            userId: userId, 
            propertyId: propertyId,
            initialRent: initialRent, 
            fullPrice: fullPrice,
            mortgage: mortgage, 
            deduction: payment
        });
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={Global.financeOptionsBg} resizeMode="stretch" style={styles.bankBg}>
                <TouchableHighlight onPress={backToMap} style={styles.backButton} underlayColor='green'>
                    <Text style={styles.backText}>{'<'} Back</Text>
                </TouchableHighlight>
                <View style={styles.body}>
                    <Text style={styles.headerText}>Financing Options</Text>
                    <View style={styles.bodyContent}>
                        <View style={styles.optionsContainer}>
                            <Text style={styles.optionTitle}>{data["finance_options"][0].title}</Text>
                            <Text style={styles.optionDescription}>{data["finance_options"][0].description}</Text>
                            <TouchableHighlight style={styles.optionButton} underlayColor='green' onPress={() => buyInsurance(1)}>
                                <Text style={styles.optionButtonText}>Option 1</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={[styles.optionsContainer, { marginHorizontal: "2%" }]}>
                            <Text style={styles.optionTitle}>{data["finance_options"][1].title}</Text>
                            <Text style={styles.optionDescription}>{data["finance_options"][1].description}</Text>
                            <TouchableHighlight style={styles.optionButton} underlayColor='green' onPress={() => buyInsurance(2)}>
                                <Text style={styles.optionButtonText}>Option 2</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.optionsContainer}>
                            <Text style={styles.optionTitle}>{data["finance_options"][2].title}</Text>
                            <Text style={styles.optionDescription}>{data["finance_options"][2].description}</Text>
                            <TouchableHighlight style={styles.optionButton} underlayColor='green' onPress={() => buyInsurance(3)}>
                                <Text style={styles.optionButtonText}>Option 3</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({  
    container: {
        flex: 1,
    },
    bankBg: {
        flex: 1,
        justifyContent: "center", 
        alignItems: "center",
    },
    backButton: {
        position: "absolute",
        top: "5%",
        left: "2%",
        backgroundColor: 'blue',
        borderRadius: 10,
        padding: 10,
    },
    backText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    body: {
        backgroundColor: "white",
        width: "70%",
        height: "70%",
        borderRadius: 10,
        borderWidth: 2,
        padding: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    bodyContent: {
        flexDirection: "row",
        width: "100%",
        // height: "80%",
    },
    optionsContainer: {
        width: "32%",
        alignItems: "center",
        justifyContent: "space-between",
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    optionDescription: {
        fontSize: 14,
        marginTop: "5%",
    },
    optionButton: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 10,
        marginTop: "5%",
        width: "60%",
    },
    optionButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    }
});

export default FinanceOptionsScreen;