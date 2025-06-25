import { Text, View } from 'react-native';
import React from 'react';

const Chart = ({ data }: { data: any[] }) => {
    return (
        <View style={{ padding: 20 }}>
            {data.map((item, index) => (
                <View key={index} style={{ marginBottom: 15 }}>
                    <View style={{
                        backgroundColor: '#ffb172',
                        padding: 15,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
                    }}>
                        <Text style={{ fontWeight: '700', fontSize: 14 }}>
                            Age Group: {item.AGEGROUP}
                        </Text>
                    </View>
                    <View style={{
                        backgroundColor: '#ffdab9',
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        padding: 20,
                        height: 170
                    }}>
                        <Text style={{ fontWeight: '600', fontSize: 12, padding: 5, color: 'black' }}>
                            • Recommended Body Mass Index:                    {item.RECOMBMI}
                        </Text>

                        <Text style={{ fontWeight: '600', fontSize: 12, padding: 5, color: 'black' }}>
                            • Overweight Body Mass Index:                                {item.OVERWEIGHT}
                        </Text>
                        <Text style={{ fontWeight: '600', fontSize: 12, padding: 5, color: 'black' }}>
                            • Obese Body Mass Index:                                        {item.OBESE}
                        </Text>
                        <Text style={{ fontWeight: '600', fontSize: 12, padding: 5, color: 'black' }}>
                            • Extremely Obese Body Mass Index:                      {item.EXTREMOBESE}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

export default Chart;
