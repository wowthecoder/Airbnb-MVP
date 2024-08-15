import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IntroScreen from './src/screens/IntroScreen';
import MenuScreen from './src/screens/MenuScreen';
import MainMapScreen from './src/screens/MainMapScreen';
import VideoScreen from './src/screens/VideoScreen';
import GraphScreen from './src/screens/GraphScreen';
import HintsScreen from './src/screens/HintsScreen';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'whitesmoke' } }}>
          <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MainMap" component={MainMapScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Video" component={VideoScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Graph" component={GraphScreen} options={{ headerShown: false }} />  
          <Stack.Screen name="Hints" component={HintsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <Navigator />
      <StatusBar style="auto" hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
