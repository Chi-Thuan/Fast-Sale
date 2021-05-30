import React, { Component } from 'react'
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native'
import Modal from 'react-native-modal'

import { _heightScale, _widthScale } from '../../../Constant/Constants'
import * as COLOR from '../../../Constant/Color/index'
import * as _font from '../../../Constant/Font'
import LinearGradient from 'react-native-linear-gradient';

class ModalMustLogin extends Component {

    render() {

        const { isVisible, closeModal, actionAccept, content, icon, txtCancel = "Hủy" , txtAccept = "Đồng ý"} = this.props

        return (
            <Modal
                animationInTiming={400}
                animationOutTiming={400}
                animationIn='slideInUp'
                animationOut='slideOutDown'
                useNativeDriver={true}
                onBackdropPress={closeModal}
                onBackButtonPress={closeModal}
                backdropOpacity={0.5}
                style={style.modal}
                isVisible={isVisible}
                >
                <View style={style.container}>
                    <View style={style.wrap_icon}>
                        <Image
                            style={style.icon}
                            source={icon}
                        />
                    </View>
                    <Text style={[ _font.stylesFont.fontNolanBold, style.txt]}>
                        {content}
                    </Text>

                    <View style={style.wrap_button}>
                        <TouchableOpacity 
                            style={{ flex : 1, alignItems : 'flex-end' , marginRight : _widthScale(6)}}
                            activeOpacity={0.7}
                            onPress={closeModal}
                            >
                            <View style={[style.button, { backgroundColor : COLOR.TEXT_GREY }]}>
                                <Text style={[_font.stylesFont.fontDinTextPro, style.txt_btn ]}>
                                    {txtCancel}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{ flex : 1, alignItems : 'flex-start', marginLeft : _widthScale(6) }}
                            activeOpacity={0.7}
                            onPress={actionAccept}  
                            >
                                  <LinearGradient 
                                    start={{x: 1, y: 1}}
                                    end={{x: 0, y: 0}}
                                    colors={['#4E37D3', '#2481D6']}
                                    style={style.button}
                                    >
                                         <Text style={[_font.stylesFont.fontDinTextPro,style.txt_btn]}>
                                            {txtAccept}
                                        </Text>
                                    </LinearGradient>
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