// For both the introduction and debriefing video
import React, { useState } from 'react'; 
import { StyleSheet, View, TouchableHighlight, Text, ActivityIndicator } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
// import * as ScreenOrientation from "expo-screen-orientation";
import Global from '../global';

const VideoScreen = () => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    const goNextScreen = () => {  
        navigation.navigate(nextScreen);
    }

    // const onFullscreenUpdate = async ({ fullscreenUpdate }) => {
    //     switch (fullscreenUpdate) {
    //       case 0 || 1:
    //         await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    //         break;
    //       case 2 || 3:
    //         await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT); // only on Android required
    //         break;
    //     }
    // };

    return (
        <View style={styles.container}>
            {isLoading && (
                <ActivityIndicator
                style={styles.loadingIndicator}
                size="large"
                color="#0000ff"
                />
            )}
            <Video
                ref={video}
                style={styles.video}
                source={{ uri: Global.testVideoSource }}
                usePoster
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onLoadStart={() => setIsLoading(true)}
                onLoad={() => setIsLoading(false)}
                onPlaybackStatusUpdate={status => setStatus(() => status)}
                // onFullscreenUpdate={onFullscreenUpdate}
            />
            <TouchableHighlight 
                style={styles.button}
                underlayColor='green'
                onPress={goNextScreen}
            >
                <Text style={styles.buttonText}>Next</Text>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    video: {
        width: '100%',
        height: '50%',
    },
    button: {
        marginTop: '15%',
        width: '50%',
        backgroundColor: '#3d62fa',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
    },
    loadingIndicator: {
        position: 'absolute',
    },
});

export default VideoScreen;