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

class ButtonYeuThich extends Component {
    render() {

        const { navigation } = this.props

        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => { 
                    navigation.navigate(ScreenKey.CART_NAVIGATOR, { screen : ScreenKey.FAVORITE })
                }}
                >
                <View style={[style.container]}>
                    <Image
                        style={[style.icon]}
                        source={IMAGES.ICON_LIST_FAVORITE}
                    />
                    <View style={[style.wrapTotal]}>
                        <Text style={[style.total]}>0</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const style = StyleSheet.create({
    container : {
        width : _heightScale(30),
        height : _heightScale(30),
        position : 'relative',
        justifyContent : 'center',
        alignItems : 'center'
        
    },
    icon : {
        width : _heightScale(30),
        height : _heightScale(30)
    },
    wrapTotal : {
        position : 'absolute',
        top : _heightScale(-10),
        right : _heightScale(-10),
        width : _heightScale(25),
        height : _heightScale(25),
        borderRadius : _heightScale(25/2) ,
        backgroundColor : COLOR.MAIN_COLOR,
        justifyContent : 'center',
        alignItems : 'center'
    },
    total : {
        color : COLOR.WHITE,
        fontSize : _heightScale(14),
        fontWeight : 'bold'
    }
})

export default ButtonYeuThich