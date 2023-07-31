import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Constants from '../../utils/Constants';
import { Badge } from '@rneui/themed';
import Pizza6 from '../../assets/icons/pizza_6_slice.png';
import Fontisto from 'react-native-vector-icons/Fontisto';


const RequiredVaritionHandler = ({ item, isSelected, onPress }) => {
    const [icon, setIcon] = useState('radio-btn-passive');
    // const [isSelected, setIsSelected] = useState()

    // alert('Item: '+ JSON.stringify(item));
    // alert('isSelected: '+ isSelected);
    // alert('Onpress: '+onPress)

    return (
        <TouchableOpacity style={[styles.Container, { borderColor: isSelected? Constants.Colors.themeColor : 'white' }]}
            // onPress={() => setIcon(icon === 'radio-btn-passive' ? 'radio-btn-active' : 'radio-btn-passive')}
            onPress={onPress}
        >
            <View style={styles.CardImageContainer}>
                <Image
                    source={Pizza6}
                    resizeMode='cover'
                    style={{
                        width: 35,
                        height: 35
                    }}
                />
            </View>


            <Text style={{
                flex: 1,
                marginLeft: 10,
                fontWeight: '800',
                color: 'black',
                fontSize: 16
            }}> {item.name} </Text>

            {isSelected ?
                <Fontisto name='radio-btn-active' size={21} style={{
                    width: 25,
                    height: 25,
                    color: Constants.Colors.themeColor
                }} /> :
                <Fontisto name='radio-btn-passive' size={21} style={{
                    width: 25,
                    height: 25,
                    color: Constants.Colors.themeColor
                }} />
            }
        </TouchableOpacity>
    )
}
export default RequiredVaritionHandler;

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        height: 100,
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderRadius: 12,

        marginLeft: 10,
        marginRight: 10
    },
    CardImageContainer: {
        width: 60,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 9,
        borderColor: Constants.Colors.lightGray2
        // borderColor: 'white'
    }
})