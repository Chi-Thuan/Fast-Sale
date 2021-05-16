import React, { Component } from 'react'
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Alert
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


class ScreenRegister extends Component {

    constructor() {
        super()
        this.state = {
            isShowPass : false,
            isShowRePass : false
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
            alert('Vui lòng điền đầy đủ thông tin!')
        }else{
            if(txtPassword !== txtRePassword) {
                alert('Mật khẩu không trùng khớp!')
            }else{

                let data = {
                    email : txtEmail ,
                    password : txtPassword,
                    fullname : txtFullName
                }

                const result = await registerAccount(data)
                if(!result.error) {
                    const { infoUser } = result
                    await AsyncStorage.setItem('userLogin', JSON.stringify(infoUser))
                    Alert.alert(
                        "Thông báo",
                        "Tạo tài khoản thành công!",
                        [{
                            text: "Đồng ý",
                            onPress: () => this.props.navigation.replace(ScreenKey.SCREEN_TAB_BOTTOM, { screen : ScreenKey.ACCOUNT }),
                        }]
                      );
                }else{
                    if(result.isExist) {
                        alert('Tài khoản đã tồn tại!')
                    }else{
                        alert('Không thể đăng ký!')
                    }
                }
            }
        }
    }

    render() {
        const { isShowPass, isShowRePass } = this.state
        return(
            <View style={style.container}>
                <View style={[style.wrapTitle]}>
                    <ButtonBack goBack={() => this.props.navigation.goBack()} />
                    <Text style={style.title}>
                            Đăng ký
                    </Text>
                </View>
                <View style={style.wrapBody}>
                    <View style={[style.wrapInput]}>
                        <Text
                            style={[style.titleInput]}>
                            Họ tên
                        </Text>
                        <TextInput
                            autoCapitalize='words'
                            onChangeText={(e) => { this.setState({ txtFullName : e }) }}
                            // onChangeText={(e) => {this.setState({ txtFullName : e }), function() { console.log('csacnjsdb   ', this.state.txtFullName) }}}
                            style={[style.txtInput]}
                        />
                    </View>

                    <View style={[style.wrapInput, { marginTop : _heightScale(30) }]}>
                        <Text
                            style={[style.titleInput]}>
                            Email
                        </Text>
                        <TextInput
                            onChangeText={(e) => {this.setState({ txtEmail : e })}}
                            keyboardType='email-address'
                            style={[style.txtInput]}
                        />
                    </View>

                    <View style={[style.wrapInput, { marginTop : _heightScale(30) }]}>
                        <Text
                            style={[style.titleInput]}>
                            Mật khẩu
                        </Text>
                        <View style={style.wrap_pass}>
                            <TextInput
                                    onChangeText={(e) => {this.setState({ txtPassword : e })}}
                                    secureTextEntry={!isShowPass}
                                    style={[style.txtInput]}
                                />
                            <TouchableOpacity style={style.btn_showPass}
                                activeOpacity={0.7}
                                onPress={this.__handleShowPass}
                            >
                                {
                                    isShowPass ? 
                                        <Icon name="eye" size={_heightScale(26)} color={COLOR.MAIN_COLOR} />
                                        :
                                        <Icon name="eye-slash" size={_heightScale(26)} color={COLOR.MAIN_COLOR} />
                                }
                                
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[style.wrapInput, { marginTop : _heightScale(30) }]}>
                        <Text
                            style={[style.titleInput]}>
                            Nhập lại mật khẩu
                        </Text>
                        <View style={style.wrap_pass}>
                            <TextInput
                                onChangeText={(e) => {this.setState({ txtRePassword : e })}}
                                secureTextEntry={!isShowRePass}
                                    style={[style.txtInput]}
                                />
                            <TouchableOpacity style={style.btn_showPass}
                                activeOpacity={0.7}
                                onPress={this.__handleShowRePass}
                            >
                                {
                                    isShowRePass ? 
                                        <Icon name="eye" size={_heightScale(26)} color={COLOR.MAIN_COLOR} />
                                        :
                                        <Icon name="eye-slash" size={_heightScale(26)} color={COLOR.MAIN_COLOR} />
                                }
                                
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={style.wrapBtnLogin}>
                        <ButtonPrimaryFullRow 
                            chooseAccept={this.__handleRegister}
                            txtTitle="Đăng ký"
                        />
                    </View>
                
                </View>
        </View>
        )
    }
}

const style = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor  : COLOR.WHITE
    },
    wrapTitle : {
        paddingHorizontal : _widthScale(18),
        flexDirection : 'row',
        alignItems : 'center',
        height : _heightScale(70),
        backgroundColor : COLOR.WHITE,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
    },
    title : {
        fontSize : _heightScale(24),
        color : COLOR.MAIN_COLOR,
        fontWeight : 'bold',
        marginLeft : _widthScale(15)
    },
    wrapBody : {
        paddingHorizontal : _widthScale(18),
        flex : 1,
        marginTop : _heightScale(40)
    },
    wrapInput : {
        width : '100%',
    },
    titleInput : {
        fontSize : _heightScale(16),
        fontWeight : 'bold',
        color : COLOR.MAIN_COLOR
    },
    txtInput : {
        width : '100%',
        height : _heightScale(45),
        borderBottomWidth : 1,
        borderColor : COLOR.MAIN_COLOR,
        fontSize : _heightScale(18),
        color : COLOR.TEXT_BLACK,
    },
    wrap_pass : {
        position : 'relative'
    },
    btn_showPass : {
        position : 'absolute',
        zIndex : 2,
        right : 0,
        top : _heightScale(10)
    },
    wrapBtnLogin : {
        marginTop : _heightScale(50)
    },
    wrapLine : {
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : _heightScale(50),
        paddingHorizontal : _widthScale(50)
    },
    line : {
        flex : 1,
        height : 2,
        backgroundColor : COLOR.GREY,
    },
    titleOr : {
        marginHorizontal : _widthScale(20),
        justifyContent : 'center',
        alignItems : 'center',
        fontSize : _heightScale(18),
        color : COLOR.TEXT_GREY
    },
    wrapSocial : {
        marginTop : _heightScale(40),
        flexDirection : 'row',
        justifyContent : 'center',
    },
    iconSocial : {
        marginHorizontal : _widthScale(30),
        width : _heightScale(60),
        height : _heightScale(60)
    },
    wrapThongBao : {
        width : '100%',
        height : _heightScale(50),
        justifyContent  : 'center',
        alignContent : 'center',
        flexDirection : 'row',
        marginTop : _heightScale(30),
    },
    txtThongBao : {
        fontSize : _heightScale(20),
        color : COLOR.TEXT_BLACK,
    }
})

export default ScreenRegister