import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Header from '../components/Header';
import { CARDCOLOR, COLOR } from '../utils/constant';
import { diabieticAPICALL } from '../services/httpservices';
import { DiabieticData } from '../types/DiabieticTypes';
import FastImage from 'react-native-fast-image';

const DiabietsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [diabietic, setDiabietic] = useState<DiabieticData>({
        pregnancies: "",
        Glucose: "",
        BloodPressure: "",
        SkinThickness: "",
        Insulin: "",
        BMI: "",
        DiabetesPedigreeFunction: "",
        Age: ""
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof DiabieticData, string>>>({});
    const validateFields = (): boolean => {
        const newErrors: Partial<Record<keyof DiabieticData, string>> = {};

        Object.entries(diabietic).forEach(([key, value]) => {
            if (value === '' || isNaN(Number(value))) {
                newErrors[key as keyof DiabieticData] = 'Please enter a valid number';
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };




    const diabeticCall = async () => {
        try {
            setLoading(true);

            const payload = {
                pregnancies: Number(diabietic.pregnancies),
                Glucose: Number(diabietic.Glucose),
                BloodPressure: Number(diabietic.BloodPressure),
                SkinThickness: Number(diabietic.SkinThickness),
                Insulin: Number(diabietic.Insulin),
                BMI: parseFloat(diabietic.BMI),
                DiabetesPedigreeFunction: parseFloat(diabietic.DiabetesPedigreeFunction),
                Age: Number(diabietic.Age),
            };

            const startTime = Date.now();
            const res = await diabieticAPICALL(payload);
            console.log(JSON.stringify(res));

            // Ensure loader stays visible for at least 3 seconds
            const elapsed = Date.now() - startTime;
            const remainingTime = 3000 - elapsed;

            setTimeout(() => {
                setLoading(false);
                navigation.navigate('DiabietsResultScreen', { res });
            }, remainingTime > 0 ? remainingTime : 0);

        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleTest = () => {
        if (!validateFields()) return;
        diabeticCall();

    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header title={'Diabetes prediction'} color={CARDCOLOR.FIRST.color} />
            <ScrollView contentContainerStyle={{ padding: 20, alignItems: 'center' }} showsVerticalScrollIndicator={false}>
                <View style={{ width: '100%', alignItems: 'flex-start' }}>
                    {[
                        { label: 'Pregnancies', key: 'pregnancies' },
                        { label: 'Glucose', key: 'Glucose' },
                        { label: 'Blood Pressure', key: 'BloodPressure' },
                        { label: 'Skin Thickness', key: 'SkinThickness' },
                        { label: 'Insulin', key: 'Insulin' },
                        { label: 'BMI', key: 'BMI' },
                        { label: 'Diabetes Pedigree Function', key: 'DiabetesPedigreeFunction' },
                        { label: 'Age', key: 'Age' },
                    ].map((item) => (
                        <React.Fragment key={item.key}>
                            <Text style={{ fontSize: 16, marginBottom: 5, marginLeft: 5, color: '#333', fontWeight: '500' }}>{item.label}</Text>
                            <TextInput
                                placeholder={`Enter ${item.label.toLowerCase()}`}
                                placeholderTextColor={COLOR.PLACEHOLDER}
                                keyboardType="number-pad"
                                style={{
                                    width: '100%',
                                    backgroundColor: COLOR.INPUT_FIELD,
                                    padding: 12,
                                    borderRadius: 8,
                                    marginBottom: 10,
                                    fontSize: 16,
                                    color: 'black'
                                }}

                                value={String(diabietic[item.key as keyof DiabieticData] ?? 0)}
                                onChangeText={(text) => {
                                    setDiabietic({ ...diabietic, [item.key]: text });
                                    if (text !== '' && !isNaN(Number(text))) {
                                        setErrors(prev => ({ ...prev, [item.key]: '' }));
                                    }
                                }}
                            />
                            {errors[item.key as keyof DiabieticData] && (
                                <Text style={{ color: 'red', marginBottom: 10, marginTop: -10, marginLeft: 10 }}>
                                    {errors[item.key as keyof DiabieticData]}
                                </Text>
                            )}
                        </React.Fragment>
                    ))}
                </View>
                {loading && (
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(255, 255, 255, 0.6)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 10,
                        }}
                    >
                        <FastImage
                            source={require('../assets/loader.gif')}
                            style={{ width: 150, height: 150 }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>
                )}

                <TouchableOpacity
                    disabled={loading}
                    style={{
                        backgroundColor: loading ? '#ccc' : COLOR.HEADER,
                        width: '100%',
                        padding: 20,
                        alignItems: 'center',
                        borderRadius: 15
                    }}
                    onPress={handleTest}
                >
                    <Text style={{ color: COLOR.BLACK, fontSize: 16, fontWeight: '800' }}>Test</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DiabietsScreen;
