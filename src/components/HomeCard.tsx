import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR } from '../utils/constant'

const HomeCard = () => {
    return (
        <View style={{
            flexDirection: 'row', backgroundColor: COLOR.INPUT_FIELD, margin: 10, borderRadius: 15, elevation: 10, padding: 5,
            alignItems: 'center',
        }}>
            <Image
                source={require('../assets/HomeImage.png')}
                resizeMode="contain"
                style={{
                    width: 100,
                    height: 100,
                }}
            />
            <View style={{ margin: 20, flex: 1 }}>
                <Text style={{ fontFamily: 'Boldonse-Regular', color: COLOR.BLACK, }}>Health Calculator</Text>
                <Text style={{ flexWrap: 'wrap', color: 'grey' }}>Stay Fit & Calculate With Your Favorite Health
                    Tool Accurately & Easily</Text>
            </View>
        </View>
    )
}

export default HomeCard

