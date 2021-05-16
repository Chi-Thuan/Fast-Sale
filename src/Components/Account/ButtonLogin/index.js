import React, { Component } from 'react'
import {
    StyleSheet, 
    TouchableOpacity, 
    View, 
    Text,
    Image,
} from 'react-native'
import { _widthScale, _heightScale, NAME_APP }  from '../../../Constant/Constants'
import IMAGES from '../../../Constant/Images/index'
import * as COLOR from '../../../Constant/Color/index'
import * as ScreenKey from '../../../Constant/ScreenKey' 

class ScreenNotLogin extends Component {
    render() {

        const { navigation } = this.props

        return (
            <TouchableOpacity
                onPress={() => { navigation.navigate(ScreenKey.SCREEN_NOT_TAB_BOTTOM, { screen : ScreenKey.LOGIN }) }}
                activeOpacity={0.7}>
                <View style={[style.container]}>
                   <View style={[style.wrapIcon]}>
                        <Image 
                            style={[style.icon]}
                            source={IMAGES.ICON_ACCOUNT_WHITE}
                            />
                    </View>
                    <View>
                        <Text style={[style.txtTitle]}>
                            {`Chào mừng bạn đến với ${NAME_APP}`}
                        </Text>
                        <Text style={[style.txtLogin]}>
                            Đăng nhập/Đăng ký
                        </Text>
                    </View>
                    <Image 
                        style={[style.iconArrow]}
                        source={IMAGES.ICON_ARROW_RIGHT_ACTIVE}
                    />
                </View>
            </TouchableOpacity>
        )
    }
}

const style = StyleSheet.create({
    container : {
        backgroundColor : COLOR.WHITE,
        position : 'relative',
        height : _heightScale(100),
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingRight : _widthScale(18),
        paddingLeft : _widthScale(18+70),
    },
    wrapIcon: {
        backgroundColor : COLOR.MAIN_COLOR,
        position : 'absolute',
        width : _heightScale(65),
        height : _heightScale(65),
        top : _heightScale(17),
        left : _heightScale(18),
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : _heightScale(65/2)
    },
    icon : {
        width : _heightScale(25),
        height : _heightScale(28)
    },
    txtTitle : {
        color : COLOR.TEXT_BLACK,
        fontSize : _heightScale(18)
    },
    txtLogin : {
        color : COLOR.MAIN_COLOR,
        fontSize : _heightScale(18),
        marginTop : _heightScale(5),
        fontWeight : 'bold',
        letterSpacing : _heightScale(0.2)
    },
    iconArrow : {
        width : _heightScale(9.16),
        height : _heightScale(14.67)
    }
})

export default ScreenNotLogin