import React, { Component } from 'react'
import {
    StyleSheet, 
    TouchableOpacity, 
    View, 
    Text,
    Image,
    Alert,
    TouchableWithoutFeedback
} from 'react-native'
import AsyncStorage  from '@react-native-async-storage/async-storage'

import { BASE_URL } from '../../../Constant/Constants' 
import { _heightScale, _widthScale } from '../../../Constant/Constants'
import IMAGES from '../../../Constant/Images/index'
import * as COLOR from '../../../Constant/Color/index'
import * as ScreenKey from '../../../Constant/ScreenKey'
import { formatCurrencyVND } from '../../../Utils/utils'
import ButtonYeuThich from '../../../Components/Cart/ButtonYeuThich/index'

class CartItem extends Component {

    render() {
        const { removeProduct, navigation } = this.props
        return (
            <View style={[style.container]}>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => { navigation.navigate(ScreenKey.SCREEN_NOT_TAB_BOTTOM, { screen : ScreenKey.DETAILS, params : {  _id : '609b7b6851f089bd2142d4be' } }) }}
                >
                    <View style={[style.wrapAvatar]}>
                        <Image
                            style={[style.avatar]}
                            // source={{ uri : BASE_URL + data.thumbnail }}
                            source={{ uri : 'https://salt.tikicdn.com/cache/w444/ts/product/68/23/2b/db905c71f7916d9fcb03b6f755935b17.jpg' }}
                        />
                    </View>
                </TouchableOpacity>

                <View style={[style.wrapInfoItem]}>
                    <TouchableOpacity style={{ marginRight : _widthScale(30) }}
                        activeOpacity={0.7}
                         onPress={() => { navigation.navigate(ScreenKey.SCREEN_NOT_TAB_BOTTOM, { screen : ScreenKey.DETAILS, params : {  _id : '609b7b6851f089bd2142d4be' } }) }}
                        >
                        <Text 
                            style={[style.titleItem]}
                            numberOfLines={3}
                        >  
                            Macbook Pro 13 inch 2020 Quad Core I5 1.4Ghz 8GB 256GB (MXK32, MXK62) New 99%
                            {/* { data.name } */}
                        </Text>
                    </TouchableOpacity>
                    
                    <View style={[style.wrapInfoBottom]}>
                        <Text style={[style.txtPrice]}>
                        { formatCurrencyVND(2000000) }
                        </Text>
                    </View>
                </View>
            
                <TouchableWithoutFeedback
                            activeOpacity={0.7}
                            style={[style.wrapBtnDelete]}
                            onPress={removeProduct}
                        >
                            <View style={[style.wrapBtnFavorite, 
                                ]}>
                                <Image 
                                    style={[style.btnFavorite]}
                                    source={IMAGES.ICON_FAVORITE}
                                />
                            </View>
                        </TouchableWithoutFeedback>
            </View> 
        )
    }
}

const style = StyleSheet.create({
    container : {
        paddingHorizontal : _widthScale(18),
        backgroundColor : COLOR.WHITE,
        width : '100%',
        height :_heightScale(140),
        flexDirection : 'row',
        alignItems : 'center',
        position : 'relative',
    },
    wrapBtnDelete : {
        position : 'absolute',
        top : _heightScale(20),
        right :_widthScale(18)
    },
    wrapAvatar : {
        borderRadius : 10,
        overflow : 'hidden',
        width : _heightScale(100),
        height : _heightScale(100)
    },
    avatar : {
        width : '100%',
        height : '100%',
        resizeMode : 'contain'
    },
    wrapInfoItem : {
        flex : 1,
        height : '100%',
        paddingVertical : _heightScale(20),
        marginLeft : _widthScale(15),
        justifyContent : 'space-between'
    },
    titleItem : {
        fontSize : _heightScale(16),
        color : COLOR.TEXT_BLACK,
        lineHeight : _heightScale(20)
    },
    wrapInfoBottom : {
        flexDirection : 'row',
        alignItems : 'flex-end',
        justifyContent : 'space-between',
    },
    txtPrice : {
        fontSize : _heightScale(20),
        fontWeight : 'bold'
    },
    wrapBtnFavorite : {
        width : _heightScale(38),
        height : _heightScale(38),
        borderRadius : _heightScale(38/2),
        justifyContent : 'center',
        alignItems : 'center',
        borderWidth : 1,
        borderColor : COLOR.MAIN_COLOR,
        backgroundColor : COLOR.MAIN_COLOR
    },
    btnFavorite : {
        width : _heightScale(21),
        height : _heightScale(17),
    },
})

export default CartItem