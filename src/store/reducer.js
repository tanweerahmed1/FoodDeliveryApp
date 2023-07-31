import { SET_LOADING, SAVE_OTP_REDUX, SAVE_USERINFO_REDUX, SAVE_ISLOGIN_REDUX, SAVE_DASHBOARD_DATA, SAVE_TEMP_LOGIN, CART_STORE_ADD, CART_STORE_MINUS, ADD_NOTIFICATION_MESSAGE_RESPONSE } from './actionType';

const initialState = {
    userInfo: [],
    loading: false,
    isLogin: 'false',
    testing: 'Qasim from store',
    otp: '',
    homeData: [],
    tempLoginData: [],
    cartStore: [],
    notificationMessage: '',
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case SET_LOADING:
            return { ...state, loading: action.payload };
        case SAVE_DASHBOARD_DATA:
            return { ...state, homeData: action.payload };
        case SAVE_OTP_REDUX:
            return { ...state, otp: action.payload };
        case SAVE_USERINFO_REDUX:
            return { ...state, userInfo: action.payload };
        case SAVE_ISLOGIN_REDUX:
            return { ...state, isLogin: action.payload };
        case SAVE_TEMP_LOGIN:
            return { ...state, tempLoginData: action.payload };
        case CART_STORE_ADD:
            return { ...state, cartStore: action.payload };
        case CART_STORE_MINUS:
            return { ...state, cartStore: action.payload };
        case ADD_NOTIFICATION_MESSAGE_RESPONSE:
            return { ...state, notificationMessage: action.payload };
        default: 
            return state;
    }
}
export { reducer };