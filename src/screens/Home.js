import React, { useState, useEffect } from 'react';
import { Dimensions, View, Text, TouchableOpacity, Image, SafeAreaView, TextInput, ScrollView, NetInfo, Platform, FlatList } from 'react-native';
import Constants from '../utils/Constants';
// Styles
import Styles from '../styles/Home';
import HeaderStyle from '../styles/Header';
import FMS from '../styles/FoodMenu';
// Icons
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Hamburger_Icon from '../assets/icons/hamburger.png';

import Banner1 from '../assets/images/Banner1.png';
import Banner2 from '../assets/images/banner2.jpg';
import Banner3 from '../assets/images/banner3.png';
import Banner4 from '../assets/images/banner4.jpeg';
import Banner5 from '../assets/images/banner5.jpeg';

import { useSelector, useDispatch } from 'react-redux';
import axios from 'react-native-axios';
import GlobalPath from '../utils/GlobalPath';
import Loader from '../components/Loader';
// import { GetDashboardData } from '../store/actions/DashboardAction';
import { SaveIsLoginRedux, SaveUserInfoRedux } from '../store/actionType';
import DashboardMenu from '../components/Dashboard/DashboardMenu';
import PopularMenu from '../components/Dashboard/PopularMenu';
import RestaurantsSection from '../components/Dashboard/RestaurantsSection';
import BannerSection from '../components/Dashboard/BannerSection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FoodMenu from '../components/Dashboard/FoodMenu';
import * as Data from '../data';
import Header from '../components/Header';
import CartQuantityButton from '../components/CartQuantityButton';

const { width: PAGE_WIDTH } = Dimensions.get('window');

const categories = [
    {
        id: '1',
        title: 'Burger',
        icon: require('../assets/icons/hamburger.png')
    },
    {
        id: '2',
        title: 'Pizza',
        icon: require('../assets/icons/pizza.png')
    },
    {
        id: '3',
        title: 'Snacks',
        icon: require('../assets/icons/fries.png')
    },
    {
        id: '4',
        title: 'Sushi',
        icon: require('../assets/icons/sushi.png')
    },
    {
        id: '5',
        title: 'Drink',
        icon: require('../assets/icons/drink.png')
    },
    {
        id: '6',
        title: 'Salads',
        icon: require('../assets/icons/salad.png')
    },
];

const Header1 = ({ navigation }) => {
    const [search, setSearch] = useState('');
    return (
        <>
            <View style={HeaderStyle.headerContainer}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={HeaderStyle.headerImageContainer}
                    onPress={() => navigation.openDrawer()}
                >
                    <Entypo
                        name="menu"
                        size={25}
                        // style={{ color: Constants.Colors.black }}
                        style={{
                            width: 30,
                            height: 30,
                            // backgroundColor: 'red',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: Constants.Colors.themeColor,
                            // borderColor: 'gray',
                            borderRadius: 5,
                            paddingTop: 3,
                            paddingLeft: 3,
                            paddingRight: 3,
                            paddingBottom: 3,
                            color: 'black'
                        }}
                    />
                    {/* <Image
                        source={DrawerIcon}
                        resizeMode="contain"
                        style={HeaderStyle.headerImage}
                    /> */}
                </TouchableOpacity>

                <View style={HeaderStyle.headerLocationContainer}>
                    <View style={HeaderStyle.headerLocationTextWrapper}>
                        <Text style={{ fontSize: 12 }}> Some Text here </Text>
                    </View>
                </View>

                <TouchableOpacity style={[HeaderStyle.headerRightImageContainer, { backgroundColor: 'red' }]} activeOpacity={1}
                    onPress={() => navigation.navigate(Constants.Navigation.CartScreen)}>
                    {/* <Fontisto
                        name="shopping-bag"
                        size={23}
                        style={{ color: Constants.Colors.black }}
                    /> */}
                    <Feather
                        name="shopping-bag"
                        size={23}
                        style={{ color: Constants.Colors.black }}
                    />




                    {/* <View style={{
                        position: 'absolute',
                        top: 27,
                        right: 24,
                        height: 15,
                        width: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 14,
                        backgroundColor: Constants.Colors.themeColor
                    }}>
                        <Text style={{
                            color: 'white',
                            lineHeight: 0,
                            fontSize: 13
                        }}>
                            12
                        </Text>

                    </View> */}

                    {/* <Image
                        source={ShoppingIcon}
                        resizeMode="contain"
                        style={HeaderStyle.headerImage}
                    /> */}
                </TouchableOpacity>
            </View>
            {/* Text Input */}
            <View style={{ paddingTop: 14, paddingBottom: 15 }}>
                <View style={HeaderStyle.searchInputContainer}>
                    <Fontisto
                        name="search"
                        size={16}
                        style={{ color: Constants.Colors.black }}
                    />
                    <TextInput
                        style={{ flex: 1, paddingHorizontal: 12 }}
                        placeholder='Seach for shops & restaurants'
                        onChangeText={setSearch}
                        value={search}
                    />
                </View>
            </View>
        </>

    )
}

const Home = ({ navigation }) => {
    const data = useSelector((state) => { return state });
    const dispatch = useDispatch();
    // data.loading

    const [loading, setloading] = useState(false);

    const [categoryFoodId, setCategoryFoodId] = useState(1);
    const [categoryFoods, setCategoryFoods] = useState([]);
    const [popularMenu, setPopularMenu] = useState([{ "categoryFoodId": 1, "deliveryCharger": 200, "id": 1, "isFavourite": false, "name": "Burger Item 1", "placeName": "Place 1", "restaurantsName": "Restaurants Name 1" }, { "categoryFoodId": 1, "deliveryCharger": 300, "id": 2, "isFavourite": false, "name": "Burger Item 2", "placeName": "Place 2", "restaurantsName": "Restaurants Name 2" }]);
    const [dailyDeals, setDailyDeals] = useState([]);
    const [dailyDealsBanner, setDailyDealsBanner] = useState([]);
    const [foodMenu, setFoodMenu] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [search, setSearch] = useState('');


    const GetDashboardData = () => {
        // alert( GlobalPath.API_URL);
        // GlobalPath.API_URL + 
        let url = 'https://foodpkapi.t2telo.com/api/FoodMenu/GetAllFoodMenuClient';

        // let url = GlobalPath.API_URL + Constants.ApiController.FoodMenu + Constants.ApiAction.GetAllFoodMenuClient;
        // alert(url);
        axios.get(url).then(function (response) {
            // alert(JSON.stringify(response.data));
            // console.log(response.data);
            if (response.data.message === Constants.DisMsgType.Success) {
                setCategoryFoods(response.data.categoryFoods);
                setPopularMenu(response.data.categoryFoodsMenu);
                setDailyDeals(response.data.dailyDeals);
                setDailyDealsBanner(response.data.dailyDealsBanner);
                // setFoodMenu(response.data.foodMenu);
                setRestaurants(response.data.restaurants);

                setloading(false);
                // console.log(response.data.categoryFoodsMenu);
            }
            else {
                setloading(false);
            }
        }).catch(function (error) {
            alert(error);
            setloading(false);
        })
    }

    const changeCategoryFoodID = (ID) => {
        setCategoryFoodId(ID);
    }

    useEffect(() => {
        // if (Platform.OS === "android") {
        //     NetInfo.isConnected.fetch().then(isConnected => {
        //         if (isConnected) {
        //             Alert("You are online!");
        //         } else {
        //             Alert("You are offline!");
        //         }
        //     });
        // } else {
        //     // For iOS devices
        //     NetInfo.isConnected.addEventListener(
        //         "connectionChange",
        //         this.handleFirstConnectivityChange
        //     );
        // }


        AsyncStorage.getItem("isLoginAsync").then(data => {
            if (data === "true") {
                AsyncStorage.getItem("isLoginDataAsync").then(data => {
                    dispatch(SaveUserInfoRedux(JSON.parse(data)));
                    dispatch(SaveIsLoginRedux('true'))
                }).catch(error => console.log(error));
            }
        }).catch((error) => alert(error));
        // GetDashboardData();
        //GetDashboardData1();
    }, [])

    return (
        <SafeAreaView style={Styles.container}>
            <Loader loading={loading} />
            {/* <Header navigation={navigation} /> */}
            <Header
                containerStyle={{
                    height: 35,
                    paddingHorizontal: 20,
                    marginTop: 20,
                    alignItems: 'center',
                    // backgroundColor: 'red'
                }}
                title={'HOME'}
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
                        onPress={() =>  navigation.openDrawer()}>
                        <Entypo
                            name="menu"
                            size={24}
                            style={{ color: Constants.Colors.black }}
                        />
                    </TouchableOpacity>
                }
                rightComponent={
                    <CartQuantityButton
                        quantity={90}
                        onPress={() => navigation.navigate(Constants.Navigation.CartScreen)}
                     />
                    // <TouchableOpacity
                    // style={{
                    //     borderRadius: 12,
                    //     alignItems: 'center',
                    //     justifyContent: 'center',
                    //     backgroundColor: '#fb963c',
                    //     width: 40,
                    //     height: 40
                    // }}>
                    //     <Feather
                    //     name="shopping-bag"
                    //     size={23}
                    //     style={{ color: Constants.Colors.black }}
                    // />  
                    // </TouchableOpacity>
                }
            />
            {/* Text Input */}
            <View style={{ paddingTop: 14, paddingBottom: 15 }}>
                <View style={HeaderStyle.searchInputContainer}>
                    <Fontisto
                        name="search"
                        size={16}
                        style={{ color: Constants.Colors.black }}
                    />
                    <TextInput
                        style={{ flex: 1, paddingHorizontal: 12 }}
                        placeholder='Seach for shops & restaurants'
                        onChangeText={setSearch}
                        value={search}
                    />
                </View>
            </View>

            <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
                <DashboardMenu onSubmit={changeCategoryFoodID} />
                <FoodMenu navigation={navigation} />
                <PopularMenu popularMenu={popularMenu} categoryFoodId={categoryFoodId} />
                <BannerSection data={dailyDealsBanner} />
                <RestaurantsSection restaurants={restaurants} />
            </ScrollView>
        </SafeAreaView>
    );
    // }
}

export default Home;
