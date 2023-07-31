import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React from 'react';

const Loader = ({ loading }) => {
    return (
        <>
            {
                loading &&
                <View style={styles.container}>
                    <View style={styles.loaderView}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                </View >
            }
        </>
    )
}

export default Loader;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        position: 'absolute', 
        width: "100%", 
        zIndex: 200, 
        height: "100%", 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    loaderView: {
        padding: 20, 
        borderRadius: 10, 
        backgroundColor: "white"
    }

})