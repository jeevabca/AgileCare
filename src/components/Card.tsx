import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { CARDCOLOR } from '../utils/constant';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/DiabieticTypes';
import FastImage from 'react-native-fast-image';

type CardItem = {
    color: string;
    name: string;
    screen: keyof RootStackParamList;
    icon: any
};

const Card = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            padding: 10
        }}>
            {Object.values(CARDCOLOR).map((item: CardItem, index) => (
                <TouchableOpacity onPress={() => navigation.navigate(item.screen)}
                    key={index}
                    style={{
                        width: '31%',
                        aspectRatio: 3 / 4,
                        backgroundColor: item.color,
                        borderRadius: 10,
                        marginBottom: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >

                    <Image
                        source={item.icon}
                        style={{
                            width: 55,
                            height: 55,

                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />

                    <Text style={{
                        color: '#333',
                        fontWeight: 'bold',
                        fontSize: 13,
                        textAlign: 'center',
                        paddingTop: 4
                    }}>
                        {item.name}
                    </Text>

                </TouchableOpacity>
            ))}
        </View>
    );
};

export default Card;
