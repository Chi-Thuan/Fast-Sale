import React, { Component } from 'react'
import {
    StyleSheet, 
    TouchableOpacity, 
    View, 
    Text,
    Image,
} from 'react-native'
import { _heightScale, _widthScale } from '../../../Constant/Constants'
import IMAGES from '../../../Constant/Images/index'
import * as COLOR from '../../../Constant/Color/index'
import * as ScreenKey from '../../../Constant/ScreenKey'

class EmptyCart extends Component {
    render() {
        return (
            <View style={[style.container]}>

               <View style={[style.wrapIcon]}>
                    <Image 
                            style={[style.icon]}
                            source={IMAGES.EMPTY_CART}
                        />
                </View>

                <View style={[style.wrapTxtEmpty]}>
                    <Text style={[style.txtEmpty]}>
                        Không có sản phẩm nào trong giỏ hàng
                    </Text>
                    <TouchableOpacity
                        onPress={ () => this.props.goHome.navigate(ScreenKey.HOME) }>
                        <View style={[style.btnGoHome]}>
                            <Text style={[style.txtBtn]}>Đi mua sắm</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View> 
        )
    }
}

const style = StyleSheet.create({
    container : {
        width : _widthScale(375),
        height : _heightScale(480),
        backgroundColor : COLOR.GREY_WHITE,
        alignItems : 'center'
    },
    wrapIcon : {
        justifyContent : 'center',
        alignItems : 'center',
        width : _widthScale(370),
        height : _heightScale(300),
        marginTop : _heightScale(20)
    },
    wrapItemTrending : {
        marginHorizontal : _widthScale(8), 
        justifyContent : 'center', 
        flexDirection : 'row', 
        flexWrap: 'wrap'
    },

    icon : {
        width : '100%',
        height : '100%',
        resizeMode : 'cover'
    },
    wrapTxtEmpty : {
        alignItems : 'center'
    },
    txtEmpty : {
        color : COLOR.TEXT_GREY,
        fontSize : _heightScale(18)
    },
    btnGoHome : {
        borderWidth : 2,
        borderColor : COLOR.MAIN_COLOR,
        borderRadius : 30,
        justifyContent : 'center',
        alignItems : 'center',
        width : _widthScale(120),
        height : _heightScale(50),
        marginTop : _heightScale(30)
    },
    txtBtn : {
        fontSize : _heightScale(18),
        color : COLOR.MAIN_COLOR,
        textTransform : 'uppercase',
        fontWeight : 'bold'
    }
})

export default EmptyCart