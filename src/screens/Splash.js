import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Logo from '../assets/images/Splash_food_panda_logo.png';
import Logo1 from '../assets/icons/Logo.png';
import Constants from '../utils/Constants';

function Splash() {
    return (
        <View style={style.container}>
            <Image style={style.logo} source={Logo1} />
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: Constants.Colors.DardTheme,
        backgroundColor: Constants.Colors.white,
        height: '100%',
        width: '100%'
    },
    logo: {
        resizeMode: 'contain',
        // width:  Dimensions.get('window').width - 50,
        width: 150
        // height: Dimensions.get('window').height
    }
})
export default Splash;