import { StyleSheet, Text, View, TouchableHighlight, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { buyProperty } from '../backendFuncs';
import Global from '../global';
import data from '../database.json';

const InsuranceOptionsScreen = ({ route }) => {
    const { userId, propertyId, initialRent, fullPrice, mortgage, deduction } = route.params;
    const navigation = useNavigation();

    const propertyBought = ( number ) => {
        let insurance = data["insurance_options"][number - 1]["annual_fee"] / 12;
        // console.log("Insurance:", insurance);
        buyProperty(userId, propertyId, initialRent, mortgage, insurance, deduction);
        navigation.navigate('BoughtProperty', { userId: userId });
    }

    const backToFinanceOptions = () => {    
        navigation.navigate('FinanceOptions', { 
            userId: userId, 
            propertyId: propertyId, 
            initialRent: initialRent,
            fullPrice: fullPrice 
        });
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={Global.insuranceOptionsBg} resizeMode="stretch" style={styles.officeBg}>
                <TouchableHighlight onPress={backToFinanceOptions} style={styles.backButton} underlayColor='green'>
                    <Text style={styles.backText}>{'<'} Back</Text>
                </TouchableHighlight>
                <View style={styles.body}>
                    <Text style={styles.headerText}>Insurance Options</Text>
                    <View style={styles.bodyContent}>
                        <View style={styles.optionsContainer}>
                            <Text style={styles.optionTitle}>{data["insurance_options"][0].title}</Text>
                            <Text style={styles.optionDescription}>{data["insurance_options"][0].description}</Text>
                            <Text style={styles.optionDescription}>£{data["insurance_options"][0]["annual_fee"]} per year</Text>
                            <TouchableHighlight style={styles.optionButton} underlayColor='green' onPress={() => propertyBought(1)}>
                                <Text style={styles.optionButtonText}>Option 1</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.optionsContainer}>
                            <Text style={styles.optionTitle}>{data["insurance_options"][1].title}</Text>
                            <Text style={styles.optionDescription}>{data["insurance_options"][1].description}</Text>
                            <Text style={[styles.optionDescription, { marginTop: "15%" }]}>£{data["insurance_options"][1]["annual_fee"]} per year</Text>
                            <TouchableHighlight style={styles.optionButton} underlayColor='green' onPress={() => propertyBought(2)}>
                                <Text style={styles.optionButtonText}>Option 2</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.optionsContainer}>
                            <Text style={styles.optionTitle}>{data["insurance_options"][2].title}</Text>
                            <Text style={styles.optionDescription}>{data["insurance_options"][2].description}</Text>
                            <Text style={[styles.optionDescription, { marginTop: "37%" }]}>£{data["insurance_options"][2]["annual_fee"]} per year</Text>
                            <TouchableHighlight style={styles.optionButton} underlayColor='green' onPress={() => propertyBought(3)}>
                                <Text style={styles.optionButtonText}>Option 3</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.optionsContainer}>
                            <Text style={styles.optionTitle}>{data["insurance_options"][3].title}</Text>
                            <Text style={styles.optionDescription}>{data["insurance_options"][3].description}</Text>
                            <Text style={[styles.optionDescription, { marginTop: "65%" }]}>£{data["insurance_options"][3]["annual_fee"]} per year</Text>
                            <TouchableHighlight style={styles.optionButton} underlayColor='green' onPress={() => propertyBought(4)}>
                                <Text style={styles.optionButtonText}>Option 4</Text>
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
    officeBg: {
        flex: 1,
        justifyContent: "center", 
        alignItems: "center",
    },
    backButton: {
        position: "absolute",
        top: "2%",
        left: "2%",
        backgroundColor: 'blue',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    backText: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    },
    body: {
        backgroundColor: "white",
        width: "85%",
        height: "83%",
        borderRadius: 10,
        borderWidth: 2,
        padding: 10,
        marginTop: "2%",
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    bodyContent: {
        flexDirection: "row",
        width: "100%",
        height: "85%",
    },
    optionsContainer: {
        width: "25%",
        height: "100%",
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
        width: "70%",
    },
    optionButtonText: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
    }
});

export default InsuranceOptionsScreen;