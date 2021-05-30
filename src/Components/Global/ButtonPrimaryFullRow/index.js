import React, { Component } from 'react'
import { 
    Text,
    StyleSheet,
    TouchableOpacity
 } from 'react-native'

import * as COLOR from '../../../Constant/Color/index'
import { _heightScale } from '../../../Constant/Constants'
import * as _font from '../../../Constant/Font'
import LinearGradient from 'react-native-linear-gradient';

class ButtonPrimaryFullRow extends Component {
    render () {

        const { txtTitle, chooseAccept } = this.props

        return(
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={chooseAccept}
                >
                    <LinearGradient 
                    start={{x: 1, y: 1}}
                    end={{x: 0, y: 0}}
                    colors={['#4E37D3', '#2481D6']}
                    style={style.container}
                    >
                        <Text style={[_font.stylesFont.fontDinTextPro , style.title]}>
                            {txtTitle}
                        </Text>
                    </LinearGradient> 
                       
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
        // backgroundColor : COLOR.MAIN_COLOR,
        borderRadius : 40
    },
    title : {
        color : COLOR.WHITE,
        fontSize : _heightScale(22),
        textTransform : 'uppercase'
    }
})

export default ButtonPrimaryFullRow