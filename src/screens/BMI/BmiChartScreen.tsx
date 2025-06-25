import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Chart from '../../components/Chart';
import { CHART } from '../../utils/constant';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BmiChartScreen = ({ navigation }: { navigation: any }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center', height: 60 }}>
                <TouchableOpacity
                    style={{ position: 'absolute', left: 20, top: 18 }}
                    onPress={() => navigation.pop()}
                >
                    <MaterialIcons name="arrow-back-ios-new" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{
                    color: 'black',
                    fontWeight: '700',
                    fontSize: 22,
                }}>
                    View Chart
                </Text>
            </View>

            <Chart data={CHART} />
        </SafeAreaView>
    );
};

export default BmiChartScreen;
