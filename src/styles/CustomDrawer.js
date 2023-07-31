import { StyleSheet, Dimensions } from "react-native";
import Constants from "../utils/Constants";

const { width: PAGE_WIDTH } = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 2,
        // backgroundColor: Constants.Colors.themeColorDrawer,
        backgroundColor: Constants.Colors.lightGray4
    },
    profileImageContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',

        paddingLeft: 10,
        paddingTop: 19,
    },
    profileImage: {
        width: 75,
        height: 75,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: '#e66f05'
    },
    HeaderText1: {
        // fontFamily: 'Cochin',
        fontFamily: 'Roboto-regular',
        lineHeight: 22,
        fontSize: 19,
        fontWeight: "bold",
        // color: Constants.Colors.white,
        color: 'black',
        paddingTop: 16
    },
    HeaderText2: {
        // fontFamily: 'Cochin',
        fontFamily: 'Roboto-regular',
        lineHeight: 7,
        fontSize: 14,
        fontWeight: "bold",
        // color: Constants.Colors.white,
        color: 'black',
        paddingTop: 12,
        paddingLeft: 5
    },
    DrawerOptionContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 14,
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 14,

        width: '100%',
        // height: 50,
        // backgroundColor: '#EE5407',
        // justifyContent: 'center',
        alignItems: 'center',
        // position: 'absolute', //Here is the trick
        // bottom: -69, //Here is the trick
        // zIndex: 10
    },
    DrawerOptionText: {
        color: 'black',
        marginLeft: 5,
        fontWeight: '600'
    }

})