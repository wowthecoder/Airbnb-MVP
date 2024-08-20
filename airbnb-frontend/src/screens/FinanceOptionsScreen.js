import { StyleSheet, Text, View, ImageBackground, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Global from '../global';
import data from '../database.json';

const FinanceOptionsScreen = () => {
    const navigation = useNavigation();

    const buyInsurance = ( number ) => {
        navigation.navigate('InsuranceOptions');
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={Global.financeOptionsBg} resizeMode="stretch" style={styles.bankBg}>
                <View style={styles.body}>
                    <Text style={styles.headerText}>Financing Options</Text>
                    <View style={styles.bodyContent}>
                        <View style={styles.optionsContainer}>
                            <Text style={styles.optionTitle}>{data["finance_options"][0].title}</Text>
                            <Text style={styles.optionDescription}>{data["finance_options"][0].description}</Text>
                            <TouchableHighlight style={styles.optionButton} underlayColor='green'>
                                <Text style={styles.optionButtonText}>Option 1</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={[styles.optionsContainer, { marginHorizontal: "2%" }]}>
                            <Text style={styles.optionTitle}>{data["finance_options"][1].title}</Text>
                            <Text style={styles.optionDescription}>{data["finance_options"][1].description}</Text>
                            <TouchableHighlight style={styles.optionButton} underlayColor='green'>
                                <Text style={styles.optionButtonText}>Option 2</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.optionsContainer}>
                            <Text style={styles.optionTitle}>{data["finance_options"][2].title}</Text>
                            <Text style={styles.optionDescription}>{data["finance_options"][2].description}</Text>
                            <TouchableHighlight style={styles.optionButton} underlayColor='green'>
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