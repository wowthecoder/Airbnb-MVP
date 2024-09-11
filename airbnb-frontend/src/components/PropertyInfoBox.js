import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import Slider from '@react-native-community/slider';
import { useState } from "react";

const PropertyInfoBox = ({ locationOnScreen, infoText, onButtonPress, buttonText, propertyOwned, showSlider, rentalPrice, setRentalPrice }) => {
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
                <Text style={styles.payText}>{buttonText}</Text>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({ 
    propInfoContainer: {    
        position: "absolute",
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 3,
        alignItems: "center",
        padding: 10,
        width: "40%",
        maxHeight: "80%",
    },
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

export default PropertyInfoBox;