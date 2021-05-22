import React, { Component } from 'react'
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView
 } from 'react-native'

import AsyncStorage  from '@react-native-async-storage/async-storage'
import { _widthScale, _heightScale } from '../../Constant/Constants'
import * as COLOR from '../../Constant/Color/index'
import ButtonBack from '../../Components/Details/ButtonBack/index'
import ButtonPrimaryFullRow from '../../Components/Global/ButtonPrimaryFullRow/index'
import IMAGES from '../../Constant/Images/index'
import * as ScreenKey from '../../Constant/ScreenKey' 
import PasswordInputText from 'react-native-hide-show-password-input';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { registerAccount } from '../../Services/api'
import * as _font from '../../Constant/Font'
import ModalOnlyOK from '../../Components/Modal/ModalOnlyOK/index'
import ModalOnlyOkAction from '../../Components/Modal/ModalOnlyOkAction/index'
import { SkypeIndicator } from 'react-native-indicators';
import { validateEmail  } from '../../Utils/utils'


class ScreenRegister extends Component {

    constructor() {
        super()
        this.state = {
            isShowPass : false,
            isShowRePass : false,
            isEmptyInput : true,
            isModalWrongPass : false,
            isModalNotExist : false,
            isDoneLogin : false,
            isLoading : false,
            isErrorEmail : false
        }
    }


    __handleShowPass = () => {
        this.setState({ isShowPass : !this.state.isShowPass })
    }

    __handleShowRePass = () => {
        this.setState({ isShowRePass : !this.state.isShowRePass })
    }

    __handleRegister = async () => {
        const { txtFullName, txtEmail, txtPassword, txtRePassword } = this.state
        if(!txtFullName || !txtEmail || !txtPassword || !txtRePassword) {
            this._openModalEmptyInput()
        }else{
            if(txtPassword !== txtRePassword) {
                this._openModalWrongPass()
            }else{

               if(validateEmail(txtEmail)){
                    let data = {
                        email : txtEmail ,
                        password : txtPassword,
                        fullname : txtFullName
                    }
                    this.setState({ isLoading : true })
                    const result = await registerAccount(data)
                    if(!result.error) {
                        const { infoUser } = result
                        this.setState({ isLoading : false })
                        await AsyncStorage.setItem('userLogin', JSON.stringify(infoUser))
                        this._openModalDoneLogin()
                    }else{
                        this.setState({ isLoading : false })
                        if(result.isExist) {
                            this._openModalNotExistAccount()
                        }else{
                            alert('Không thể đăng ký!')
                        }
                    }
               }else{
                    this._openModalErrorMail()
               }
            }
        }
    }

    _openModalEmptyInput = () => {
        this.setState({ isEmptyInput : !this.state.isEmptyInput })
    }

    _openModalWrongPass = () => {
        this.setState({ isModalWrongPass : !this.state.isModalWrongPass })
    }

    _openModalNotExistAccount = () => {
        this.setState({ isModalNotExist : !this.state.isModalNotExist })
    }

    _openModalDoneLogin = () => {
        this.setState({ isDoneLogin : !this.state.isDoneLogin })
    }

    _handleNavigate = () => {
        this.props.navigation.replace(ScreenKey.SCREEN_TAB_BOTTOM, { screen : ScreenKey.ACCOUNT })
    }

    _openModalErrorMail = () => {
        this.setState({ isErrorEmail : !this.state.isErrorEmail })
    }

    render() {
        const { isShowPass, isShowRePass, isEmptyInput, isModalWrongPass, isModalNotExist, isDoneLogin, isLoading, isErrorEmail  } = this.state
        return(
          <>

                <ModalOnlyOK 
                    isVisible = {!isEmptyInput}
                    closeModal = { this._openModalEmptyInput }
                    content="Vui lòng nhập đầy đủ thông tin!"
                    icon={IMAGES.LOGIN_ICON_NULL_INPUT}
                />

                <ModalOnlyOK 
                    isVisible = {isModalWrongPass}
                    closeModal = { this._openModalWrongPass }
                    content="Mật khẩu không trùng khớp!"
                    icon={IMAGES.LOGIN_ICON_WRONG_PASS}
                />

                <ModalOnlyOK 
                    isVisible = {isModalNotExist}
                    closeModal = { this._openModalNotExistAccount }
                    content="Tài khoản đã tồn tại!"
                    icon={IMAGES.LOGIN_ICON_EXIST}
                />

                <ModalOnlyOkAction 
                    isVisible = {isDoneLogin}
                    closeModal = { this._openModalDoneLogin }
                    content="Đăng ký thành công!"
                    icon={IMAGES.LOGIN_ICON_DONE}
                    chooseAccept={this._handleNavigate}
                />

                <ModalOnlyOK 
                    isVisible = {isErrorEmail}
                    closeModal = { this._openModalErrorMail }
                    content="Sai định dạng Email"
                    icon={IMAGES.LOGIN_ICON_WRONG_PASS}
                />

           <View style={style.container}>
                        {
                            isLoading ? <View style={style.wrap_indicator}>
                                <SkypeIndicator size={_heightScale(40)} color={COLOR.MAIN_COLOR} />
                            </View> : <View />
                        }
                        <ScrollView
                            style={{ position : 'relative', zIndex : 9 }}
                            showsVerticalScrollIndicator={false}
                            >
                            <View style={style.wrapBody_new}>
                                <View style={style.wrap_avatar}>
                                    <Image 
                                        style={style.avatar}
                                        source={IMAGES.LOGIN_ICON_APP}
                                    />
                                </View>

                                <View style={style.wrap_input}>
                                    <Text style={[_font.stylesFont.fontNolanBold ,style.title_input]}>
                                        Đăng ký
                                    </Text>
                                    <View style={style.input_item}>
                                        <View style={style.icon_input}>
                                            <Icon name="user" size={_heightScale(24)}  color={COLOR.MAIN_COLOR} />
                                        </View>
                                        <TextInput
                                            autoCapitalize='words'
                                            onChangeText={(e) => { this.setState({ txtFullName : e }) }}
                                            placeholder="Nhập họ tên"
                                            style={[_font.stylesFont.fontNolan500, style.input]}
                                            />
                                    </View>
                                    <View style={style.input_item}>
                                        <View style={style.icon_input}>
                                            <Icon name="envelope" size={_heightScale(22)}  color={COLOR.MAIN_COLOR} />
                                        </View>
                                        <TextInput
                                            autoCapitalize='none'
                                            keyboardType='email-address'
                                            placeholder="Nhập Email"
                                            onChangeText={(e) => {this.setState({ txtEmail : e })}}
                                            style={[_font.stylesFont.fontNolan500, style.input]}
                                            />
                                    </View>
                                    <View style={style.input_item}>
                                        <View style={style.icon_input}>
                                            <Icon name="lock" size={_heightScale(28)}  color={COLOR.MAIN_COLOR} />
                                        </View>
                                        <TextInput
                                            autoCapitalize='none'
                                            placeholder="Nhập mật khẩu"
                                            secureTextEntry={!isShowPass}
                                            onChangeText={(e) => {this.setState({ txtPassword : e })}}
                                            style={[_font.stylesFont.fontNolan500, style.input]}
                                            />
                                              <TouchableOpacity 
                                            activeOpacity={0.7}
                                            onPress={this.__handleShowPass}
                                            style={[{position : 'absolute',right : _widthScale(0), top : _heightScale(0), height : '100%', width : _widthScale(40),  alignItems : 'center' ,justifyContent : 'center'} ]}
                                            >
                                            {
                                                isShowPass ? 
                                                    <Icon name="eye" size={_heightScale(22)} color={COLOR.TEXT_GREY} />
                                                    :
                                                    <Icon name="eye-slash" size={_heightScale(22)} color={COLOR.TEXT_GREY} />
                                            }
                                        </TouchableOpacity>
                                            
                                    </View>
                                    <View style={style.input_item}>
                                        <View style={[style.icon_input, {left : _widthScale(12), top : _heightScale(15)}]}>
                                            <Icon name="lock" size={_heightScale(28)} color={COLOR.MAIN_COLOR} />
                                        </View>
                                        <TextInput 
                                            autoCapitalize='none'
                                            secureTextEntry={!isShowRePass}
                                            onChangeText={(e) => {this.setState({ txtRePassword : e })}}
                                            secureTextEntry={!isShowRePass}
                                            placeholder="Nhập lại mật khẩu"  
                                            style={[_font.stylesFont.fontNolan500, style.input]}
                                            />
                                        <TouchableOpacity 
                                            activeOpacity={0.7}
                                            onPress={this.__handleShowRePass}
                                            style={[{position : 'absolute',right : _widthScale(0), top : _heightScale(0), height : '100%', width : _widthScale(40),  alignItems : 'center' ,justifyContent : 'center'} ]}
                                            >
                                            {
                                                isShowRePass ? 
                                                    <Icon name="eye" size={_heightScale(22)} color={COLOR.TEXT_GREY} />
                                                    :
                                                    <Icon name="eye-slash" size={_heightScale(22)} color={COLOR.TEXT_GREY} />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    <View style={style.wrapBtnLogin}>
                                        <ButtonPrimaryFullRow 
                                            chooseAccept={this.__handleRegister}
                                            txtTitle="Đăng nhập"
                                        />
                                    </View>

                                    <View style={style.wrapThongBao}>
                                        <Text  style={[_font.stylesFont.fontDinTextPro, style.txtThongBao]}>
                                            Nễu đã có tài khoản, vui lòng 
                                        </Text>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            onPress={() => { this.props.navigation.navigate(ScreenKey.SCREEN_NOT_TAB_BOTTOM, { screen : ScreenKey.LOGIN }) }}
                                            >
                                                <Text style={{ fontSize : _heightScale(20), color : COLOR.MAIN_COLOR, textDecorationLine : 'underline', fontWeight : 'bold' }}>
                                                    {` Đăng nhập `}
                                                </Text>
                                            </TouchableOpacity>
                                    </View>
                                </View>


                            </View>
                        </ScrollView>
                    
                    </View>
          </>   
        )
    }
}

const style = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor  : COLOR.WHITE,
        position : 'relative'
    },
    wrap_indicator : {
        width : '100%',
        height : '100%',
        position : 'absolute',
        zIndex : 10,
        backgroundColor : COLOR.RGBA_02,
        justifyContent : 'center',
        alignItems : 'center'
    },
    wrapBody_new : {
        alignItems : 'center',
        paddingTop : _heightScale(50)
    },
    wrap_avatar : {
        width : _heightScale(100),
        borderRadius : 5,
        overflow : 'hidden',
        backgroundColor : COLOR.WHITE,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        
        elevation: 3,
    },
    avatar : {
        width : _heightScale(100),
        height : _heightScale(100),
        resizeMode : 'contain'
    },
    wrap_input : {
        width : '100%',
        paddingHorizontal : _widthScale(18),
        marginTop : _heightScale(40)
    },
    title_input : {
        fontSize : _heightScale(24),
        marginBottom : _heightScale(20),
        color : COLOR.MAIN_COLOR
    },
    input_item : {
        marginBottom : _heightScale(30),
        position : 'relative',
        width : '100%',
        height : _heightScale(60),
        borderRadius : 5,
        overflow : 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    icon_input : {
        position : 'absolute',
        zIndex : 2,
        top : _heightScale(18),
        left : _widthScale(10)
    },
    input : {
        width : '100%',
        height : '100%',
        backgroundColor : COLOR.WHITE,
        paddingHorizontal : _widthScale(10),
        paddingLeft : _widthScale(40),
        alignItems : 'center',
        color : COLOR.MAIN_COLOR,
    },
    wrapBtnLogin : {
        marginTop : _heightScale(10)
    },
    wrap_login_social : {
        marginTop : _heightScale(30),
        flexDirection : 'row',
        width : '100%',
        justifyContent : 'space-between'
    },
    btn_social : {
        width : '100%',
        height : _heightScale(55),
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 40,
        flexDirection : 'row'
    },
    txt_social : {
        color : COLOR.WHITE,
        marginLeft : _widthScale(5),
        fontSize : _heightScale(18)
    },
    wrapThongBao : {
        width : '100%',
        height : _heightScale(50),
        justifyContent  : 'center',
        alignContent : 'center',
        flexDirection : 'row',
        marginTop : _heightScale(50),
    },
    txtThongBao : {
        fontSize : _heightScale(18),
        color : COLOR.TEXT_BLACK,
    }
})

export default ScreenRegister