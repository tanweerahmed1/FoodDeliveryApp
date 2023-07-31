import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, ImageBackground, Dimensions } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Styles from '../../styles/CustomDrawer';
import { useNavigation } from '@react-navigation/native';

// Icons 
import Zocial from 'react-native-vector-icons/Zocial';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import profileImage from '../../assets/images/profileImage.jpeg';
import { useSelector, useDispatch } from 'react-redux';
import Constants from '../../utils/Constants';
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SaveUserInfoRedux, SaveIsLoginRedux } from '../../store/actionType';
import GlobalPath from '../../utils/GlobalPath';

// import { logoutAction } from '../../Api/Authentication';

function CustomDrawer({ navigation }) {
    const data = useSelector((state) => { return state })
    const dispatch = useDispatch();


    const logoutAction = () => {
        AsyncStorage.removeItem("isLoginAsync");
        AsyncStorage.removeItem("isLoginDataAsync");
        dispatch(SaveUserInfoRedux([]));
        dispatch(SaveIsLoginRedux('false'));
        navigation.closeDrawer();
    }

    return (
        <View style={Styles.container}>
            <DrawerContentScrollView
                // {...props}
                contentContainerStyle={{
                    // backgroundColor: 'red',
                    // borderTopRightRadius: 20
                    // height: '100%'
                }}>

                {data.isLogin === 'false' &&
                    <View>
                        <View style={[Styles.profileImageContainer, { backgroundColor: Constants.Colors.themeColor, marginTop: -5, marginLeft: -5 }]}>
                            <TouchableOpacity activeOpacity={1} style={{ paddingTop: 110, paddingLeft: 10 }}
                                onPress={() => navigation.navigate(Constants.Navigation.Login)}>
                                <Text style={{ fontWeight: '600', color: 'black', marginBottom: 10, fontSize: 15 }}>Login / Create Account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                {data.isLogin === 'true' &&
                    <View>
                        <View style={Styles.profileImageContainer} onPress={() => navigation.navigate(Constants.Navigation.MyProfile)}>
                            <TouchableOpacity activeOpacity={1}>
                                {true ?
                                    <Image style={Styles.profileImage} source={profileImage} />
                                    :
                                    <Image style={styles.logo} source={{ uri: GlobalPath.ACTIVITY_IMAGES + data.userInfo.imagePath }} />
                                }

                            </TouchableOpacity>
                            <View>
                                <Text style={Styles.HeaderText1}> {data.userInfo.username}  </Text>
                                <Text style={Styles.HeaderText2}> {data.userInfo.email} </Text>
                            </View>

                        </View>
                    </View>
                }

                <View style={{ flex: 1, paddingTop: 10 }}>

                    {/* <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate(Constants.Navigation.Login)} style={Styles.DrawerOptionContainer}>
                        <View style={{ left: 0 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Entypo name="login" size={19} color={Constants.Colors.drawerIconColor} />
                                <Text style={Styles.DrawerOptionText}> Login </Text>
                            </View>
                        </View>
                        <View style={{ right: 3 }}>
                            <FontAwesome name="chevron-right" size={18} color={Constants.Colors.drawerIconColor} />
                        </View>
                    </TouchableOpacity> */}

                    {/* <TouchableOpacity activeOpacity={1} style={Styles.DrawerOptionContainer} onPress={() => navigation.navigate(Constants.Navigation.Register)}>
                        <View style={{ left: 0 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Entypo name="login" size={19} color={Constants.Colors.drawerIconColor} />
                                <Text style={Styles.DrawerOptionText}> Register </Text>
                            </View>
                        </View>
                        <View style={{ right: 3 }}>
                            <FontAwesome name="chevron-right" size={18} color={Constants.Colors.drawerIconColor} />
                        </View>
                </TouchableOpacity> */}

                    {data.isLogin === 'true' &&
                        <>
                            <TouchableOpacity activeOpacity={1} style={Styles.DrawerOptionContainer}>
                                <View style={{ left: 0 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Feather name="heart" size={19} color={Constants.Colors.drawerIconColor} />
                                        <Text style={Styles.DrawerOptionText}> Favorites </Text>
                                    </View>
                                </View>
                                <View style={{ right: 3 }}>
                                    <FontAwesome name="chevron-right" size={18} color={Constants.Colors.drawerIconColor} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} style={Styles.DrawerOptionContainer}
                                onPress={() => navigation.navigate(Constants.Navigation.OrdersAndReordering)}

                            >

                                <View style={{ left: 1 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Ionicons name="receipt-outline" size={18} color={Constants.Colors.drawerIconColor} />
                                        <Text style={Styles.DrawerOptionText}> Orders & reordering </Text>
                                    </View>
                                </View>
                                <View style={{ right: 3 }}>
                                    <FontAwesome name="chevron-right" size={18} color={Constants.Colors.drawerIconColor} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} style={Styles.DrawerOptionContainer}
                                onPress={() => navigation.navigate(Constants.Navigation.MyProfile, { loginID: data.userInfo.loginID })}
                            >
                                <View style={{ left: 0 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Ionicons name="person-outline" size={19} color={Constants.Colors.drawerIconColor} />
                                        <Text style={Styles.DrawerOptionText}> My Profile </Text>
                                    </View>
                                </View>
                                <View style={{ right: 3 }}>
                                    <FontAwesome name="chevron-right" size={18} color={Constants.Colors.drawerIconColor} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} style={Styles.DrawerOptionContainer}
                            // onPress={() => navigation.navigate(Constants.Navigation.SearchProperty)}
                            >
                                <View style={{ left: 1 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Ionicons name="location-outline" size={19} color={Constants.Colors.drawerIconColor} />
                                        <Text style={Styles.DrawerOptionText}> Addresses </Text>
                                    </View>
                                </View>
                                <View style={{ right: 3 }}>
                                    <FontAwesome name="chevron-right" size={18} color={Constants.Colors.drawerIconColor} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} style={Styles.DrawerOptionContainer}
                            // onPress={() => navigation.navigate(Constants.Navigation.SearchAssociates)}
                            >
                                <View style={{ left: 1 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Ionicons name="trophy-outline" size={19} color={Constants.Colors.drawerIconColor} />

                                        <Text style={Styles.DrawerOptionText}> Challenges & rewards </Text>
                                    </View>
                                </View>
                                <View style={{ right: 3 }}>
                                    <FontAwesome name="chevron-right" size={18} color={Constants.Colors.drawerIconColor} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} style={Styles.DrawerOptionContainer}
                            // onPress={() => navigation.navigate(Constants.Navigation.SearchDealers)}
                            >
                                <View style={{ left: 1 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <MaterialCommunityIcons name="ticket-confirmation-outline" size={21} color={Constants.Colors.drawerIconColor} />
                                        <Text style={Styles.DrawerOptionText}> Vouchers </Text>
                                    </View>
                                </View>
                                <View style={{ right: 3 }}>
                                    <FontAwesome name="chevron-right" size={18} color={Constants.Colors.drawerIconColor} />
                                </View>
                            </TouchableOpacity>

                        </>
                    }

                    <TouchableOpacity activeOpacity={1} style={Styles.DrawerOptionContainer}
                    >
                        <View style={{ left: 0 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <AntDesign name="questioncircleo" size={21} color={Constants.Colors.drawerIconColor} />
                                <Text style={Styles.DrawerOptionText}> Help center </Text>
                            </View>
                        </View>
                        <View style={{ right: 3 }}>
                            <FontAwesome name="chevron-right" size={18} color={Constants.Colors.drawerIconColor} />
                        </View>
                    </TouchableOpacity>
                    {/* } */}

                    {/* {data.userInfo.userType === 2 && */}
                    <TouchableOpacity activeOpacity={1} style={Styles.DrawerOptionContainer}
                    >
                        <View style={{ left: 0 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <AntDesign name="gift" size={21} color={Constants.Colors.drawerIconColor} />
                                <Text style={Styles.DrawerOptionText}> Invite friends </Text>
                            </View>
                        </View>
                        <View style={{ right: 3 }}>
                            <FontAwesome name="chevron-right" size={18} color={Constants.Colors.drawerIconColor} />
                        </View>
                    </TouchableOpacity>
                    {/* } */}
                </View>

                <TouchableOpacity activeOpacity={1} style={Styles.DrawerOptionContainer}>
                    <View style={{ left: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons name="settings-outline" size={21} color={Constants.Colors.drawerIconColor} />
                            <Text style={Styles.DrawerOptionText}> Settings </Text>
                        </View>
                    </View>
                    <View style={{ right: 3 }}>
                        <FontAwesome name="chevron-right" size={18} color={Constants.Colors.drawerIconColor} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} style={Styles.DrawerOptionContainer}>
                    <View style={{ left: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons name="clipboard-text" size={21} color={Constants.Colors.drawerIconColor} />
                            <Text style={Styles.DrawerOptionText}> Terms & Conditions / Privacy </Text>
                        </View>
                    </View>
                    <View style={{ right: 3 }}>
                        <FontAwesome name="chevron-right" size={18} color={Constants.Colors.drawerIconColor} />
                    </View>
                </TouchableOpacity>

                {data.isLogin === 'true' &&
                    <TouchableOpacity activeOpacity={1} style={Styles.bottomContainer}
                        onPress={() => logoutAction()}
                    >
                        <View style={{ left: 1 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <AntDesign name="logout" size={21} color={Constants.Colors.drawerIconColor} />
                                <Text style={Styles.DrawerOptionText}> Logout </Text>
                            </View>
                        </View>
                        <View style={{ right: 3 }}>
                            <FontAwesome name="chevron-right" size={18} color={Constants.Colors.drawerIconColor} />
                        </View>
                    </TouchableOpacity>
                }
            </DrawerContentScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    signInButton: {
        marginTop: '3%',
        // padding: 2,
        // backgroundColor: '#739763',
        backgroundColor: Constants.Colors.greenLightestTheme,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        // marginVertical: 1,
        height: 40,
        width: 135,
        // marginBottom: '-1%'
    },
})
export default CustomDrawer;
