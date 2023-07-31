import { StyleSheet, View, ActivityIndicator, Image } from 'react-native'
import React, { useState } from 'react';
import Lottie from 'lottie-react-native';
import Constants from '../utils/Constants';
import Logo from '../assets/icons/Logo.png';
// import {} from '../assets/icons/error.gif';

const ProgressiveImage = ({ imagePath, style, resizeMode }) => {
    const [showDefault, setShowDefault] = useState(true);
    const [error, setError] = useState(false);

    return (
        <View style={showDefault ? styles.loaderContainer : null}>
            <Image style={showDefault ? [ ...style, styles.loaderView ] : style}
                // source={showDefault ? require('../assets/icons/loading.gif') : (error ? require('../assets/icons/error.gif') : { uri: imagePath })}
                source={showDefault ?
                    require('../assets/icons/loading.gif')
                    :
                    (error ? require('../assets/icons/error.gif') : { uri: imagePath })}
                onLoadEnd={() => setShowDefault(false)}
                onError={() => setError(true)}
                resizeMode={resizeMode}
            />
        </View>
    )
}

export default ProgressiveImage;

const styles = StyleSheet.create({
    loaderView: {
        width: '65%',
        // height: 40,
        // marginLeft: 30,
        // marginHorizontal: '45%',
        // marginVertical: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center'
        // resizeMode: 'cover',
        // backgroundColor: 'red'

    },
    loaderContainer: {
        borderRadius: 11,
        backgroundColor: Constants.Colors.lightGray3,
        // backgroundColor: 'red'
    },

})