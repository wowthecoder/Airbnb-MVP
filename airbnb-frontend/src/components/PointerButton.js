import { StyleSheet, TouchableWithoutFeedback, Image } from "react-native";

const PointerButton = ({ onPress, imgSrc, locationOnScreen }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Image source={imgSrc} style={[styles.pointers, locationOnScreen]} />
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({ 
    pointers: {
        position: 'absolute',
        width: "8%",
        height: "15%",
        resizeMode: 'contain',
    },
});

export default PointerButton;