import { StyleSheet, View, Text, ImageBackground } from "react-native";
import Global from '../global';

const MenuScreen = () => {  
  return (
    <View style={styles.container}> 
        <ImageBackground source={Global.cityBannerImg} resizeMode="stretch" style={styles.image}>
            
        </ImageBackground>
    </View>
  );
}

styles = StyleSheet.create({ 
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000a0"
    }
});

export default MenuScreen;