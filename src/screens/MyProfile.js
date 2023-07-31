import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, SafeAreaView, Image, TextInput, StyleSheet } from 'react-native';
import Styles from '../styles/MyProfile';
import Constants from '../utils/Constants';
import { useNavigation } from '@react-navigation/native';
// import EditProfile from '../components/MyProfile/EditProfile';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'react-native-axios';
import GlobalPath from '../utils/GlobalPath';
import Loader from '../components/Loader';
import StylesA from '../styles/CustomDrawer';
import RBSheet from "react-native-raw-bottom-sheet";
import ImagePicker, { openCamera } from 'react-native-image-crop-picker';
import profileImage from '../assets/images/profileImage.jpeg';
import { updateProfileAction } from '../store/actions/GeneralAction';
import { useSelector, useDispatch } from 'react-redux';
import ProgressiveImage from '../components/ProgressiveImage';


const Header = () => {
    const navigation = useNavigation()
    return (
        <View style={{
            backgroundColor: Constants.Colors.lightGray4,
            flexDirection: 'row',
            height: 60,

        }}>
            <TouchableOpacity
                activeOpacity={1}
                style={Styles.headerIcon}
                onPress={() => navigation.navigate(Constants.Navigation.Home)}
            >
                <Feather
                    name="chevron-left"
                    size={27}
                    style={{ color: Constants.Colors.black }}
                />
            </TouchableOpacity>

            <View style={{ flex: 1, paddingTop: 5 }}>
                <Text style={Styles.headerText}> Profile </Text>
            </View>
        </View>
    )
}

const MyProfile = ({ route, navigation }) => {
    const refRBSheet = useRef();
    const refEditProfile = useRef();
    const dispatch = useDispatch();
    const { loginID } = route.params;

    const [loading, setLoading] = useState(true);

    const [myImages, setMyImages] = useState('');
    const [userName, setUserName] = useState('-----------');
    const [password, setPassword] = useState('');
    const [ID, setID] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('-----------');
    const [email, setEmail] = useState('-----------');
    const [address, setAddress] = useState('Public School Hyderabad unit no 3');
    const [type, setType] = useState('');
    const [img, setImg] = useState(null);
    const [showDefault, setShowDefault] = useState(true);
    const [error, setError] = useState(false);


    const imagesFromGallery = () => {
        ImagePicker.openPicker({
            // multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            cropping: true,
        }).then(image => {
            // alert(JSON.stringify(image));
            // const image = {
            //     uri: response.uri,
            //     type: response.type,
            //     name: response.fileName || 'image.jpg',
            //   };

            let tempObj = {
                uri: image.path,
                type: image.mime,
                name: image.filename || 'image.jpg',
            }
            setImg(tempObj);
            setMyImages(image.path);

            refRBSheet.current.close()
        }).catch(error => {
            console.log(error);
            refRBSheet.current.close()
        });
    } // end of imageFromGallery

    const imageFromCamera = () => {
        ImagePicker.openCamera({
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            cropping: true,
        }).then(image => {
            setMyImages(image.path);
            refRBSheet.current.close();
        }).catch(error => {
            console.log(error);
            refRBSheet.current.close()
        });
    } // end of imageFromCamera


    const GetUpdateData = (name, phone, mail, addres) => {
        if (name !== userName) {
            setUserName(name);
        }
        if (phone !== phoneNumber) {
            setPhoneNumber(phone);
        }
        if (mail !== email) {
            setEmail(mail);
        }
        if (addres !== address) {
            setAddress(address);
        }
        refEditProfile.current.close();
    }

    const editData = (type) => {
        setType(type);
        refEditProfile.current.open();
    }


    const GetProfileData = (loginID) => {
        let url = GlobalPath.API_URL + Constants.ApiController.Profile + Constants.ApiAction.GetProfileDataWithLoginID + loginID;
        axios.get(url).then(function (response) {
            let data = response.data.data[0];
            // alert(data.profileImage)
            setEmail(data.email);
            setID(data.loginID);
            setPhoneNumber(data.mobileNo);
            setUserName(data.username);
            setPassword(data.password);
            setMyImages(data.profileImage);
            setLoading(false);

        }).catch(function (error) {
            console.log(error);
            setLoading(false);
        })
    }

    const UpdateProfileData = (loginId) => {
        let data = {
            loginID: loginId,
            username: userName,
            email: email,
            mobileNo: phoneNumber,
            address: address,
            profileImg: img
        }
        updateProfileAction(data, dispatch, navigation, setLoading);
    }

    useEffect(() => {
        GetProfileData(loginID);
    }, [])



    return (
        <SafeAreaView style={Styles.container}>
            <Loader loading={loading} />
            <Header />
            {/* <EditProfile
                userName={userName}
                phoneNumber={phoneNumber}
                email={email}
                address={address}
                GetUpdateData={GetUpdateData}
                UpdateProfileData={UpdateProfileData}
            /> */}

            <View style={Styles.ProfileImageContainer}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={[Styles.profileImage, { marginTop: '10%' }]}
                    onPress={() => refRBSheet.current.open()}>
                    {myImages === '' || myImages === null ?
                        <Image source={profileImage} style={Styles.profileImage} />
                        :
                        <Image
                            source={{ uri: myImages }}
                            style={Styles.profileImage}
                        />
                    }
                    {/* <Image
                        style={showDefault ? styles.loaderView : Styles.profileImage}
                        source={showDefault ? require('../assets/icons/loading.gif') : (error ? require('../assets/icons/error.gif') : { uri: GlobalPath.ACTIVITY_IMAGES + myImages })}
                        // style={}
                        // defaultSource={require('../assets/icons/loading.gif')}
                        onLoadEnd={() => setShowDefault(false)}
                        onError={() => setError(true)}
                    /> */}
                    {/* <Image
                        style={Styles.profileImage}
                        source={myImages}
                    /> */}
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => refRBSheet.current.open()}
                        style={Styles.badgeIconContainer}>
                        <FontAwesome name="camera" size={21} style={{ color: Constants.Colors.black }} />
                    </TouchableOpacity>
                </TouchableOpacity>

                {/* <Image style={showDefault ? styles.loaderView : style}
                source={showDefault ? require('../assets/icons/loading.gif') : (error ? require('../assets/icons/error.gif') : { uri: imagePath })}
                onLoadEnd={() => setShowDefault(false)}
                onError={() => setError(true)}
                resizeMode={resizeMode}
            /> */}



                {/* <Text style={Styles.TitleChangeImage}>Change Photo</Text> */}
            </View>
            <Text style={Styles.TitleProfile}> {userName} </Text>
            <TouchableOpacity activeOpacity={1} style={[StylesA.DrawerOptionContainer, { paddingTop: '10%' }]}
            >
                <View style={{ left: 0 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={Styles.HeadingTitle}> My Name </Text>
                    </View>
                </View>
                <View style={{ right: 3 }}>
                    {/* {true && <EditProfile value={props.userName} />} */}
                    <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', paddingLeft: 15 }}
                        onPress={() => editData('name')}>
                        <Text style={Styles.HeadingTitleValue}> {userName} </Text>
                        <FontAwesome name="chevron-right" size={15} style={{ marginTop: 4 }} color={Constants.Colors.black} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} style={[StylesA.DrawerOptionContainer, { paddingTop: 7 }]}>
                <View style={{ left: 0 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={Styles.HeadingTitle}> Phone Number </Text>
                    </View>
                </View>
                <View style={{ right: 3 }}>
                    <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', paddingLeft: 15 }}
                        onPress={() => editData('phoneNumber')}>
                        <Text style={Styles.HeadingTitleValue}> {phoneNumber} </Text>
                        <FontAwesome name="chevron-right" size={15} style={{ marginTop: 4 }} color={Constants.Colors.black} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} style={[StylesA.DrawerOptionContainer, { paddingTop: 7 }]}>
                <View style={{ left: 0 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={Styles.HeadingTitle}> Email </Text>
                    </View>
                </View>
                <View style={{ right: 3 }}>
                    <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', paddingLeft: 15 }}
                        onPress={() => editData('email')}>
                        <Text style={Styles.HeadingTitleValue}> {email} </Text>
                        <FontAwesome name="chevron-right" size={15} style={{ marginTop: 4 }} color={Constants.Colors.black} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} style={[StylesA.DrawerOptionContainer, { paddingTop: 7 }]}>
                <View style={{ left: 0 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={Styles.HeadingTitle}> My Address </Text>
                    </View>
                </View>
                <View style={{ right: 3 }}>
                    <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', paddingLeft: 15 }}
                        onPress={() => editData('address')}>
                        {/* {item.name.length < 24 ? `${item.name}` : `${item.name.substring(0, 24)}...`}  */}
                        <Text style={Styles.HeadingTitleValue}> {address.length < 18 ? `${address}` : `${address.substring(0, 18)}...`} </Text>
                        <FontAwesome name="chevron-right" size={15} style={{ marginTop: 4 }} color={Constants.Colors.black} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            <View style={Styles.bottomView}>
                <TouchableOpacity activeOpacity={1} style={Styles.SaveButton}
                    onPress={() => UpdateProfileData(loginID)}
                >
                    <Text style={Styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>

            {/* Choose Image From Camera or Gallery */}

            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                // onClose={()=>refRBSheet.current.close()}
                // closeOnPressBack={()=>refRBSheet.current.close()}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent",
                        // backgroundColor: '#e5e5e5'
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
            >
                <View style={Styles.panel}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={Styles.panelTitle}>Upload Photo</Text>
                        <Text style={Styles.panelSubtitle}>Choose Your Profile Picture</Text>
                    </View>
                    <TouchableOpacity activeOpacity={1} style={Styles.panelButton}
                        onPress={() => imageFromCamera()}
                    >
                        <Text style={Styles.panelButtonTitle}>Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={Styles.panelButton}
                        onPress={() => imagesFromGallery()}
                    >
                        <Text style={Styles.panelButtonTitle}>Choose From Library</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={Styles.panelButton}
                        onPress={() => refRBSheet.current.close()}
                    >
                        <Text style={Styles.panelButtonTitle}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </RBSheet>


            {/* Edit Profile */}

            <RBSheet
                ref={refEditProfile}
                closeOnDragDown={true}
                closeOnPressMask={true}
                // onClose={()=>refRBSheet.current.close()}
                // closeOnPressBack={()=>refRBSheet.current.close()}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent",
                        // backgroundColor: '#e5e5e5'
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
            >
                {type === 'name' ? <>
                    <Text style={[Styles.labelOfTextInput]}> Name </Text>
                    <View style={Styles.centerizedView}>
                        <View style={Styles.passwordTextInput}>
                            <FontAwesome name="user" size={21} style={Styles.iconStyle} />
                            <TextInput
                                style={Styles.textInputStyle}
                                placeholder={'username'}
                                value={userName}
                                textContentType='password'
                                onChangeText={setUserName}
                            />
                        </View>
                    </View>
                </> : null}

                {type === 'phoneNumber' ?
                    <>
                        <Text style={[Styles.labelOfTextInput]}> Phone Number </Text>
                        <View style={Styles.centerizedView}>
                            <View style={Styles.passwordTextInput}>
                                <MaterialIcons name="phone-iphone" size={21} style={Styles.iconStyle} />
                                <TextInput
                                    style={Styles.textInputStyle}
                                    placeholder={'phone number'}
                                    value={phoneNumber}
                                    textContentType='telephoneNumber'
                                    keyboardType='decimal-pad'
                                    onChangeText={setPhoneNumber}
                                />
                            </View>
                        </View>
                    </> : null}

                {type === 'email' ?
                    <>
                        <Text style={[Styles.labelOfTextInput]}> Email </Text>
                        <View style={Styles.centerizedView}>
                            <View style={Styles.passwordTextInput}>
                                <MaterialCommunityIcons name="email" size={21} style={Styles.iconStyle} />
                                <TextInput
                                    style={Styles.textInputStyle}
                                    placeholder={'email'}
                                    value={email}
                                    textContentType='password'
                                    onChangeText={setEmail}
                                />
                            </View>
                        </View>
                    </> : null}

                {type === 'address' ?
                    <>
                        <Text style={[Styles.labelOfTextInput]}> Address </Text>
                        <View style={Styles.centerizedView}>
                            <View style={Styles.passwordTextInput}>
                                <FontAwesome name="address-card" size={21} style={Styles.iconStyle} />
                                <TextInput
                                    style={Styles.textInputStyle}
                                    placeholder={'address'}
                                    value={address}
                                    textContentType='password'
                                    onChangeText={setAddress}
                                />
                            </View>
                        </View>
                    </> : null}




                <View style={Styles.bottomViewEditProfile}>
                    <TouchableOpacity activeOpacity={1} style={Styles.SaveButton}
                        onPress={() => GetUpdateData(userName, phoneNumber, email, address)}>
                        <Text style={Styles.saveButtonText}>Update</Text>
                    </TouchableOpacity>
                </View>

            </RBSheet>
        </SafeAreaView>
    )

}
export default MyProfile;

const styles = StyleSheet.create({
    loaderView: {
        width: 40,
        height: 40,
        // marginHorizontal: '37%',
        marginVertical: '35%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
    },
    loaderContainer: {
        borderRadius: 11,
        backgroundColor: Constants.Colors.lightGray3,
    }

})