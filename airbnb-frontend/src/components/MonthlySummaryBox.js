import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import Slider from '@react-native-community/slider';
import { useState } from "react";

const MonthlySummaryBox = () => {
    return (
        <View style={[styles.propInfoContainer, locationOnScreen]}>
            <Text style={styles.propText}>{infoText}</Text> 
            {propertyOwned && 
            <Text style={styles.rentalText}>Rental price per night(£): {rentalPrice}</Text>
            }
            {showSlider && 
            <View style={styles.sliderContainer}>
                <Text>50</Text>
                <Slider 
                    style={{width: 200, height: 40}} 
                    minimumValue={50} 
                    maximumValue={500} 
                    minimumTrackTintColor="blue" 
                    maximumTrackTintColor="#000000" 
                    thumbTintColor="blue"
                    step={1}
                    value={rentalPrice}
                    onValueChange={setRentalPrice}
                />
                <Text>500</Text>
            </View>
            }
            <TouchableHighlight style={styles.payButton} onPress={onButtonPress} underlayColor='green'>
                <Text style={styles.payText}>Next Month!</Text>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({ 
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    propText: {
        textAlign: "left",
    }, 
    rentalText: {
        fontWeight: "bold",
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
});

export default MonthlySummaryBox;