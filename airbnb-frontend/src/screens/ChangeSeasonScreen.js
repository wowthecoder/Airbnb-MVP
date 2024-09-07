import { StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Global from '../global';

const ChangeSeasonScreen = ({ route }) => {
    const { season } = route.params;
    const navigation = useNavigation();

    const backToMap = () => {
        navigation.navigate('MainMap');
    }

    let backgroundImage;
    let announceText;

    // Conditionally set the background image based on the passed parameter
    switch (season) {
      case 'spring':
        backgroundImage = Global.springBg;
        announceText = Global.springMsg;
        break;
      case 'summer':
        backgroundImage = Global.summerBg;
        announceText = Global.summerMsg;
        break;
      case 'autumn':
        backgroundImage = Global.autumnBg;
        announceText = Global.autumnMsg;
        break;
    }

    return (
        <TouchableWithoutFeedback onPress={backToMap}>
            <View style={styles.container}>
                <ImageBackground source={backgroundImage} resizeMode="stretch" style={styles.citybg}>
                    <Text style={styles.text}>{announceText}</Text>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    seasonbg: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center", 
        alignItems: "center",
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

export default ChangeSeasonScreen;