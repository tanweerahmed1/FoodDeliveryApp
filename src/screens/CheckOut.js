import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, SafeAreaView, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Styles from '../styles/SingleChoice';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Constants from '../utils/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapImg from '../assets/images/Google-Maps.jpg';
import Header from '../components/Header';

const CheckOut = ({ navigation }) => {
    return (
        <>
            {/* <Header /> */}
            <Header
                containerStyle={{
                    height: 50,
                    paddingHorizontal: 10,
                    marginTop: 10,
                    alignItems: 'center',
                    // backgroundColor: 'red'
                }}
                title={'CHECK OUT'}
                leftComponent={
                    <TouchableOpacity
                        style={{
                            width: 40,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: Constants.Colors.themeColor,
                            borderRadius: 12,
                        }}
                        onPress={() => navigation.goBack()}>
                        <Feather
                            name="chevron-left"
                            size={24}
                            style={{ color: Constants.Colors.black }}
                        />
                    </TouchableOpacity>
                }
            />
            <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Entypo
                        name="location"
                        size={21}
                        style={{ color: Constants.Colors.themeColor }}
                    />
                    <Text style={{ fontSize: 17, color: 'black', fontWeight: '700', marginLeft: 7 }}>Delivery Address</Text>
                </View>

                <View style={[styles.deliveryAddressView, styles.shadow]}>
                    <Image 
                        source={MapImg}
                        style={{ height: 217, width: 373, marginLeft: -12 }}
                        resizeMode='cover'    
                    />
                    {/* <TouchableOpacity
                        activeOpacity={1}
                        style={styles.rightEdit}
                    >
                        <MaterialIcons
                            name="edit"
                            size={27}
                            style={{ color: Constants.Colors.themeColor }}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text>Map here</Text>
                    </View> */}
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Entypo
                        name="wallet"
                        size={22}
                        style={{ color: Constants.Colors.themeColor }}
                    />
                    <Text style={{ fontSize: 15, color: 'black', fontWeight: '700', marginLeft: 7 }}>Payment Method</Text>
                </View>

                <View style={[styles.shadow, styles.paymentMethod]}>
                    <View style={{ flexDirection: 'row' }}>
                        <FontAwesome
                            name="money"
                            size={20}
                            style={{ color: Constants.Colors.themeColor }}
                        />
                        <Text style={{ marginLeft: 8, fontSize: 14, fontWeight: '600', color: 'black' }}>Cash</Text>

                    </View>
                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: 'black', marginRight: 10 }}>Rs. 43.66</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Ionicons
                        name="newspaper"
                        size={20}
                        style={{ color: Constants.Colors.themeColor }}
                    />
                    <Text style={{ fontSize: 16, color: 'black', fontWeight: '700', marginLeft: 7 }}>Order Summary</Text>
                </View>

                <View style={[styles.shadow, styles.orderSummery]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text style={{ marginLeft: 8, fontSize: 14, fontWeight: '400', color: 'black', left: 0 }}>Pizza</Text>
                        <Text style={{ marginLeft: 8, fontSize: 14, fontWeight: '400', color: 'black', right: 0 }}>Rs. 1,100.00</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={{ marginLeft: 8, fontSize: 14, fontWeight: '500', left: 0 }}>Subtotal</Text>
                        <Text style={{ marginLeft: 8, fontSize: 14, fontWeight: '500', right: 0 }}>Rs. 1,100.00</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <Text style={{ marginLeft: 8, fontSize: 14, fontWeight: '500', left: 0 }}>Delivey Fee</Text>
                        <Text style={{ marginLeft: 8, fontSize: 14, fontWeight: '500', right: 0 }}>35.00</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 10 }}>
                        <Text style={{ marginLeft: 8, fontSize: 14, fontWeight: '500', left: 0 }}>Platform Fee</Text>
                        <Text style={{ marginLeft: 8, fontSize: 14, fontWeight: '500', right: 0 }}>4.99</Text>
                    </View>
                </View>
            </View>


            <View style={styles.footerContainer}>
                <View style={{
                    left: 0,
                    right: 0,
                    // height: 210,
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                }}>
                    {/* <View style={style.lineDivider} /> */}

                    <View style={{ flexDirection: 'row',  }}>
                        <Text style={{ flex: 1, fontSize: 17, color: 'black', fontWeight: '800' }}> Total:</Text>
                        <Text style={{ fontSize: 17, color: 'black' }}>Rs. 350.00 </Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.orderButton, { backgroundColor: Constants.Colors.themeColor }]}
                        // onPress={() => navigation.navigate(Constants.Navigation.MapScreen)}
                        onPress={() => alert('Process')}
                        >
                        <Text style={{ fontWeight: '800', fontSize: 16, color: 'black' }}>Order Now</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </>
    )
}
export default CheckOut;

const styles = StyleSheet.create({
    deliveryAddressView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: Constants.Colors.lightGray2,
        backgroundColor: 'white',
        height: 220,
    },
    rightEdit: {
        position: 'absolute',
        right: 4,
        top: 5,
        padding: 10,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: Constants.Colors.lightGray2,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        height: 60
    },
    orderSummery: {
        // alignItems: 'center',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: Constants.Colors.lightGray2,
        backgroundColor: 'white',
    },
    footerContainer: {
        position: 'absolute',
        width: '98%',
        backgroundColor: 'white',
        bottom: 0,
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginLeft: 5,
        marginRight: 5,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    orderButton: {
        height: 50,
        marginTop: 6,
        borderRadius: 12,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }

})