import { useSelector, useDispatch } from 'react-redux';
// import { SetLoading, SaveDashboardData } from '../actionType';
import GlobalPath from '../../utils/GlobalPath';
import Constants from '../../utils/Constants';
import axios from 'react-native-axios';
import { SaveOTPRedux, SaveUserInfoRedux, SaveIsLoginRedux, SaveTempLoginData, AddNotificationMessageResponse } from '../actionType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotFound from '../../components/Popup/NotFound';
import NotificationHandler from '../../components/NotificationHandler/NotificationHandler';
import { View, Text } from 'react-native';

export const forgetPasswordWithEmail = (email, dispatch, navigation, setLoading) => {
    setLoading(true);
    let url = GlobalPath.API_URL + 'ForgetPassword/ForgetPasswordWithEmail?Email=' + email;
    axios.post(url).then(function (response) {
        let data = response.data;
        // alert(JSON.stringify());
        let msg = data.message;
        let otp = data.otp;
        let phone = data.phoneNumber;
        if (msg === 'Success') {
            dispatch(SaveOTPRedux(otp));
            navigation.navigate(Constants.Navigation.ConfirmOTP, { OTP: otp, PhoneNumber: phone, Email: email });
            setLoading(false);
            alert(otp);
            console.log(otp);
        }
        else {
            // dispatch(AddNotificationMessageResponse(msg))
            // <NotFound  />
            // msg;
            // NotificationHandler();
            // if(msg === 'Record Not Found'){
                // return (
                    // <NotificationHandler />
                // )
            // }
            alert(msg);



        }
        // setLoading(false);
    }).catch(function (error) {
        console.log(error);
        setLoading(false);
    })
}

export const setNewPasswordWithLoginID = (newPassword, loginID, dispatch, navigation, setLoading) => {
    setLoading(true);
    // let data = [];
    // let msg 
    let url = GlobalPath.API_URL + 'ForgetPassword/SetNewPasswordWithLoginID?newPassword=' + newPassword + '&loginID=' + loginID;
    axios.post(url).then(function (response) {
        // alert(JSON.stringify(response));
        let msg = response.data.message;
        let data = response.data.data;

        // let otp = data.otp;
        // let phone = data.phoneNumber;
        if (msg === 'Success') {

            dispatch(SaveUserInfoRedux(data));
            dispatch(SaveIsLoginRedux('true'));

            AsyncStorage.setItem("isLoginAsync", "true").then(() => { }).catch(error => console.log(error));
            AsyncStorage.setItem("isLoginDataAsync", JSON.stringify(data)).then(() => { }).catch(error => console.log(error));

            navigation.navigate(Constants.Navigation.Home);
            // setLoading(false);
        }
        // else {
        //     alert(msg);
        // }
    }).catch(function (error) {
        console.log(error);
        setLoading(false);
    })
}
