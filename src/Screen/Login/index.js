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
import { loginAccount } from '../../Services/api'
import * as _font from '../../Constant/Font'

class Login extends Component {

    constructor() {
        super()
        this.state = {
            isShowPass : false,
        }
    }

    componentDidMount() {

        GoogleSignin.configure({
            webClientId: '855836727440-qq316o4javn93d3ee007p3vjuurvg56d.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true,
        });
    }

    __handleLoginFacebook = async () => {
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
            if (result.isCancelled) {
                throw 'User cancelled the login process';
            }
            const data = await AccessToken.getCurrentAccessToken();
            if (!data) {
                throw 'Something went wrong obtaining access token';
            }
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
            const infoUser = await auth().signInWithCredential(facebookCredential)
            const userInfo = infoUser?.additionalUserInfo?.profile
            console.log('infoUser FB',infoUser )
            const userLogin = {
                type : 'facebook',
                id : userInfo?.id,
                fullname : userInfo?.name,
                avatar : userInfo?.picture.data.url,
                email : userInfo?.email
            }

            await AsyncStorage.setItem('userLogin', JSON.stringify(userLogin))
            const check_conditionNavigate = this.props.route.params
            if(check_conditionNavigate) {
                const { conditionNavigate } = check_conditionNavigate
                this.props.navigation.replace(ScreenKey.SCREEN_NOT_TAB_BOTTOM, { screen : conditionNavigate.screen })
            }else{
                this.props.navigation.replace(ScreenKey.SCREEN_TAB_BOTTOM, { screen : ScreenKey.ACCOUNT })
            }
            
        } catch (error) {
            console.log('Error login FB ', error)
        }
    }

    __handleLoginGoogle = async () => {
        try {
            const googlePlayService = await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('user info', userInfo)

            const userLogin = {
                type : 'google',
                id : userInfo?.user?.id,
                fullname : userInfo?.user?.givenName,
                avatar : userInfo?.user?.photo,
                email : userInfo?.user?.email
            }

            await AsyncStorage.setItem('userLogin', JSON.stringify(userLogin))
            const check_conditionNavigate = this.props.route.params
            if(check_conditionNavigate) {
                const { conditionNavigate } = check_conditionNavigate
                this.props.navigation.replace(ScreenKey.SCREEN_NOT_TAB_BOTTOM, { screen : conditionNavigate.screen })
            }else{
                this.props.navigation.replace(ScreenKey.SCREEN_TAB_BOTTOM, { screen : ScreenKey.ACCOUNT })
            }

          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
              console.log('lỗi 1 nè : ', error)
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (e.g. sign in) is in progress already
              console.log('lỗi 2 nè : ', error)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
              console.log('lỗi 3 nè : ', error)
            } else {
              // some other error happened
              console.log('Lỗi này đéo xác cmn định luôn : ', error)
            }
          }
    }

    __handleShowPass = () => {
        this.setState({ isShowPass : !this.state.isShowPass })
    }
    
    __handleLoginAccount = async () => {
        const { txtEmail, txtPassword } = this.state
        if(!txtEmail || !txtPassword) {
            alert('Vui lòng nhập đầy đủ thông tin!')
        }else{
            const infoAccount = {
                email : txtEmail,
                password : txtPassword
            }
            const result = await loginAccount(infoAccount)
            if(!result.error) {
                const { infoUser } = result
                await AsyncStorage.setItem('userLogin', JSON.stringify(infoUser))
                Alert.alert(
                    "Thông báo",
                    "Đăng nhập thành công!",
                    [{
                        text: "Đồng ý",
                        onPress: () => {
                            const check_conditionNavigate = this.props.route.params
                            if(check_conditionNavigate) {
                                const { conditionNavigate } = check_conditionNavigate
                                this.props.navigation.replace(ScreenKey.SCREEN_NOT_TAB_BOTTOM, { screen : conditionNavigate.screen })
                            }else{
                                this.props.navigation.replace(ScreenKey.SCREEN_TAB_BOTTOM, { screen : ScreenKey.ACCOUNT })
                            }
                        }
                    }]
                  );
            }else{
                if(result.isNull) {
                    alert('Tài khoản không tồn tại')
                }
                if(result.isWrongPass) {
                    alert('Sai mật khẩu')
                }
            }
        }
    }

    render() {

        const { isShowPass } = this.state

        return(
            <>
                {
                    2 > 1 ? 
                    <View style={style.container}>
                        <ScrollView
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
                                        Đăng nhập
                                    </Text>
                                    <View style={style.input_item}>
                                        <View style={style.icon_input}>
                                            <Icon name="envelope" size={_heightScale(22)}  color={COLOR.MAIN_COLOR} />
                                        </View>
                                        <TextInput
                                            placeholder="Nhập Email"
                                            style={[_font.stylesFont.fontNolan500, style.input]}
                                            />
                                    </View>
                                    <View style={style.input_item}>
                                        <View style={[style.icon_input, {left : _widthScale(12), top : _heightScale(15)}]}>
                                            <Icon name="lock" size={_heightScale(28)} color={COLOR.MAIN_COLOR} />
                                        </View>
                                        <TextInput 
                                            secureTextEntry={!isShowPass}
                                            placeholder="Nhập mật khẩu"  
                                            style={[_font.stylesFont.fontNolan500, style.input]}
                                            />
                                    </View>
                                    <View style={style.wrapBtnLogin}>
                                        <ButtonPrimaryFullRow 
                                            chooseAccept={this.__handleLoginAccount}
                                            txtTitle="Đăng nhập"
                                        />
                                    </View>
                                    <View style={style.wrap_login_social}>
                                        <TouchableOpacity 
                                            style={{ flex : 0.46 }}
                                            activeOpacity={0.7}
                                            >
                                            <View style={[style.btn_social,{ backgroundColor : COLOR.PINK }]}>
                                                <Icon name="google" size={_heightScale(22)}  color={COLOR.WHITE} />
                                                <Text style={[_font.stylesFont.fontNolan500, style.txt_social]}>
                                                    Google
                                                </Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity  
                                            style={{ flex : 0.46 }}
                                            activeOpacity={0.7}
                                            >
                                            <View style={[style.btn_social, { backgroundColor : COLOR.BLUE }]}>
                                                <Icon name="facebook-f" size={_heightScale(22)}  color={COLOR.WHITE} />
                                                <Text  style={[_font.stylesFont.fontNolan500, style.txt_social]}>
                                                    Facebook
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={style.wrapThongBao}>
                                        <Text  style={[_font.stylesFont.fontDinTextPro, style.txtThongBao]}>
                                            Nễu chưa có tài khoản, vui lòng 
                                        </Text>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            onPress={() => { this.props.navigation.navigate(ScreenKey.SCREEN_NOT_TAB_BOTTOM, { screen : ScreenKey.REGISTER }) }}
                                            >
                                                <Text style={{ fontSize : _heightScale(20), color : COLOR.MAIN_COLOR, textDecorationLine : 'underline', fontWeight : 'bold' }}>
                                                    {` Đăng ký `}
                                                </Text>
                                            </TouchableOpacity>
                                    </View>
                                </View>


                            </View>
                        </ScrollView>
                    </View>
                    :
                    <View style={style.container}>
                    <View style={[style.wrapTitle]}>
                        <ButtonBack goBack={() => this.props.navigation.goBack()} />
                        <Text style={style.title}>
                                Đăng nhập
                        </Text>
                    </View>
                    <View style={style.wrapBody}>
                        <View style={[style.wrapInput]}>
                            <Text
                                style={[style.titleInput]}>
                                Email
                            </Text>
                            <TextInput
                                autoCapitalize='none'
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
    
                        <View style={style.wrapBtnLogin}>
                            <ButtonPrimaryFullRow 
                                chooseAccept={this.__handleLoginAccount}
                                txtTitle="Đăng nhập"
                            />
                        </View>
                    
                        <View style={style.wrapLine}>
                            <View style={style.line} /> 
                            <Text style={style.titleOr}>
                                Hoặc
                            </Text>
                            <View style={style.line}/>
                        </View>
    
                        <View style={style.wrapSocial}>
                            <TouchableOpacity
                                onPress={ this.__handleLoginGoogle }
                                activeOpacity={0.7}
                                >
                                <Image
                                    style={style.iconSocial}
                                    source={IMAGES.ICON_GOOGLE}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={this.__handleLoginFacebook}
                                >
                                <Image
                                    style={style.iconSocial}
                                    source={IMAGES.ICON_FACEBOOK}
                                />
                            </TouchableOpacity>
                        </View>
    
                        <View style={style.wrapThongBao}>
                            <Text style={style.txtThongBao}>
                                {`Nễu chưa có tài khoản, vui lòng `}
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => { this.props.navigation.navigate(ScreenKey.SCREEN_NOT_TAB_BOTTOM, { screen : ScreenKey.REGISTER }) }}
                                >
                                    <Text style={{ fontSize : _heightScale(20), color : COLOR.MAIN_COLOR, textDecorationLine : 'underline', fontWeight : 'bold' }}>
                                        Đăng ký 
                                    </Text>
                                </TouchableOpacity>
                        </View>
                    </View>
                </View>
                }
            </>
           
        )
    }
}

const style = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor  : COLOR.BLACK
    },
    wrapBody_new : {
        alignItems : 'center',
        paddingTop : _heightScale(70)
    },
    wrap_avatar : {
        width : _heightScale(100),
        borderRadius : 5,
        overflow : 'hidden',
    },
    avatar : {
        width : _heightScale(100),
        height : _heightScale(100),
        resizeMode : 'contain'
    },
    wrap_input : {
        width : '100%',
        paddingHorizontal : _widthScale(18),
        marginTop : _heightScale(80)
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
        borderRadius : 20,
        flexDirection : 'row'
    },
    txt_social : {
        color : COLOR.WHITE,
        marginLeft : _widthScale(5),
        fontSize : _heightScale(18)
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
        marginTop : _heightScale(50),
    },
    txtThongBao : {
        fontSize : _heightScale(18),
        color : COLOR.TEXT_BLACK,
    }
})

export default Login