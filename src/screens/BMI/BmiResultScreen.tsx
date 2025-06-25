import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { COLOR, CARDCOLOR } from '../../utils/constant';
import LottieView from 'lottie-react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

type BmiRouteParams = {
    params: {
        bmi: number;
    };
};

const BmiResultScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const route = useRoute<RouteProp<BmiRouteParams, 'params'>>();
    let bmi = route?.params?.bmi ?? 0;
    const [result, setResult] = useState('');
    const [showConfetti, setShowConfetti] = useState(true);
    const isUnderweight = result === 'Underweight';
    const isOverweightOrObese = result === 'Overweight' || result === 'Extremely Obese';


    useEffect(() => {
        if (bmi < 18.5) {
            setResult('Underweight');
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            setResult('Normal weight');
        } else if (bmi >= 25 && bmi <= 29.9) {
            setResult('Overweight');
        } else if (bmi >= 30) {
            setResult('Extremely Obese');
        } else {
            setResult('Invalid BMI');
        }

        if (showConfetti) {
            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [bmi, showConfetti]);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <View >
                    <Text style={styles.heading}>Body Mass Index</Text>
                    <Text style={styles.bmiText}>{bmi.toFixed(2)}</Text>

                    <View style={{ marginTop: 10 }}>
                        {result === 'Underweight' && (

                            <View>
                                <Image
                                    source={require('../../assets/BMI/UnderWeightBar.png')}
                                    style={styles.bar}
                                    resizeMode="contain"
                                />

                                <Image
                                    source={require('../../assets/BMI/UnderWeight.png')}
                                    style={styles.image}
                                    resizeMode="contain"
                                />
                            </View>
                        )}
                        {result === 'Normal weight' && (
                            <View >

                                <Image
                                    source={require('../../assets/BMI/NormalBar.png')}
                                    style={styles.bar}
                                    resizeMode="contain"
                                />

                                <Image
                                    source={require('../../assets/BMI/Normal_Weight.png')}
                                    style={styles.image}
                                    resizeMode="contain"
                                /></View>
                        )}
                        {result === 'Overweight' && (
                            <View>
                                <Image
                                    source={require('../../assets/BMI/OverWeightBar.png')}
                                    style={styles.bar}
                                    resizeMode="contain"
                                />

                                <Image
                                    source={require('../../assets/BMI/OverWeight.png')}
                                    style={styles.image}
                                    resizeMode="contain"
                                />
                            </View>
                        )}
                        {result === 'Extremely Obese' && (
                            <View>
                                <Image
                                    source={require('../../assets/BMI/ObeseBar.png')}
                                    style={styles.bar}
                                    resizeMode="contain"
                                />
                                <Image
                                    source={require('../../assets/BMI/Extermely_obese.png')}
                                    style={styles.image}
                                    resizeMode="contain"
                                />
                            </View>
                        )}
                    </View>

                    <View style={styles.tipsBox}>
                        {isOverweightOrObese ? (
                            <>
                                <View style={styles.tipRow}>
                                    <FontAwesome6 name="glass-water" size={24} color="black" />
                                    <Text style={styles.tipText}>Drink water a half hour before meals</Text>
                                </View>
                                <View style={styles.divider} />

                                <View style={styles.tipRow}>
                                    <FontAwesome6 name="bowl-food" size={24} color="black" />
                                    <Text style={styles.tipText}>Eat only two meals per day and make sure that they contain high protein</Text>
                                </View>
                                <View style={styles.divider} />

                                <View style={styles.tipRow}>
                                    <FontAwesome5 name="coffee" size={24} color="black" />
                                    <Text style={styles.tipText}>Drink coffee or tea and avoid sugary food</Text>
                                </View>
                            </>
                        ) : (
                            <>
                                <View style={styles.tipRow}>
                                    <FontAwesome6 name={isUnderweight ? "glass-water" : "person-running"} size={24} color="black" />
                                    <Text style={styles.tipText}>
                                        {isUnderweight ? "Do not drink water before meals" : "Stay Active"}
                                    </Text>
                                </View>
                                <View style={styles.divider} />

                                <View style={styles.tipRow}>
                                    <FontAwesome6 name="bowl-food" size={24} color="black" />
                                    <Text style={styles.tipText}>
                                        {isUnderweight ? "Use bigger plates" : "Choose the right foods and cook by yourself"}
                                    </Text>
                                </View>
                                <View style={styles.divider} />

                                <View style={styles.tipRow}>
                                    <FontAwesome6 name="bed-pulse" size={24} color="black" />
                                    <Text style={styles.tipText}>
                                        {isUnderweight ? "Get quality sleep" : "Focus on relaxation and sleep"}
                                    </Text>
                                </View>
                            </>
                        )}
                    </View>



                </View>


                <View style={styles.bottomButtons}>
                    <TouchableOpacity
                        style={[styles.button, { marginLeft: 20 }]}
                        onPress={() => navigation.pop()}
                    >
                        <Text style={styles.buttonText}>Re-Calculate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { marginRight: 20 }]} onPress={() => navigation.navigate('BmiChartScreen')}>
                        <Text style={styles.buttonText}>View Chart</Text>
                    </TouchableOpacity>
                </View>

                {(showConfetti && result === 'Normal weight') && (
                    <LottieView
                        source={require('../../assets/confettie.json')}
                        style={StyleSheet.absoluteFill}
                        autoPlay
                        loop={false}
                        onAnimationFinish={() => setShowConfetti(false)}
                        resizeMode="cover"
                    />
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default BmiResultScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
    },
    heading: {
        color: 'black',
        fontWeight: '700',
        fontSize: 22,
        textAlign: 'center',
        marginTop: 14,
    },
    bmiText: {
        color: 'black',
        fontWeight: '400',
        fontSize: 22,
        textAlign: 'center',
        marginTop: 14,
    },
    image: {
        width: '85%',
        height: 250,
        alignSelf: 'center',
        marginBottom: 20,
    },
    bar: {
        width: '85%',
        height: 50,
        alignSelf: 'center',


    },
    tipsBox: {
        backgroundColor: '#fff6ed',
        margin: 10,
        padding: 20,
        marginLeft: 20,
        marginRight: 20
    },
    tipText: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 10,
        padding: 10,
        marginLeft: 5
    },
    divider: {
        height: 2,
        backgroundColor: '#ffb172',
        marginTop: 2,
    },
    bottomButtons: {
        position: 'absolute',
        // bottom: 20,
        left: 0,
        right: 0,
        marginTop: 720,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        padding: 20,
        backgroundColor: '#ffb172',
        borderRadius: 15,
        width: '40%',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
    },
    tipRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,

    },
});
