import { useSelector, useDispatch } from 'react-redux';
import { SetLoading, SaveDashboardData  } from '../actionType';
import GlobalPath from '../../utils/GlobalPath';
import Constants from '../../utils/Constants';
import axios from 'react-native-axios';

// const dispatch = useDispatch();

export const GetDashboardData = (dispatch) => {
    // SetLoading(true);
        let url = GlobalPath.API_URL + Constants.ApiController.FoodMenu + 'GetAllFoodMenuClient';

        axios.get(url).then(function (response) {
            console.log(response);
            if (response.data.message === "Success") {
                dispatch(SaveDashboardData(response.data));
                // dispatch(SaveDashboardData(response.data));
                // dispatch(SaveIsLoginRedux('true'))
                // navigation.navigate(Constants.Navigation.Home);
                // setLoading(false);
                // alert(JSON.stringify(data));
            }

            console.log(response);
            SetLoading(false);

        }).catch(function (error) {
            console.log(error);
            SetLoading(false);
        })

        



    // loginApi(data).then((res) => {
    //     if (res.data.success) {
    //         storeTokensInStorage({ accessToken: res?.data?.accessToken, userId: res?.data?.data?.userRef })
    //         setLoading(false);
    //         dispatch({
    //             type: LOGINCONSTACT,
    //             payload: res.data
    //         })
    //         Toast.show({
    //             type: "success",
    //             text1: `Login successfuly`,
    //         });
    //     }
    // }).catch((er) => {
    //     Toast.show({
    //         type: "error",
    //         text1: `${er.response.data.errors}`,
    //     });
    //     setErr(er.response.data.errors);
    //     setLoading(false);
    // })
}


export const GetTest = () => {
    alert('testing');
}