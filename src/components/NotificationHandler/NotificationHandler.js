import { StyleSheet, View, ActivityIndicator, Text } from 'react-native'
import React, { useEffect } from 'react';


const NotificationHandler = () => {
    useEffect(()=>{
        alert('asd')
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.loaderView}>
                <Text>hello</Text>
                {/* <ActivityIndicator size="large" color="#0000ff" /> */}
            </View>
        </View >
    )
}
export default NotificationHandler;

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