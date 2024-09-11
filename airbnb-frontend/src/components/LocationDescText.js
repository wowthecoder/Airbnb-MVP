import { StyleSheet, Text } from "react-native";

const LocationDescText = ({ numOfLines, description, positionOnScreen }) => {
    return (
        <Text 
            adjustsFontSizeToFit 
            numberOfLines={numOfLines}
            style={[styles.locationText, positionOnScreen]}
        >
            {description}
        </Text>
    );
}

const styles = StyleSheet.create({
    locationText: {
        fontSize: 16,
        color: "black",
        textAlign: "center",
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: "black",
        borderWidth: 3,
        position: "absolute",
        maxHeight: "30%",
        width: "40%",
    },
});

export default LocationDescText;