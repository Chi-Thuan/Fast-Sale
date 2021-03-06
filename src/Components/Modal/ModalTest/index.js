import React, { Component } from 'react'
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native'
import Modal from 'react-native-modal'
import AsyncStorage  from '@react-native-async-storage/async-storage'

import IMAGES from '../../../Constant/Images/index'
import { _heightScale, _widthScale } from '../../../Constant/Constants'
import * as COLOR from '../../../Constant/Color/index'
import { BASE_URL } from '../../../Constant/Constants'
import { formatCurrencyVND } from '../../../Utils/utils'
import * as ScreenKey from '../../../Constant/ScreenKey'
import * as _font from '../../../Constant/Font'

class ModalMustLogin extends Component {

    constructor() {
        super()
        this.state = {
            txtSearch_new : ''
        }
    }

    render() {

        const { txtSearch_new } = this.state
        const { isVisible, closeModal, txtSearch, actionSearch } = this.props

        return (
            <Modal
                animationInTiming={400}
                animationOutTiming={400}
                animationIn='slideInUp'
                animationOut='slideOutLeft'
                useNativeDriver={true}
                // onBackdropPress={closeModal}
                backdropOpacity={0.5}
                style={style.modal}
                isVisible={true}
                >
                <View style={style.container}>
                    <View style={style.wrap_icon}>
                        <Image
                            style={style.icon}
                            source={IMAGES.MODAL_ICON_ERROR}
                        />
                    </View>
                    <Text style={[ _font.stylesFont.fontDinTextPro, style.txt]}>
                        Oh no... Bạn phải đăng nhập để thực hiện tính năng này!
                    </Text>

                    <View style={style.wrap_button}>
                        <TouchableOpacity 
                            style={{ flex : 1, alignItems : 'flex-end' , marginRight : _widthScale(6)}}
                            activeOpacity={0.7}
                            >
                            <View style={[style.button, { backgroundColor : COLOR.TEXT_GREY }]}>
                                <Text style={[_font.stylesFont.fontDinTextPro, style.txt_btn ]}>
                                    Đóng
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{ flex : 1, alignItems : 'flex-start', marginLeft : _widthScale(6) }}
                            activeOpacity={0.7}    
                            >
                            <View style={[style.button, { backgroundColor : COLOR.MAIN_COLOR }]}>
                                <Text style={[_font.stylesFont.fontDinTextPro,style.txt_btn]}>
                                    Đăng nhập
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}

const style = StyleSheet.create({
    modal : {
        margin : 0,
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    container : {
        width : _widthScale(340),
        // height : _heightScale(400),
        backgroundColor : COLOR.WHITE,
        alignItems : 'center',
        borderRadius : 10,
        paddingHorizontal : _widthScale(10),
        paddingVertical : _heightScale(20)
    },
    wrap_icon : {
        width : '100%',
        height : _heightScale(200)
    },
    icon : {
        width : '100%',
        height : '100%',
        resizeMode : 'contain'
    },
    txt : {
        textAlign : 'center',
        fontSize : _heightScale(22),
        paddingHorizontal : _widthScale(20),
        marginTop : _heightScale(25),
        marginBottom : _heightScale(20),
    },
    wrap_button: {
        flexDirection : 'row',
        width : '100%',
        marginTop : _heightScale(5),
        marginBottom : _heightScale(10)
    },
    button : {
        width : _widthScale(120),
        height : _heightScale(50),
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : COLOR.TEXT_GREY,
        borderRadius : 5
    },
    txt_btn : {
        color : COLOR.WHITE,
        fontSize : _heightScale(20)
    },
})

export default ModalMustLogin