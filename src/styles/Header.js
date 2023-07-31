import { StyleSheet, Dimensions } from "react-native";
import Constants from "../utils/Constants";

const { width: PAGE_WIDTH } = Dimensions.get('window');

export default StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        height: 55,
        // backgroundColor: '#ffff',

        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 4,
        // },
        // shadowOpacity: 0.30,
        // shadowRadius: 4.65,

        // elevation: 8,
    },
    headerContainerHide: {
        flexDirection: 'row',
        height: 55,
    },
    headerIcon: {
        width: 50,
        paddingLeft: 8,
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 20,
        paddingTop: 11,
        fontWeight: '700',
        color: 'black'
    },
    headerTextCenter: {
        fontSize: 20,
        paddingTop: 11,
        fontWeight: '700',
        color: 'black',
        textAlign: 'center'
    },
    headerImageContainer: {
        width: 50,
        // backgroundColor: 'yellow',
        paddingLeft: Constants.SIZES.padding * 2,
        justifyContent: 'center',
    },
    headerImage: {
        width: 30,
        height: 30,
    },
    headerLocationContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerLocationTextWrapper: {
        width: '70%',
        height: '100%',
        backgroundColor: Constants.Colors.lightGray3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Constants.SIZES.radius,
    },
    headerRightImageContainer: {
        width: 50,
        paddingRight: Constants.SIZES.padding * 2,
        justifyContent: 'center',
        right: 0
    },
    searchInputContainer: {
        width: '88%',
        height: 43,
        // backgroundColor: 'blue',
        // borderRadius: 8,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 0.1,
        // borderColor: 'black'

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 2,
    }
})