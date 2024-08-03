import { StyleSheet, View, Text, ImageBackground, TouchableHighlight } from "react-native";
import { useNavigation } from '@react-navigation/native';   
import Global from '../global';

const MenuScreen = () => { 
    const navigation = useNavigation();

    const startIntro = () => {
        navigation.navigate('Intro');
    }

    return (
        <View style={styles.container}> 
            <ImageBackground source={Global.cityBannerImg} resizeMode="stretch" style={styles.citybg}>
                <TouchableHighlight onPress={startIntro} style={styles.button} underlayColor='green'>
                    <Text style={styles.text}>Start</Text>
                </TouchableHighlight>
            </ImageBackground>
        </View>
    );
}

styles = StyleSheet.create({ 
    container: {
        flex: 1,
    },
    citybg: {
        flex: 1,
        justifyContent: "center", 
    },
    button: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 10,
        width: '30%',
        marginTop: '10%',
        alignSelf: 'center',
    },
    text: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    }
});

export default MenuScreen;