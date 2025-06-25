import {
    Alert, SafeAreaView, Text, TouchableOpacity, View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback,
    Platform,
} from 'react-native'
import React, { useRef, useState } from 'react'
import Header from '../../components/Header'
import { Picker } from '@react-native-picker/picker';
import { CARDCOLOR, COLOR } from '../../utils/constant'
import { TextInput } from 'react-native-gesture-handler'

const BmiScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [selectedValue, setSelectedValue] = useState('feet');
    const [weightUnit, setWeightUnit] = useState('kg');
    const [age, setAge] = useState<string>('')
    const [height, setHeight] = useState<string>('')
    const [inch, setInch] = useState<string>('')
    const [weight, setWeight] = useState<string>('')


    const ageRef = useRef<TextInput>(null);
    const heightRef = useRef<TextInput>(null);
    const inchRef = useRef<TextInput>(null);
    const weightRef = useRef<TextInput>(null);


    const focusInput = () => {

        console.log('Datas:', age, height, inch, weight);
        ageRef.current?.focus();
        heightRef.current?.focus();
        inchRef.current?.focus();
        weightRef.current?.focus();

    };

    const calculateBMI = () => {
        focusInput();
        let heightInMeters = 0;
        let weightInKg = 0;

        // Convert height
        if (selectedValue === 'feet') {
            const h = parseFloat(height) || 0;
            const i = parseFloat(inch) || 0;
            const totalInches = h * 12 + i;
            heightInMeters = totalInches * 0.0254; // inch to meters
        } else {
            const cm = parseFloat(height) || 0;
            heightInMeters = cm / 100;
        }

        // Convert weight
        const w = parseFloat(weight) || 0;
        if (weightUnit === 'kg') {
            weightInKg = w;
        } else {
            weightInKg = w * 0.453592; // lbs to kg
        }

        // Calculate BMI
        if (heightInMeters > 0 && weightInKg > 0) {
            const bmi = weightInKg / (heightInMeters * heightInMeters);

            navigation.navigate('BmiResultScreen', { bmi });

            // navigation.navigate('BmiResultScreen', { bmi })
        } else {
            Alert.alert(('Please enter valid height and weight.'));
        }
    };



    return (
        <SafeAreaView style={{ backgroundColor: COLOR.WHITE, flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >

                <View style={{ flex: 1 }}>
                    <Header title={'Body Mass Index'} color={CARDCOLOR.SECOND.color} />

                    <View style={{
                        padding: 20, alignItems: 'center',

                    }}>
                        <View style={{ width: '100%' }}>
                            <Text style={{ fontSize: 16, marginBottom: 5, marginLeft: 5, color: '#333', fontWeight: '500' }}>Age</Text>
                            <TextInput
                                ref={ageRef}
                                placeholder={'Enter Age'}
                                placeholderTextColor={COLOR.PLACEHOLDER}
                                keyboardType="phone-pad"
                                style={{
                                    width: '100%',
                                    backgroundColor: '#fff6ed',
                                    padding: 12,
                                    borderRadius: 8,
                                    marginBottom: 10,
                                    fontSize: 16,
                                    color: 'black',
                                    height: 60,
                                    marginTop: 5,
                                }}
                                value={age}
                                onChangeText={(e) => setAge(e)}
                            />
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={{ fontSize: 16, marginBottom: 5, marginLeft: 5, color: '#333', fontWeight: '500' }}>Height</Text>
                                {selectedValue === "feet" && (
                                    <Text style={{ fontSize: 16, marginBottom: 5, marginLeft: 5, color: '#333', fontWeight: '500', paddingLeft: 80 }}>Inch</Text>)}
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 10,
                            }}>
                                <TextInput
                                    ref={heightRef}
                                    placeholder={selectedValue === 'feet' ? "feet" : 'Enter Height'}
                                    placeholderTextColor={COLOR.PLACEHOLDER}
                                    keyboardType="phone-pad"
                                    style={{
                                        width: selectedValue === "cm" ? "62%" : '30%',
                                        backgroundColor: '#fff6ed',
                                        padding: 12,
                                        borderRadius: 8,
                                        fontSize: 16,
                                        color: 'black',
                                        height: 60,
                                        marginTop: 5,
                                    }}
                                    value={height}
                                    onChangeText={(e) => setHeight(e)}
                                />

                                {selectedValue === 'feet' && (
                                    <TextInput
                                        ref={inchRef}
                                        placeholder={'Inch'}
                                        placeholderTextColor={COLOR.PLACEHOLDER}
                                        keyboardType="phone-pad"
                                        style={{
                                            width: '30%',
                                            backgroundColor: '#fff6ed',
                                            padding: 12,
                                            borderRadius: 8,
                                            fontSize: 16,
                                            color: 'black',
                                            height: 60,
                                            marginTop: 5,
                                        }}
                                        value={inch}
                                        onChangeText={(e) => setInch(e)}

                                    />
                                )}
                                <Picker
                                    selectedValue={selectedValue}
                                    onValueChange={(itemValue) => {
                                        setSelectedValue(itemValue);
                                        if (itemValue === 'cm') {
                                            setInch('');
                                        } else {
                                            setHeight('');
                                        }
                                    }
                                    }
                                    style={{
                                        width: '35%',
                                        backgroundColor: '#fff6ed',
                                        height: 60
                                    }}
                                >
                                    <Picker.Item label="Feet" value="feet" />
                                    <Picker.Item label="Cm" value="cm" />
                                </Picker>
                            </View>


                            <Text style={{ fontSize: 16, marginBottom: 5, marginLeft: 5, color: '#333', fontWeight: '500', marginTop: 5 }}>Weight</Text>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 10,

                            }}>
                                <TextInput
                                    ref={weightRef}
                                    placeholder={'Enter Weight'}
                                    placeholderTextColor={COLOR.PLACEHOLDER}
                                    keyboardType="phone-pad"
                                    style={{
                                        width: '62%',
                                        backgroundColor: '#fff6ed',
                                        padding: 12,
                                        borderRadius: 8,
                                        marginTop: 5,
                                        fontSize: 16,
                                        color: 'black',
                                        height: 60
                                    }}
                                    value={weight}
                                    onChangeText={(e) => setWeight(e)}
                                />

                                <Picker
                                    selectedValue={selectedValue}
                                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
                                    style={{
                                        width: '35%',
                                        backgroundColor: '#fff6ed',
                                        height: 60,

                                    }}
                                >
                                    <Picker.Item label="Kg" value="kg" />
                                    <Picker.Item label="Lbs" value="lbs" />
                                </Picker>

                            </View>

                            <TouchableOpacity
                                onPress={calculateBMI}
                                style={{
                                    backgroundColor: CARDCOLOR.SECOND.color,
                                    width: '100%',
                                    padding: 20,
                                    alignItems: 'center',
                                    borderRadius: 15,
                                    marginTop: 20
                                }}>
                                <Text style={{ color: COLOR.BLACK, fontSize: 16, fontWeight: '800' }}>Calculate</Text>
                            </TouchableOpacity>


                        </View>

                    </View>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}

export default BmiScreen

