import React, { useState, useEffect } from 'react';
import { Dimensions, View, Text, TouchableOpacity, Image, SafeAreaView, TextInput, ScrollView, NetInfo, Platform, StyleSheet } from 'react-native';
import Constants from '../../utils/Constants';
import GlobalPath from '../../utils/GlobalPath';
// Styles
import FMS from '../../styles/FoodMenu';
import Swiper from 'react-native-swiper';
import * as Data from '../../data';
import ProgressiveImage from '../ProgressiveImage';
import ProgressiveBanner from '../ProgressiveBanner';
import Banner1 from '../../assets/images/Banner1.png';

const BannerSection = (props) => {

    const RenderBanner = ({ imagePath }) => (
        // <View>
        //     {/* <ProgressiveImage
        //         style={[FMS.restaurantsImage, { marginLeft: 1, marginRight: 1, marginTop: 1, width: 190 }]}
        //         imagePath={GlobalPath.ACTIVITY_IMAGES + props.imagePath}
        //         resizeMode={'cover'}
        //     /> */}
        //     <Image style={FMS.bannerStyle} source={Banner1} />
        // </View>

        <View style={FMS.bannerContainer}>
            <Image style={FMS.bannerStyle} source={Banner1} />
        </View>
    );

    useEffect(() => {
        // alert(JSON.stringify(props.data))
    }, [])

    return (
        <View style={FMS.AddsContainer}>
            <Text style={FMS.HeadingText2}>Your Daily Deals</Text>
            <Swiper
                loop
                autoplay
                showsButtons={false} style={{ height: 80, marginTop: 17 }
                } showsPagination={false} >

                {/* {props.data.map((item, index) => { */}
                {/* // alert(JSON.stringify(item))
                    return ( */}
                <View style={FMS.bannerContainer} >
                    <View 
                    // key={index} 
                    style={{ borderColor: Constants.Colors.themeColor, borderWidth: 1, borderRadius: 8 }}>
                        {/* <ProgressiveBanner
                                style={[FMS.restaurantsImage, { width: '100%' }]}
                                imagePath={GlobalPath.ACTIVITY_IMAGES + item.image}
                                resizeMode={'cover'}
                            /> */}

                        {/* <ProgressiveBanner
                                style={styles.bannerImg}
                                imagePath={GlobalPath.ACTIVITY_IMAGES + item.image}
                                resizeMode={'cover'}
                            /> */}
                        <Image style={FMS.bannerStyle} source={Banner1} />
                    </View>
                </View>
                {/* ) */}
                {/* })} */}
            </Swiper>

            <View style={{ paddingTop: 30, paddingBottom: 10 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {Data.dailyDeals.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} activeOpacity={1} style={FMS.dailyImagesContainer}>
                                {/* <ProgressiveImage
                                    style={FMS.dailyDealsImage}
                                    imagePath={GlobalPath.ACTIVITY_IMAGES + item.image}
                                    resizeMode={'cover'}
                                /> */}
                                <Image style={FMS.dailyDealsImage} source={{ uri: item.cover }} />
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        </View>

    )
}
export default BannerSection;
const styles = StyleSheet.create({
    bannerImg: {
        marginLeft: 1,
        marginRight: 1,
        marginTop: 1,
        width: 190,
        height: 130,
        borderRadius: 7,
        flexGrow: 1
    }
})