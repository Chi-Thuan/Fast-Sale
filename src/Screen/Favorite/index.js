import React, {Component} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImagePropTypes, ScrollView } from 'react-native'
import AsyncStorage  from '@react-native-async-storage/async-storage'

import { _widthScale, _heightScale }  from '../../Constant/Constants'
import * as COLOR from '../../Constant/Color/index'
import { getProductById } from '../../Services/api'
import ButtonYeuThich from '../../Components/Cart/ButtonYeuThich/index'
import EmptyCart from '../../Components/Cart/EmptyCart/index'
import ProductOffer from '../../Components/Cart/ProductOffer/index'
import ListCartItem from '../../Components/Cart/ListCartItem/index'
import * as ScreenKey from '../../Constant/ScreenKey'
import ModalAddToCart from '../../Components/Modal/ModalAddToCart/index'
import ComponentLoading from '../../Components/Loading/index'

class Cart extends Component {

    render() {
        
        return(
            <View style={style.container}>

                <View style={[style.wrapTitle]}>
                    <Text style={style.title}>
                            Danh sách yêu thích
                    </Text>
                </View>

            </View>
        )
    }
   
}

const style = StyleSheet.create({
    container : {
        flex : 1,
    },
    wrapTitle : {
        paddingHorizontal : _widthScale(18),
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        height : _heightScale(70),
        backgroundColor : COLOR.WHITE
    },
    title : {
        fontSize : _heightScale(24),
        color : COLOR.BLACK,
        fontWeight : 'bold',
    }
})

export default Cart