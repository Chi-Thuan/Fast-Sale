import React, { Component } from 'react'
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
 } from 'react-native'

import * as COLOR from '../../../Constant/Color/index'
import { _heightScale } from '../../../Constant/Constants'
import * as _font from '../../../Constant/Font'

class ButtonPrimaryFullRow extends Component {
    render () {

        const { txtTitle, chooseAccept } = this.props

        return(
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={chooseAccept}
                >
                <View style={style.container}>
                    <Text style={[_font.stylesFont.fontDinTextPro , style.title]}>
                        {txtTitle}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const style = StyleSheet.create({
    container : {
        width : '100%',
        height : _heightScale(55),
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : COLOR.MAIN_COLOR,
        borderRadius : 40
    },
    title : {
        color : COLOR.WHITE,
        fontSize : _heightScale(22),
        textTransform : 'uppercase'
    }
})

export default ButtonPrimaryFullRow