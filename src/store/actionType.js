export const SAVE_OTP_REDUX = "SAVE_OTP_REDUX";
export const SAVE_USERINFO_REDUX = "SAVE_USERINFO_REDUX";
export const SAVE_ISLOGIN_REDUX = "SAVE_ISLOGIN_REDUX";
export const SET_LOADING = "SET_LOADING";
export const SAVE_DASHBOARD_DATA = "SAVE_DASHBOARD_DATA";
export const SAVE_TEMP_LOGIN = "SAVE_TEMP_LOGIN";
export const CART_STORE_ADD = "CART_STORE_ADD";
export const CART_STORE_MINUS =  "CART_STORE_MINUS";
export const ADD_NOTIFICATION_MESSAGE_RESPONSE =  "ADD_NOTIFICATION_MESSAGE_RESPONSE";

export const SetLoading = (data) => {
    return{
        type: SET_LOADING,
        payload: data
    }
}

export const SaveDashboardData = (data) => {
    return{
        type: SAVE_DASHBOARD_DATA,
        payload: data
    }
}

export const SaveOTPRedux = (data) => {
    return{
        type: SAVE_OTP_REDUX,
        payload: data
    }
}

export const SaveUserInfoRedux = (data) => {
    return{
        type: SAVE_USERINFO_REDUX,
        payload: data
    }
}

export const SaveIsLoginRedux = (data) => {
    return{
        type: SAVE_ISLOGIN_REDUX,
        payload: data
    }
}

export const SaveTempLoginData = (data) => {
    return{
        type: SAVE_TEMP_LOGIN,
        payload: data
    }
}

export const AddDataToCart = (data) => {
    return{
        type: CART_STORE_ADD,
        payload: data
    }
}

export const AddNotificationMessageResponse = (data) => {
    return{
        type: ADD_NOTIFICATION_MESSAGE_RESPONSE,
        payload: data
    }
}

export const MinusDataToCart = (data) => {
    return{
        type: CART_STORE_MINUS,
        payload: data
    }
}

