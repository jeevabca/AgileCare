import { Image, StatusBar, Text, View } from 'react-native';
import React from 'react';
import { COLOR } from '../utils/constant';

type HeaderProps = {
    title: string;
};

const Homeheader = ({ title }: HeaderProps) => {
    return (
        <View
            style={{
                alignItems: 'center',
                backgroundColor: COLOR.WHITE,
                paddingVertical: 15,

            }}
        >
            <StatusBar backgroundColor={COLOR.WHITE} barStyle="dark-content" />

            <Text
                style={{
                    fontSize: 18,
                    fontFamily: 'Boldonse-Regular',
                    color: COLOR.BLACK,
                }}
            >
                {title}
            </Text>

        </View>
    );
};

export default Homeheader;
