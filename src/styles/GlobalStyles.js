import { StyleSheet, Dimensions } from "react-native";
import Constants from "../utils/Constants";
import { ShadowStyle } from '../styles/ShadowStyle';

const { width: PAGE_WIDTH } = Dimensions.get('window');

export default StyleSheet.create({
    // row and spae between
    Row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    Row_leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    Row_rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    ///////////// end /////////////////
    textBold5: {
        fontWeight: '500'
    },
    textOnClick: {
        paddingLeft: 10,
        paddingRight: 6,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 19
    },
    containerBox: {
        // borderRadius: 7,
        marginLeft: 7,
        marginRight: 7,
        marginTop: 15,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
    },
    errorValidationText: {
        color: 'red', 
        paddingLeft: 25, 
        marginTop: -7, 
        marginBottom: 3, 
        fontWeight: '700'
    }


})