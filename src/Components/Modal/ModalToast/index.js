import React, { Component } from 'react'
import { 
    View,
    Text,
    StyleSheet,
} from 'react-native'
import Modal from 'react-native-modal'

import { _heightScale, _widthScale } from '../../../Constant/Constants'
import * as COLOR from '../../../Constant/Color/index'
import * as _font from '../../../Constant/Font'
import Icon from 'react-native-vector-icons/dist/FontAwesome';

class ModalToast extends Component {

    constructor() {
        super()
        this.state = {
            txtSearch_new : ''
        }
    }

    render() {

        const { txtSearch_new } = this.state
        const { isVisible, content, txtSearch, actionSearch } = this.props

        return (
            <Modal
                animationInTiming={400}
                animationOutTiming={400}
                animationIn='slideInRight'
                animationOut='slideOutLeft'
                useNativeDriver={true}
                backdropOpacity={0.25}
                style={style.modal}
                isVisible={isVisible}
                >
                <View style={style.container}>
                    <View style={style.wrap_icon}>
                        <Icon name="check" size={_heightScale(16)}  color={COLOR.WHITE} />
                    </View>
                    <Text style={[ _font.stylesFont.fontDinTextPro, style.txt]}>
                        {content}
                    </Text>
                </View>
            </Modal>
        )
    }
}

const style = StyleSheet.create({
    modal : {
        margin : 0,
        flex : 1,
        justifyContent : 'flex-start',
        alignItems : 'center'
    },
    container : {
        marginTop : _heightScale(20),
        width : _widthScale(330),
        backgroundColor : COLOR.WHITE,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 50,
        paddingHorizontal : _widthScale(30),
        paddingVertical : _heightScale(10),
        flexDirection : 'row'
    },
    wrap_icon : {
        width : _heightScale(30),
        height : _heightScale(30),
        borderRadius : _heightScale(30/2),
        backgroundColor : 'green',
        justifyContent : 'center',
        alignItems : 'center',
        marginRight : _widthScale(10)
    },
    txt : {
        textAlign : 'center',
        fontSize : _heightScale(20),
    },
})

export default ModalToast