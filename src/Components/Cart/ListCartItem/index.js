import React, { Component } from 'react'
import {
    StyleSheet, 
    TouchableOpacity, 
    View, 
    Text,
    Image,
    ScrollView,
} from 'react-native'
import { _heightScale, _widthScale } from '../../../Constant/Constants'
import IMAGES from '../../../Constant/Images/index'
import * as COLOR from '../../../Constant/Color/index'
import * as ScreenKey from '../../../Constant/ScreenKey'
import { formatCurrencyVND } from '../../../Utils/utils'
import LinearGradient from 'react-native-linear-gradient';
import CartItem from '../CartItem/index'
import * as _font from '../../../Constant/Font'

class ListCartItem extends Component {
    render() {

        const { navigation, data, updateCart, totalPrice, navigateCheckout } = this.props
        return (
            <View style={[style.container]}>
                
                <ScrollView 
                    showsVerticalScrollIndicator ={false}
                    style={[style.wrapListItem]}>
                    { data.map((item, index) =>  <CartItem updateCart={updateCart} key={index} data={item} navigation={navigation} /> ) }
                </ScrollView>

                <View style={[style.wrapRowCheckout]}>
                    <View>
                        <Text style={[_font.stylesFont.fontNolanBold ,style.titleTotal]}>
                            Tổng cộng
                        </Text>
                        <Text style={[_font.stylesFont.fontDinTextProBold, style.txtTotal]}>
                            {formatCurrencyVND(totalPrice)}
                        </Text>
                    </View>
                   <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={navigateCheckout}
                    >
                         <LinearGradient 
                            start={{x: 1, y: 1}}
                            end={{x: 0, y: 0}}
                            colors={['#4E37D3', '#2481D6']}
                            style={style.wrapBtnPay}
                            >
                            <Text style={[style.txtBtnPay]}>
                                Thanh toán
                            </Text>
                    </LinearGradient>
                   </TouchableOpacity>
                </View>
            </View> 
        )
    }
}

const style = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'space-between',
    },
    wrapListItem : {
        width : '100%',
        marginBottom : _heightScale(10)
    },
    wrapRowCheckout : {
        width : '100%',
        paddingHorizontal : _widthScale(18),
        height : _heightScale(85),
        backgroundColor : COLOR.WHITE,
        borderTopWidth : 1,
        borderColor : COLOR.GREY,
        flexDirection : 'row',
        alignItems : 'center',
        borderTopLeftRadius : 15,
        borderTopRightRadius : 15,
        justifyContent : 'space-between'
    },
    titleTotal : {
        fontSize : _heightScale(18),
        color : COLOR.TEXT_NORMAL
    },
    txtTotal : {
        fontSize : _heightScale(26),
        color : COLOR.MAIN_COLOR,
        marginTop : _heightScale(3)
    },
    wrapBtnPay : {
        width : _widthScale(120),
        height : _heightScale(55),
        backgroundColor : COLOR.MAIN_COLOR,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 40
    },
    txtBtnPay : {
        color : COLOR.WHITE,
        fontSize : _heightScale(18),
        textTransform : 'uppercase',
        fontWeight : 'bold'
    }
})

export default ListCartItem