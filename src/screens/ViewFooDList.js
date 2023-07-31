import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Image, ScrollView, SafeAreaView, FlatList, StyleSheet, Dimensions, Platform, Animated } from 'react-native';
import Styles from '../styles/ViewDetails';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Constants from '../utils/Constants';
import Img from '../assets/images/images11.jpg';
import HeaderStyle from '../styles/Header';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
// import * as Animatable from 'react-native-animatable';
import BgImg from '../assets/images/Pizza.jpg';
import Loader from '../components/Loader';
import { useEffect } from 'react';
import axios from 'react-native-axios';
import GlobalPath from '../utils/GlobalPath';
import ProgressiveImage from '../components/ProgressiveImage';


const HEADER_HEIGHT = 350;



const Item = ({ item, navigation }) => {
    // console.log(GlobalPath.ACTIVITY_IMAGES + item.imagePathDisplay)
    const [showDefault, setShowDefault] = useState(true);
    const [error, setError] = useState(false);

    return (
        <TouchableWithoutFeedback
            style={{ marginTop: 20 }}
            onPress={() => navigation.navigate(Constants.Navigation.FoodDetail, { ID: item.id })}
        >
            <View style={[Styles.cardContainer]}>
                <View style={[Styles.imageWrapper, { paddingHorizontal: 10, paddingTop: 6 }]}>
                    {/* <ProgressiveImage
                        style={{ width: "100%", height: 135, borderRadius: 12, marginTop: 5 }}
                        imagePath={GlobalPath.ACTIVITY_IMAGES + item.imagePathDisplay}
                        resizeMode={'cover'}
                    /> */}
                    <View style={showDefault ? styles.loaderContainer : null}>
                        <Image
                            style={showDefault ? styles.loaderView : { width: "100%", height: 135, borderRadius: 12, marginTop: 5 }}
                            // style={{ width: "100%", height: 135, borderRadius: 12, marginTop: 5 }}
                            // source={{ uri: GlobalPath.ACTIVITY_IMAGES + item.imagePathDisplay }}
                            source={showDefault ?
                                require('../assets/icons/loading.gif')
                                :
                                (error ? require('../assets/icons/error.gif') : { uri: GlobalPath.ACTIVITY_IMAGES + item.imagePathDisplay })}
                            onLoadEnd={() => setShowDefault(false)}
                            onError={() => setError(true)}
                        />
                    </View>
                    <Text style={[Styles.discount, Styles.bold]}>20% off</Text>

                    <View style={Styles.deliveryTime}>
                        <Text style={Styles.deliveryText}> 50 min </Text>
                        {/* <Text style={[Styles.deliveryText, { fontSize: 10 }]} ></Text> */}
                    </View>
                </View>
                <View style={Styles.cardDescription}>
                    <Text style={[Styles.cardTitle, Styles.bold]}> {item.restaurantsName} - {item.placeName} </Text>
                    <Text style={[Styles.cardText, { marginVertical: 1 }]}> {item.name} </Text>
                    <Text style={[Styles.cardText, { paddingTop: 3, paddingBottom: 10, paddingLeft: 5 }]}><Text style={[Styles.bold, { color: "#333" }]}>Rs. {item.deliveryCharger}</Text> Delivery fee</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const ViewFooDList = ({ navigation, route }) => {
    const { categoryFoodID, headerImage } = route.params;

    const scrollY = useRef(new Animated.Value(0)).current;

    const [loading, setLoading] = useState(true);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [selectedRecipeName, setSelectedRecipeName] = useState('');
    const [loadData, setLoadData] = useState([
        {
            id: 1,
            name: "Burger",
            placeName: "McDo Solo",
            imagePathDisplay: "Images/Images_of_food/burger2.jpg",
            restaurantsName: "McDo",
            deliveryCharger: "39.00",
        },
    ]);
    const [noDataFound, setNoDataFound] = useState(false);
    const [headerImg, setHeaderImg] = useState('');

    const GetAllDealsWithCategoryFoodID = (ID) => {
        let url = GlobalPath.API_URL + 'FoodMenu/GetFooDmenuWithCategoryFoodID?ID=' + ID;
        axios.get(url).then(function (response) {
            let msg = response.data.message;

            if (msg === 'Success') {
                let data = response.data.data;
                // console.log(data);
                // alert(JSON.stringify(data))
                setLoadData(data);
                setSelectedRecipeName(data[0].categoryFoodName);
                setHeaderImg(headerImage);
            }
            else {
                setNoDataFound(true);
            }
            setLoading(false);
        }).catch(function (error) {
            console.log(error);
            setLoading(false);
        })
    }

    useEffect(() => {
        // alert(categoryFoodID);
        GetAllDealsWithCategoryFoodID(categoryFoodID);
    }, [])

    function renderHeaderBar() {
        return (
            <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 90,
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingBottom: 10
            }}>

                {/* header bar title */}
                <Animated.View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingBottom: 50,
                    opacity: scrollY.interpolate({
                        inputRange: [HEADER_HEIGHT - 200, HEADER_HEIGHT - 100],
                        outputRange: [0, 1]
                    }),
                    transform: [
                        {
                            translateY: scrollY.interpolate({
                                inputRange: [HEADER_HEIGHT - 200, HEADER_HEIGHT - 100],
                                outputRange: [100, 0],
                                extrapolate: 'clamp'
                            })
                        }
                    ]
                }}>

                </Animated.View>


                {/* Back button */}
                <TouchableOpacity style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 35,
                    width: 35,
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: 'white',
                    backgroundColor: Constants.Colors.lightGray4
                }}
                    onPress={() => navigation.goBack()}>

                    <Feather
                        name="chevron-left"
                        size={24}
                        style={{ color: Constants.Colors.black }}
                    />
                </TouchableOpacity>

                {/* <TouchableOpacity style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 35,
                    width: 35,
                    borderColor: 'red',
                    backgroundColor: 'yellow'
                }}>
                    <Feather
                        name="chevron-left"
                        size={24}
                        style={{ color: Constants.Colors.black }}
                    />
                </TouchableOpacity> */}


            </View>
        )
    }

    function renderRecipeCardHeader() {
        return (
            <View style={{
                marginTop: -1000,
                paddingTop: 1000,
                alignItems: 'center',
                overflow: 'hidden'
            }}>

                {/* background image */}
                <Animated.Image
                    source={require('../assets/images/Pizza.jpg')}
                    // defaultSource={}
                    resizeMode="contain"
                    style={{
                        height: HEADER_HEIGHT,
                        width: '200%',
                        transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                                    outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
                                })
                            },
                            {
                                scale: scrollY.interpolate({
                                    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                                    outputRange: [2, 1, 0.75]
                                })
                            }

                        ]
                    }}
                />
                {/* Recipe Creator Card */}
                <Animated.View style={{
                    position: "absolute",
                    bottom: 25,
                    left: 20,
                    right: 20,
                    height: 65,
                    transform: [
                        {
                            translateY: scrollY.interpolate({
                                inputRange: [0, 170, 250],
                                outputRange: [0, 0, 100],
                                extrapolate: 'clamp'
                            })
                        }
                    ]
                }}>
                    <View style={{
                        flex: 1,
                        borderRadius: 12,
                        backgroundColor: 'rgba(52, 52, 52, 0.8)'
                    }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            alignContent: 'center'
                        }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 24,
                                fontWeight: '700',
                                marginHorizontal: '38%',
                                textAlign: 'center'
                                // marginVertical: '10%'
                            }}> {selectedRecipeName} </Text>
                        </View>
                    </View>
                </Animated.View>

            </View>
        )
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: Constants.Colors.lightGray4,
        }}>
            <Loader loading={loading} />
            <Animated.FlatList
                data={loadData}
                keyExtractor={item => `${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {/* Header */}
                        {renderRecipeCardHeader()}
                    </View>
                }
                scrollEventThrottle={16}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { y: scrollY } } }
                ], { useNativeDriver: true })}
                renderItem={({ item }) => {
                    return (
                        <>
                            {noDataFound ?
                                <View style={styles.noDataFoundContainer}>
                                    <Text style={styles.noDataFoundText}>No Data Found</Text>
                                </View>
                                :
                                <Item item={item} navigation={navigation} />
                            }
                        </>
                    )
                }}
            />
            {/* Header Bar */}
            {renderHeaderBar()}
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: Constants.Colors.lightGray4,
        // backgroundColor: 'yellow',
        marginTop: -20,
        // paddingTop: -20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        zIndex: 10,
        // height: 20
    },
    listContainer: {
        marginTop: 17
    },
    noDataFoundContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Constants.Colors.lightGray4,
        // backgroundColor: 'yellow',
        height: 400,
        // position: '',
        top: 40,

    },
    noDataFoundText: {
        color: 'red',
        fontSize: 17,
        fontWeight: '700',
    },
    loaderContainer: {
        borderRadius: 11,
        backgroundColor: Constants.Colors.lightGray3,
        // backgroundColor: 'red'
    },
    loaderView: {
        width: '33%',
        height: 135,
        // height: 40,
        // marginLeft: 30,
        // marginHorizontal: '45%',
        // marginVertical: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center'
        // resizeMode: 'cover',
        // backgroundColor: 'red'

        // width: "100%", height: 135, borderRadius: 12, marginTop: 5 
    },
});

export default ViewFooDList;