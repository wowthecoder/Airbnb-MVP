import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, ImageBackground, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Global from '../global';

const BoughtPropertyScreen = () => {
    const navigation = useNavigation();

    const backToMap = () => {
        navigation.navigate('MainMap');
    }

    return (
        <TouchableWithoutFeedback onPress={backToMap}>
            <View style={styles.container}>
                <ImageBackground source={Global.boughtPropertyBg} resizeMode="stretch" style={styles.citybg}>
                    <Image source={Global.smirkingImg} style={styles.infi} />
                    <Text style={styles.text}>{Global.boughtPropertyMsg}</Text>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    citybg: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center", 
        alignItems: "center",
    },
    infi: {
        position: "absolute",
        width: "50%",
        height: "70%",
        // image is centered
        bottom: 0, 
        right: "60%", 
        resizeMode: "contain",
    },
    text: {
        fontSize: 20,
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 2,
        width: "50%",
        padding: 10,
        marginLeft: "20%",
    },
});

export default BoughtPropertyScreen;