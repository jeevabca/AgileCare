import { Image, StatusBar, Text, TouchableOpacity, View, Platform } from 'react-native';
import React from 'react';
import { COLOR } from '../utils/constant';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
type HeaderProps = {
    title: string;
};

const Header = ({ title }: HeaderProps) => {
    const navigation = useNavigation();
    return (
        <View
            style={{
                backgroundColor: COLOR.HEADER,
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
                paddingBottom: 15,
                paddingHorizontal: 15,
                borderBottomEndRadius: 30,
                borderBottomStartRadius: 30,
                elevation: 10,
            }}
        >
            <StatusBar backgroundColor={COLOR.HEADER} barStyle="dark-content" />
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity style={{ paddingRight: 30 }} onPress={() => navigation.goBack()}>
                    <MaterialIcons name='arrow-back-ios-new' size={24} color={'black'} />
                </TouchableOpacity>
                <Image
                    source={require('../assets/doc.jpg')}
                    resizeMode="contain"
                    style={{
                        width: 40,
                        height: 40,
                        marginRight: 10,
                        borderRadius: 20,
                    }}
                />
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
        </View>
    );
};

export default Header;
