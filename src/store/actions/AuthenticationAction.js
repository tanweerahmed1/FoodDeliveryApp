import { useSelector, useDispatch } from 'react-redux';
import { SaveUserInfoRedux, SaveIsLoginRedux, SaveOTPRedux, SaveTempLoginData } from '../actionType';
import GlobalPath from '../../utils/GlobalPath';
import axios from 'react-native-axios';
import Constants from '../../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginAction = (data, dispatch, navigation, setLoading, setInvalidEmailPasswordShow) => {
    setLoading(true);
    let url = GlobalPath.API_URL + 'Login/LoginVerificationClient?email=' + data.Email + '&password=' + data.Password + '&deviceID=12312&playerID=1212';
        axios.get(url).then(function (response) {
            if (response.data.message === "Success") {
                let data = response.data.data[0];
                dispatch(SaveUserInfoRedux(data));
                dispatch(SaveIsLoginRedux('true'));
                
                AsyncStorage.setItem("isLoginAsync", "true").then(() => {}).catch(error => console.log(error));
                AsyncStorage.setItem("isLoginDataAsync", JSON.stringify(data)).then(()=> {}).catch(error => console.log(error));

                navigation.navigate(Constants.Navigation.Home);
                setLoading(false);
                // <DemoAlert />
            }
            else {
                setInvalidEmailPasswordShow(true);
                setLoading(false);
            }
            // console.log(response);
        }).catch(function (error) {
            console.log(error);
            setLoading(false);
        })
}

export const registerAction = (data, dispatch, navigation, setLoading) => {
    setLoading(true);
        let url = GlobalPath.API_URL + "Register/RegisterClient?username=" + data.username + "&password=" + data.password + "&email=" + data.email + "&mobileNo=" + data.mobileNO;
        axios.post(url).then(function (response) {
            let msg = response.data.message;
            let otp = response.data.otp;
            let phone = data.mobileNO;
            let email = data.email;
            let temp = { Email: data.email, Password: data.password }
            dispatch(SaveTempLoginData(temp));
            if (msg === 'Registration Successfully..') {
                dispatch(SaveOTPRedux(otp));
                navigation.navigate(Constants.Navigation.OTPVerification, { OTP: otp, PhoneNumber: phone, Email: email });
                setLoading(false);
            }
            console.log("OTP is: "+otp);
            alert("OTP is: "+otp);            

        }).catch(function (error) {
            console.log(error);
            setLoading(false);
        })
}

export const logoutAction = (dispatch) => {
    // setLoading(true);
    AsyncStorage.removeItem("isLoginAsync");
    AsyncStorage.removeItem("isLoginDataAsync");
    dispatch(SaveUserInfoRedux([]));
    dispatch(SaveIsLoginRedux('false'));
    // setLoading(false);
}

export const OTPAction = (data, dispatch, selector, navigation, setLoading) => {
    setLoading(true);

    dispatch(SaveOTPRedux(data));
    dispatch(SaveIsLoginRedux('false'));
    // setLoading(false);
}


export const DemoAlert = () => {
    return(
        <View>
            <Text>asdsad</Text>
        </View>
    )
}






// export const ForgetPasswordAction = (data, navigation, setLoading) => {
//     setLoading(true)
//     forgetPasswordApi(data).then((res) => {
//         if (res.data.success) {
//             setLoading(false)
//             Toast.show({
//                 type: "success",
//                 text1: res.data.message,
//             })
//             navigation.navigate('login')
//         }
//     }).catch((er) => {
//         console.log(er)
//         Toast.show({
//             type: "error",
//             text1: `${er.response.data.errors}`,
//         });
//         setLoading(false)
//     })
// }


// export const RegisterAction=(data,navigation,setLoading)=>{
//     setLoading(true)
//     RegisterApi(data).then((res) => {
//         if (res.data.success) {
//             Toast.show({
//                 type: "success",
//                 text1: res.data.message,
//             })
//             setLoading(false)
//             navigation.navigate('login')
            
//         }
//         if(!res.data.success){
//             Toast.show({
//                 type: "error",
//                 text1: `${res.data.message}`,
//             });
//             setLoading(false)
//         }
//     }).catch((er) => {
//         console.log(er)
//         Toast.show({
//             type: "error",
//             text1: `${er.response.data.errors}`,
//         });
//         setLoading(false)
//     })
// }

// export const LogoutAction = (dispatch) => {
//     dispatch({
//         type: LOGOUT
//     })
//     Toast.show({
//         type: "success",
//         text1: `Logout successfuly`,
//     });
// }