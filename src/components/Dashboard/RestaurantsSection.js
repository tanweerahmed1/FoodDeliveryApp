import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import FMS from '../../styles/FoodMenu';
import ProgressiveImage from '../ProgressiveImage';

const RestaurantsSection = (props) => {

    const [image, setImage] = useState("https://images.deliveryhero.io/image/fd-ph/LH/hyii-listing.jpg?width=400&height=292");
    return (
        <View style={FMS.AddsContainer}>
            <Text style={FMS.HeadingText2}> Your Restaurants </Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingTop: 6 }}>
                {props.restaurants.map((item, index) => {
                    // alert(JSON.stringify(item))
                    return (
                        <TouchableOpacity key={index} activeOpacity={1} style={[FMS.popularContainer, { padding: 1, paddingBottom: 10 }]}>
                            <View>
                                <View style={{ flex: 1, alignItems: 'stretch' }}>
                                    <Text style={FMS.userStyle}>{item.dealsName}</Text>
                                    {/* <ProgressiveImage /> */}
                                    <Image style={FMS.restaurantsImage} source={{ uri: image }} />
                                    <Text style={FMS.textDeliveryTime}>{item.dealsDeliveryTime} mint</Text>
                                </View>

                                <Text style={[FMS.titleYourRestaurants, { fontSize: 14, marginLeft: 10, paddingTop: 7, fontWeight: '600' }]}>{item.restaurantName}</Text>
                                <Text style={[FMS.descriptionYourResta, { marginLeft: 10, marginTop: -5, fontWeight: '600', fontSize: 14 }]}>{item.description}</Text>
                                <Text style={[FMS.deliveryFeeYourResta, { marginLeft: 6, marginTop: -5,  fontSize: 13, fontWeight: '500' }]}> PKR {item.itemPrice} delivery { item.deliveryFree } </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    )
}
export default RestaurantsSection;