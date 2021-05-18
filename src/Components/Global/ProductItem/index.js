import React, { Component } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native'
import { _heightScale, 
    _widthScale, 
    WIDTH_DIMENSION,
    BASE_URL
 } from '../../../Constant/Constants'
import * as COLOR from '../../../Constant/Color/index'
import * as ScreenKey from '../../../Constant/ScreenKey'
import IMAGES from '../../../Constant/Images/index'
import { formatCurrencyVND } from '../../../Utils/utils'

class ProductItem extends Component {
    render() {

        const { item, showModalAddToCart, goToDetails } = this.props

        return (
            <TouchableWithoutFeedback
                onPress={() => goToDetails.navigate(ScreenKey.SCREEN_NOT_TAB_BOTTOM, 
                    { screen : ScreenKey.DETAILS, 
                    params : { 
                        _id : item._id
                    }})}
            >
                <View style={[style.wrapCart]}>
                    <View style={style.wrapAvatarCart}>
                        <Image
                            style={[style.avatarCart]}
                            source={{ uri : BASE_URL + item.thumbnail }}
                        />   
                    </View>
                    <View style={[style.wrapInfoCart]}>
                    <Text style={[style.price]}>
                                { formatCurrencyVND(item.price) }
                            </Text>
                        <Text numberOfLines={3}
                            style={[style.titleCart]}>
                            { item.name }
                        </Text>
                        <View style={[style.priceCart]}>
                            {/* <Text style={[style.price]}>
                                { formatCurrencyVND(item.price) }
                            </Text> */}
                             <TouchableOpacity
                                style={{ flex : 1, marginRight : _widthScale(10) }}
                                onPress={showModalAddToCart}
                                >
                                <View style={style.wrapTxtBuyNow}>
                                    <Text style={[{ color : COLOR.WHITE, fontWeight : 'bold', fontSize : _heightScale(16) }]}>
                                        Mua ngay
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={showModalAddToCart}
                                >
                                <View style={style.wrapIconCart}>
                                    <Image
                                        style={style.iconCart}
                                        source={IMAGES.ICON_CART_WHITE}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const style = StyleSheet.create({
    wrapCart : {
        // 20(marin cart item x2) + 16~19 (padding 2 bên)
        width : (WIDTH_DIMENSION - _widthScale(39))/2,
        margin : _widthScale(5),
        backgroundColor : COLOR.WHITE,
        borderRadius : _widthScale(5),
        overflow : 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    wrapAvatarCart : {
        borderBottomWidth : 1,
        borderBottomColor : COLOR.TEXT_GREY
    },
    avatarCart : {
        width : '100%',
        height : _heightScale(200),
    },
    wrapInfoCart : {
        flex : 1,
        justifyContent : 'space-between',
        padding : _widthScale(8),
        paddingTop : _heightScale(15)
    },
    titleCart : {
        color : COLOR.TEXT_NORMAL,
        fontSize : _heightScale(15),
        lineHeight : _heightScale(20),
        marginTop :_widthScale(5),
        fontWeight : 'bold'
    },
    priceCart : {
        marginTop : _widthScale(15),
        marginBottom : _widthScale(5),
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent : 'space-between'
    },
    price : {
        fontSize : _heightScale(20),
        color : COLOR.MAIN_COLOR,
        fontWeight : 'bold'
    },
    wrapIconCart : {
        width : _widthScale(35),
        height : _widthScale(30),
        borderRadius : 5,
        backgroundColor : COLOR.TEXT_GREY,
        justifyContent : 'center',
        alignItems : 'center',
    },
    wrapTxtBuyNow : {
        width : '100%',
        backgroundColor : COLOR.MAIN_COLOR,
        height : _widthScale(30),
        borderRadius : 5,
        backgroundColor : COLOR.MAIN_COLOR,
        justifyContent : 'center',
        alignItems : 'center'
    },
    iconCart : {
        width : _widthScale(13),
        height : _widthScale(13)
    }
})

export default ProductItem