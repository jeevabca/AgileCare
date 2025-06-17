import { SafeAreaView, Text, View } from 'react-native'
import React from 'react'
import Homeheader from '../components/Homeheader'
import HomeCard from '../components/HomeCard'
import { COLOR } from '../utils/constant'
import Card from '../components/Card'


const HomeScreen = () => {
    return (
        <SafeAreaView style={{ backgroundColor: COLOR.WHITE, flex: 1 }}>
            <Homeheader title={'Home'} />
            <HomeCard />
            <View style={{ margin: 10 }}>
                <Card />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

