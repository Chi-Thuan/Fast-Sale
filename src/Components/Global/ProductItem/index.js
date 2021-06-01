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
import * as _font from '../../../Constant/Font'
import LinearGradient from 'react-native-linear-gradient';

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
                            source={{ uri : item.isThumbnailURL ? item.thumbnail : BASE_URL + item.thumbnail }}
                        />   
                    </View>
                    <View style={[style.wrapInfoCart]}>
                    <Text numberOfLines={3}
                            style={[_font.stylesFont.fontDinTextPro , style.titleCart]}>
                            { item.name }
                        </Text>
                    <Text style={[_font.stylesFont.fontFester500, style.price]}>
                                { formatCurrencyVND(item.price) }
                            </Text>
                      
                        <View style={[style.priceCart]}>
                             <TouchableOpacity
                                style={{ flex : 1, marginRight : _widthScale(10) }}
                                onPress={showModalAddToCart}
                                activeOpacity={0.7}
                                >
                                    <LinearGradient 
                                        start={{x: 1, y: 1}}
                                        end={{x: 0, y: 0}}
                                        colors={['#4E37D3', '#2481D6']}
                                        style={style.wrapTxtBuyNow}
                                        >
                                        <Text style={[_font.stylesFont.fontNolanBold, { color : COLOR.WHITE, fontSize : _heightScale(16) }]}>
                                            Mua ngay
                                        </Text>
                                    </LinearGradient>
                               
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={showModalAddToCart}
                                activeOpacity={0.7}
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
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        
        elevation: 1,
    },
    wrapAvatarCart : {
        width : '100%',
        height : _heightScale(130),
        padding : _heightScale(5)
    },
    avatarCart : {
        width : '100%',
        height : '100%',
        resizeMode : 'cover'
    },
    wrapInfoCart : {
        flex : 1,
        justifyContent : 'space-between',
        padding : _widthScale(8),
        paddingTop : _heightScale(15)
    },
    titleCart : {
        color : COLOR.TEXT_NORMAL,
        fontSize : _heightScale(18),
        lineHeight : _heightScale(22),
    },
    priceCart : {
        marginTop : _widthScale(25),
        marginBottom : _widthScale(5),
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent : 'space-between'
    },
    price : {
        marginTop : _heightScale(6),
        fontSize : _heightScale(24),
        color : COLOR.MAIN_COLOR,
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
        height : _widthScale(30),
        borderRadius : 5,
        justifyContent : 'center',
        alignItems : 'center'
    },
    iconCart : {
        width : _widthScale(13),
        height : _widthScale(13)
    }
})

export default ProductItem