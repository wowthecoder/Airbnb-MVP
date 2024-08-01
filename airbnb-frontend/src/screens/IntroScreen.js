import { StyleSheet, View, ImageBackground } from "react-native";

const IntroScreen = () => {  
  return (
    <View>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <Text style={styles.text}>Inside</Text>
        </ImageBackground>
    </View>
  );
}

export default IntroScreen;