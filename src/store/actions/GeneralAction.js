import { useSelector, useDispatch } from 'react-redux';
import { SaveUserInfoRedux, SaveIsLoginRedux, SaveOTPRedux } from '../actionType';
import GlobalPath from '../../utils/GlobalPath';
import axios from 'react-native-axios';
// import axios from 'axios';
import Constants from '../../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiHandler} from '../../Api/apiHandler'



export const updateProfileAction = (data, dispatch, navigation, setLoading) => {
    setLoading(true);
    
    // let url = GlobalPath.API_URL + 'Profile/UpdateProfileWithLoginIDDemo?loginID='+data.loginID+'&username='+data.username+'&email='+data.email+'&mobileNo='+data.mobileNo+'&address='+data.address+'&profileImg='+data.profileImg;
    
    // axios.post(url).then(function(response){
    //     alert(response);
        
    //     setLoading(false);
    //     // alert(response);
    // }).catch(function(error){
    //     // console.log(error);
    //     setLoading(false);
    //     alert(error);
    // })
    
    //////////////////////////////////////////////////////////////////////////////    
    const formData = new FormData();
    // // let url = 'https://localhost:44378/api/Profile/UpdateProfileWithLoginID'; 
    // let url = GlobalPath.API_URL + 'Profile/UpdateProfileWithLoginID';
    let url = GlobalPath.API_URL + 'Profile/UpdateProfileWithLoginIDWithPut';

    formData.append('loginID', data.loginID);
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('mobileNo', data.mobileNo);
    formData.append('address', data.address);
    
    formData.append('profileImg', data.profileImg);
    // formData.append('profileImgPath', '');

    // axios.post(url, formData ).then(function(response){
    //     console.log(response);
    //     alert(JSON.stringify(response));
    //     setLoading(false);
    //     alert(response);
    // }).catch(function(error){
    //     console.log(error);
    //     setLoading(false);
    //     alert(error);
    // })
    ///////////////////////////////////////////////

    // const formData = new FormData();
    // formData.append('loginID', data.loginID);
    // formData.append('username', data.username);
    // formData.append('email', data.email);
    // formData.append('mobileNo', data.mobileNo);
    // formData.append('address', data.address);
    // formData.append('profileImg', data.profileImg);

    fetch(url, {
      method: 'PUT',
      body: formData,
    })
      .then(response => {
        alert(JSON.stringify(response));
        setLoading(false);
        // Handle the response as needed
      })
      .catch(error => {
        alert('ERROR '+ error);
        setLoading(false);
        // Handle any errors
      });

/////////////////////////////////////////////////////////////////

    // axios({
    //     method: 'post',
    //     url: url,
    //     data: formData,
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //   })
    //     .then(function (response){
    //         console.log(response);
    //     })
    //     .catch(error => console.error(error));


    // apiHandler().post('Profile/UpdateProfileWithLoginID', formData).then(function(response){
    //     console.log(response);
    // }).catch(function (error) {
    //     console.log(error.response.data);
    //     setLoading(false);
    // })




    // axios.get(url).then(function (response) {


    // alert(response);
    // if (response.data.message === "Success") {

    // let data = response.data.data[0];
    // dispatch(SaveUserInfoRedux(data));
    // dispatch(SaveIsLoginRedux('true'));

    // AsyncStorage.setItem("isLoginAsync", "true").then(() => {}).catch(error => console.log(error));
    // AsyncStorage.setItem("isLoginDataAsync", JSON.stringify(data)).then(()=> {}).catch(error => console.log(error));

    // navigation.navigate(Constants.Navigation.Home);
    // setLoading(false);
    // }
    // else {
    //     setInvalidEmailPasswordShow(true);
    //     setLoading(false);
    // }
    // console.log(response);
    // }).catch(function (error) {
    //     console.log(error);
    //     alert(error);
    //     setLoading(false);
    // })
}