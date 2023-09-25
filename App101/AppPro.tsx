import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  Linking
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

function AppPro(): JSX.Element {                        // Return Speicification using typescript
  
    const isDarkMode = useColorScheme() === 'dark';       // OS color mode check
    console.log(isDarkMode)
    return (
        <View style={styles.container}>
            <Text style={isDarkMode ? styles.whiteText: styles.darkText}>
                What is Life!
            </Text>
            <Text style={{color: 'red'}}>
                This App is Way too basic. Just a milestone for reaching the Installation Properly.
            </Text>
            <Text style={{color: 'blue'}} 
                onPress={() => Linking.openURL('https://tanvirahmedkhan.hashnode.dev/react-native-cli-installation-guide-for-linux-ubuntu2204')}>
                React Native CLi Instrallation Blog
            </Text>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center' 
    },
    whiteText: {
        color: '#FFFFFF',
        backgroundColor: '#000000'
    },
    darkText: {
        color: '#000000',
        backgroundColor: '#FFFFFF'
    }
});

export default AppPro
