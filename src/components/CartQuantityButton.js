import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Constants from '../utils/Constants';
import { Badge } from '@rneui/themed';

const CartQuantityButton = ({ containerStyle, iconStyle, quantity, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 12,
                backgroundColor: '#fb963c',
                ...containerStyle
            }}
            onPress={onPress}
        >
            <Feather
                name="shopping-bag"
                size={23}
                style={{ color: Constants.Colors.black }}
            />
            {/* <Badge
                // status=""
                value={quantity}
                containerStyle={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    height: 16,
                    width: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                    backgroundColor: 'yellow'
                }}
            /> */}

            <View style={{
                position: 'absolute',
                top: 5,
                right: 5,
                height: 16,
                width: 16,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 12,
                backgroundColor: 'yellow'
            }}>
                <Text
                    style={{
                        // color: 'white',
                        color: 'red',
                        // lineHeight: 3,
                        fontSize: 10,
                        fontWeight: '600'
                    }}> {quantity} </Text>

            </View>

        </TouchableOpacity>
    )
}
export default CartQuantityButton;