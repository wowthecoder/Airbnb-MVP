import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Global from '../global';
import data from '../database.json';

const InsuranceOptionsScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ImageBackground source={Global.cityPropertiesImg} resizeMode="stretch" style={styles.citybg}>
                <View style={styles.header}>
                    <View style={styles.amountBox}>
                        <Text style={styles.amount}>Jan</Text>
                        <Image source={Global.winterIcon} style={styles.seasonIcon}/>
                        <Text style={styles.amount}>£200,000</Text>
                    </View>
                    <TouchableHighlight style={styles.graphButton} underlayColor='green'>
                        <Image source={Global.graphIcon} style={styles.graphIcon} />
                    </TouchableHighlight>
                </View>
                <View style={styles.body}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>You have bought a property!</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

export default InsuranceOptionsScreen;