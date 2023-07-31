import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Keyboard } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import Styles from '../styles/Login';
import Feather from 'react-native-vector-icons/Feather';
import Constants from '../utils/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Entypo from 'react-native-vector-icons/Entypo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import GlobalPath from '../utils/GlobalPath';
import axios from 'react-native-axios';
// import axios from 'axios'
import GS from '../styles/GlobalStyles';
import { useSelector, useDispatch } from 'react-redux';
import { SaveOTPRedux } from '../store/actionType';
import Loader from '../components/Loader';
import { registerAction } from '../store/actions/AuthenticationAction';

const Register = ({ navigation }) => {

    const data = useSelector((state) => { return state })

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [errorUsername, setErrorUsername] = useState(false);
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorMsgEmail, setErrorMsgEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
    const [password, setPassword] = useState('');
    const [icon1, setIcon1] = useState('eye-with-line');
    const [passwordSecured, setPasswordSecured] = useState(true);
    const [errorpassword, setErrorpassword] = useState(false);
    const [confirmPassword, setConfimPassword] = useState('');
    const [icon2, setIcon2] = useState('eye-with-line');
    const [confirmPasswordSecured, setConfirmPasswordSecured] = useState(true);
    const [errorConfimPassword, setErrorConfimPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [errorMsg2, setErrorMsg2] = useState('');

    const onHideShowIcon = (value) => {
        if (value === 'password') {
            setPasswordSecured(!passwordSecured);
            setIcon1(icon1 === 'eye' ? 'eye-with-line' : 'eye');
        }
        else {
            setConfirmPasswordSecured(!confirmPasswordSecured);
            setIcon2(icon2 === 'eye' ? 'eye-with-line' : 'eye');
        }
    };

    const onRegister = (username, password, email, mobileNO) => {
        let tempData = {
            username: username,
            password: password,
            email, email,
            mobileNO: mobileNO
        }
        registerAction(tempData, dispatch, navigation, setLoading);
    }

    const onValueChange = (onStateChangeValue, textFieldName, action) => {
        if (textFieldName === 'Username') {
            setUsername(onStateChangeValue);
            setErrorUsername(action);
        }
        else if (textFieldName === 'Email') {
            setEmail(onStateChangeValue);
            setErrorEmail(action);
        }
        else if (textFieldName === 'PhoneNumber') {
            setPhoneNumber(onStateChangeValue);
            setErrorPhoneNumber(action);
        }
        else if (textFieldName === 'Password') {
            setPassword(onStateChangeValue);
            setErrorpassword(action);
        }
        else if (textFieldName === 'ConfirmPassword') {
            setConfimPassword(onStateChangeValue);
            setErrorConfimPassword(action);
        }
    }

    const ErrorMessage = (value, action) => {
        if (value === 'Username') {
            setErrorUsername(action);
        }
        else if (value === 'Email') {
            setErrorEmail(action);
        }
        else if (value === 'PhoneNumber') {
            setErrorPhoneNumber(action);
        }
        else if (value === 'Password') {
            setErrorpassword(action);
        }
        else if (value === 'ConfirmPassword') {
            setErrorConfimPassword(action);
        }
        else if (value === 'All') {
            setErrorUsername(action);
            setErrorEmail(action);
            setErrorPhoneNumber(action);
            setErrorpassword(action);
            setConfimPassword(action);
        }
    }

    const ValidationCheck = (username, email, phoneNumber, password, confirmPassword) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        Keyboard.dismiss();
        if (username === '' || username === null || username === undefined) {
            ErrorMessage('Username', true);
        }
        if (email === '' || email === null || email === undefined) {
            ErrorMessage('Email', true);
            setErrorMsgEmail("Please Enter Email");
        }
        else if (reg.test(email) === false) {
            ErrorMessage('Email', true);
            setErrorMsgEmail("Enter Valid Email");
            setEmail(email);
            return false;
        }
        if (phoneNumber === '' || phoneNumber === null || phoneNumber === undefined) {
            ErrorMessage('PhoneNumber', true);
        }
        if (password === '' || password === null || password === undefined) {
            ErrorMessage('Password', true);
            setErrorMsg('Please Enter Password');
        }
        else if (password.length <= 7) {
            ErrorMessage('Password', true);
            setErrorMsg('Confirm Password Must Be 8 or More');
        }
        if (confirmPassword === '' || confirmPassword === null || confirmPassword === undefined) {
            ErrorMessage('ConfirmPassword', true);
            setErrorMsg2('Please Enter Confirm Password');
        }
        else if (confirmPassword.length <= 7) {
            ErrorMessage('ConfirmPassword', true);
            setErrorMsg2('Confirm Password Must Be 8 or More');
        }
        else if (password !== confirmPassword) {
            ErrorMessage('Password', true);
            ErrorMessage('ConfirmPassword', true);
            setErrorMsg('Password Not Match');
            setErrorMsg2('Password Not Match');
        }
        else {
            Keyboard.dismiss();
            onRegister(username, password, email, phoneNumber);
        }
    }

    return (
        <>
            <Loader loading={loading} />

            {/* <Header /> */}
            <SafeAreaView style={Styles.main}>
                <View style={Styles.container}>
                    <View style={Styles.wFull}>

                        <Text style={Styles.headingText}>Sign Up</Text>


                        <View style={[Styles.centerizedView, { marginTop: 10 }]}>
                            <View style={Styles.emailTextInput}>
                                <FontAwesome name="user" size={21} style={Styles.iconStyle} />
                                <TextInput
                                    style={Styles.textInputStyle}
                                    placeholder={'Username'}
                                    value={username}
                                    textContentType='username'
                                    keyboardType='visible-password'
                                    onChangeText={(text) => onValueChange(text, 'Username', false)}
                                />
                            </View>
                        </View>
                        {errorUsername && <Text style={GS.errorValidationText}>Please Enter Username</Text>}

                        <View style={Styles.centerizedView}>
                            <View style={[Styles.emailTextInput]}>
                                <MaterialCommunityIcons name="email" size={21} style={Styles.iconStyle} />
                                <TextInput
                                    style={Styles.textInputStyle}
                                    placeholder={'Email'}
                                    value={email}
                                    textContentType='emailAddress'
                                    keyboardType='email-address'
                                    onChangeText={(text) => onValueChange(text, 'Email', false)}
                                />
                            </View>
                        </View>
                        {errorEmail && <Text style={GS.errorValidationText}>{errorMsgEmail}</Text>}

                        <View style={Styles.centerizedView}>
                            <View style={[Styles.emailTextInput]}>
                                <FontAwesome name="mobile-phone" size={21} style={Styles.iconStyle} />
                                <TextInput
                                    style={Styles.textInputStyle}
                                    placeholder={'Phone Number'}
                                    value={phoneNumber}
                                    maxLength={11}
                                    textContentType='telephoneNumber'
                                    keyboardType='number-pad'
                                    onChangeText={(text) => onValueChange(text, 'PhoneNumber', false)}
                                />
                            </View>
                        </View>
                        {errorPhoneNumber && <Text style={GS.errorValidationText}>Please Enter Phone Number</Text>}

                        <View style={Styles.centerizedView}>
                            <View style={[Styles.passwordTextInput, { marginTop: 7 }]}>
                                <FontAwesome name="lock" size={21} style={Styles.iconStyle} />
                                <TextInput
                                    style={Styles.textInputStyle}
                                    placeholder={'Password'}
                                    value={password}
                                    textContentType='password'
                                    // keyboardType='visible-password'
                                    onChangeText={(text) => onValueChange(text, 'Password', false)}
                                    secureTextEntry={passwordSecured}
                                />
                                <TouchableOpacity activeOpacity={1}
                                    style={{ paddingBottom: 18, marginBottom: 23 }}
                                    onPress={() => onHideShowIcon('password')}
                                >
                                    {passwordSecured == 'true' ?
                                        <Entypo name={icon1} size={21} style={Styles.iconRightStyle} /> :
                                        <Entypo name={icon1} size={21} style={Styles.iconRightStyle} />}
                                </TouchableOpacity>
                            </View>
                        </View>
                        {errorpassword && <Text style={GS.errorValidationText}>{errorMsg}</Text>}

                        <View style={Styles.centerizedView}>
                            <View style={[Styles.passwordTextInput, { marginTop: 7 }]}>
                                <FontAwesome name="lock" size={21} style={Styles.iconStyle} />
                                <TextInput
                                    style={Styles.textInputStyle}
                                    placeholder={'Confirm Password'}
                                    value={confirmPassword}
                                    textContentType='password'
                                    // keyboardType='visible-password'
                                    onChangeText={(text) => onValueChange(text, 'ConfirmPassword', false)}
                                    secureTextEntry={confirmPasswordSecured}
                                />
                                <TouchableOpacity activeOpacity={1}
                                    style={{ paddingBottom: 18, backgroundColor: 'red', marginBottom: 23 }}
                                    onPress={() => onHideShowIcon('confirmPassword')}
                                >
                                    {confirmPasswordSecured == 'true' ?
                                        <Entypo name={icon2} size={21} style={Styles.iconRightStyle} /> :
                                        <Entypo name={icon2} size={21} style={Styles.iconRightStyle} />}
                                </TouchableOpacity>
                            </View>
                        </View>
                        {errorConfimPassword && <Text style={GS.errorValidationText}>{errorMsg2}</Text>}

                        <View style={Styles.loginBtnWrapper}>
                            <View style={Styles.loginContainer}>
                                <TouchableOpacity activeOpacity={1} style={Styles.loginButton}
                                    // onPress={() => navigation.navigate(Constants.Navigation.OTPVerification, { OTP: 1234, phoneNumber: '3014552061' })}
                                onPress={() => ValidationCheck(username, email, phoneNumber, password, confirmPassword)}
                                >
                                    <Text style={Styles.loginButtonText}>Sign in</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* ***************** FORGOT PASSWORD BUTTON **************** */}
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => navigation.navigate(Constants.Navigation.Login)}
                        >
                            <Text style={Styles.forgotPassText}> Already have an accout? Login Here</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        </>
    )
}
export default Register;