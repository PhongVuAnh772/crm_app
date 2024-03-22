import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import coinIcon from '../../assets/coins.png'

const PersonalHeader = () => {
  return (
    <View style={styles.container}>
        <View style={styles.coinContainer}>
            {/* <FontAwesome6 name="coins" size={16} color="black" /> */}
            <Image source={coinIcon} style={styles.coinIconAssets}/>
            <Text style={styles.coinText}>885</Text>
        </View>
        {/* <View style={styles.infoContainer}></View> */}
    </View>
  )
}

export default PersonalHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Sử dụng flexbox để đảm bảo các phần tử con sắp xếp theo hàng ngang
        justifyContent: 'flex-end', // Đặt phần tử con sang phải
        alignItems: 'center', // Canh chỉnh các phần tử con theo chiều dọc
        padding: 10,
    },
    coinContainer: {
        paddingVertical: 5 ,
        paddingHorizontal: 10,
        backgroundColor:'rgb(255, 187, 16)',
        alignSelf: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    coinText: {
        fontSize: 16,
        color:'black',
        fontWeight: '500',
        paddingLeft: 15
    },
    coinIconAssets: {
        width: 15,
        height: 15,
        resizeMode:'contain'
    },
    
})
