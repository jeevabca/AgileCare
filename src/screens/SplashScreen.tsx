import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { COLOR } from '../utils/constant';
import FastImage from 'react-native-fast-image';

const SplashScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.replace('HomeScreen');
        }, 2000);
        return () => clearTimeout(timeout);
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLOR.WHITE} barStyle="dark-content" />
            <View style={styles.centered}>
                <View style={styles.textWrapper}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.appName}>Aegli</Text>
                        <Text style={{
                            fontSize: 32,
                            fontFamily: 'Boldonse-Regular',
                            color: COLOR.PINK
                        }}>Care +</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.motto}>See Beyond </Text>
                        <Text style={{
                            fontSize: 16,
                            color: COLOR.BLACK,
                            marginTop: 5,
                            fontFamily: 'Anton-Regular'
                        }}>the Symptoms.</Text>
                    </View>
                </View>
                <FastImage
                    source={require('../assets/splash.gif')}
                    style={styles.gif}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </View>
        </SafeAreaView>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textWrapper: {
        alignItems: 'center',

    },
    appName: {
        fontSize: 32,
        color: COLOR.BLACK,
        fontFamily: 'Boldonse-Regular',
    },
    motto: {
        fontSize: 16,
        color: COLOR.PINK,
        marginTop: 5,
        fontFamily: 'Anton-Regular'
    },
    gif: {
        width: 300,
        height: 200,
    },
});
