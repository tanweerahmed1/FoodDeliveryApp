import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, Image, Keyboard } from 'react-native';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import Styles from '../styles/Login';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Constants from '../utils/Constants';
import Logo from '../assets/icons/Logo.png';
import Loader from '../components/Loader';
import GS from '../styles/GlobalStyles';
import { forgetPasswordWithEmail } from '../store/actions/ForgetPasswordAction'
import { useSelector, useDispatch } from 'react-redux';

const Header = () => {
    const navigation = useNavigation()
    return (
        <View style={Styles.headerContainer}>
            <TouchableOpacity
                activeOpacity={1}
                style={Styles.headerIcon}
                onPress={() => navigation.navigate(Constants.Navigation.Home)}
            >
                <Feather
                    name="chevron-left"
                    size={29}
                    style={{ color: Constants.Colors.black }}
                />
            </TouchableOpacity>

            {/* <View style={{ flex: 1, }}>
                <Text style={Styles.headerText}> My Profile </Text>
            </View> */}
        </View>
    )
}


const ForgetPassword = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const data = useSelector((state) => { return state })

    const ValidationCheck = (text) => {
        Keyboard.dismiss();
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (email === '' || email === null){
            setErrorEmail(true);
            setErrorMsg("Please Enter Email");
        }
        else if (reg.test(text) === false) {
            setErrorEmail(true);
            setErrorMsg("Enter Valid Email");
            setEmail(text);
            return false;
        }
        else {
            // forgetPasswordWithEmail(email, dispatch, navigation, setLoading);
            // alert(data.notificationMessage)
            // if(data.notificationMessage === 'Record Not Found'){
            //     alert('jhghg');
            //     setLoading(false);
            // }
            // alert('testing');
            // setEmail(text);
            // SentOTPToEmail(email);
            // alert("Email is Correct");
            navigation.navigate(Constants.Navigation.ConfirmOTP)
        }
    }
    
    return (
        <>
            <Loader loading={loading} />
            <SafeAreaView style={{
                flex: 1,
                // justifyContent: 'center',
                // alignItems: 'center',
                // padding: 16,
                backgroundColor: 'white',
                // marginTop: -50
            }}>
                <Header />
                <View style={Styles.container}>
                    <View style={Styles.wFull}>
                        <View style={Styles.row}>
                            <Image source={Logo} style={Styles.logo} />
                            {/* <Text style={Styles.brandName}>FooD PK Rider</Text> */}
                        </View>

                        <Text style={Styles.loginContinueTxt}>Forget Password</Text>
                        <View style={Styles.centerizedView}>
                            <View style={Styles.emailTextInput}>
                                <FontAwesome name="user" size={21} style={Styles.iconStyle} />
                                <TextInput
                                    style={Styles.textInputStyle}
                                    placeholder={'Email'}
                                    value={email}
                                    textContentType='emailAddress'
                                    keyboardType='email-address'
                                    onChangeText={setEmail}
                                />
                            </View>
                        </View>
                        {errorEmail && <Text style={GS.errorValidationText}> { errorMsg } </Text>}

                        <View style={Styles.loginBtnWrapper}>
                            <View style={Styles.loginContainer}>
                                <TouchableOpacity activeOpacity={1} style={Styles.loginButton}
                                    onPress={() => ValidationCheck(email)}>
                                    <Text style={Styles.loginButtonText}>Reset</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                    </View>

                </View>
            </SafeAreaView>
        </>
    )
}
export default ForgetPassword;