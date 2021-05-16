import React, { Component } from 'react'
import { 
    View, 
    StyleSheet, 
    Image, 
    TouchableOpacity,
} from 'react-native'
import { _heightScale, _widthScale } from '../../../Constant/Constants'

import IMAGES from '../../../Constant/Images/index'

class ButtonBack extends Component {

    
    render(){

        const isColorWhite = this.props.isColorWhite || false

        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.props.goBack}
                > 
                <View style={[style.wrapBtn]}>
                    <Image
                        style={[style.btnBack]}
                        source={ isColorWhite ? IMAGES.ICON_BACK_LIGHT : IMAGES.ICON_BACK}
                    />
                </View>
            </TouchableOpacity>
        )
    }
}

const style = StyleSheet.create({
    wrapBtn : {
        justifyContent : 'center',
        height : _heightScale(30),
    },
    btnBack : {
        width : _heightScale(30),
        height : _heightScale(20)
    }
})

export default ButtonBack