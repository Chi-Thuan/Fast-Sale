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
import Icon from 'react-native-vector-icons'

class ScreenNotLogin extends Component {
    render() {

        const { navigation, userLogin } = this.props

        return (
            <TouchableOpacity
                onPress={() => { navigation.navigate(ScreenKey.SCREEN_NOT_TAB_BOTTOM, { screen : ScreenKey.PROFILE }) }}
                activeOpacity={0.7}>
                <View style={[style.container]}>
                   <View style={[style.wrapIcon]}>
                        <Image 
                            style={[style.icon]}
                            source={{ uri : userLogin.avatar || 'https://chithuancamau2.tk/upload/images/Personal.png' }}
                            />
                    </View>
                    <View>
                        <Text style={[style.txtTitle]}>
                            Xin chào,
                            <Text style={[{fontWeight : 'bold', color : COLOR.BLACK }]}>
                                {` ${userLogin.fullname}`}
                            </Text>
                        </Text>
                        <Text style={[style.txtLogin]}>
                            Thông tin tài khoản
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
        // backgroundColor : COLOR.MAIN_COLOR,
        position : 'absolute',
        width : _heightScale(65),
        height : _heightScale(65),
        top : _heightScale(17),
        left : _heightScale(18),
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : _heightScale(65/2),
        overflow : 'hidden'
    },
    icon : {
        width : '100%',
        height : '100%'
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