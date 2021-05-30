import React, { Component } from 'react'
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    ImageBackground
 } from 'react-native'

import AsyncStorage  from '@react-native-async-storage/async-storage'
import { _widthScale, _heightScale } from '../../Constant/Constants'
import * as COLOR from '../../Constant/Color/index'
import ButtonBack from '../../Components/Details/ButtonBack/index'
import ButtonPrimaryFullRow from '../../Components/Global/ButtonPrimaryFullRow/index'
import IMAGES from '../../Constant/Images/index'
import * as ScreenKey from '../../Constant/ScreenKey' 
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { loginAccount, registerGoogle } from '../../Services/api'
import * as _font from '../../Constant/Font'
import ModalOnlyOK from '../../Components/Modal/ModalOnlyOK/index'
import ModalOnlyOkAction from '../../Components/Modal/ModalOnlyOkAction/index'
import { SkypeIndicator } from 'react-native-indicators';
import { validateEmail  } from '../../Utils/utils'

class Login extends Component {

    constructor() {
        super()
        this.state = {
            isShowPass : false,
            isEmptyInput : true,
            isModalWrongPass : false,
            isModalNotExist : false,
            isDoneLogin : false,
            isLoading : false,
            isErrorEmail : false,
            isDangPhatTrien : false,
            isErrorLoginGoogle : false,
            isDoneLoginGoogle : false,
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
            console.log('xinc hao')
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


            const result = await registerGoogle(userLogin)

            if(!result.error){
                result.infoUser.type = 'google'
                await AsyncStorage.setItem('userLogin', JSON.stringify(result.infoUser))
                this.__handleShowIsDoneLoginGG()
            }else{
                this.__handleShowIsErrorLoginGG()
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

    __navigateDoneLoginGoogle = () => {
        this.__handleShowIsDoneLoginGG()
        const check_conditionNavigate = this.props.route.params
        if(check_conditionNavigate) {
            const { conditionNavigate } = check_conditionNavigate
            this.props.navigation.replace(ScreenKey.SCREEN_NOT_TAB_BOTTOM, { screen : conditionNavigate.screen })
        }else{
            this.props.navigation.replace(ScreenKey.SCREEN_TAB_BOTTOM, { screen : ScreenKey.ACCOUNT })
        }
    }

    __handleShowPass = () => {
        this.setState({ isShowPass : !this.state.isShowPass })
    }

    __handleShowDangPhatTrien = () => {
        this.setState({ isDangPhatTrien : !this.state.isDangPhatTrien })
    }

    __handleShowIsErrorLoginGG = () => {
        this.setState({ isErrorLoginGoogle : !this.state.isErrorLoginGoogle })
    }

    __handleShowIsDoneLoginGG = () => {
        this.setState({ isDoneLoginGoogle : !this.state.isDoneLoginGoogle })
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

    _openModalErrorMail = () => {
        this.setState({ isErrorEmail : !this.state.isErrorEmail })
    }

    _handleNavigateLogin = () => {
        const check_conditionNavigate = this.props.route.params
        if(check_conditionNavigate) {
            const { conditionNavigate } = check_conditionNavigate
            this.props.navigation.replace(ScreenKey.SCREEN_NOT_TAB_BOTTOM, { screen : conditionNavigate.screen })
        }else{
            this.props.navigation.replace(ScreenKey.SCREEN_TAB_BOTTOM, { screen : ScreenKey.ACCOUNT })
        }
    }
    
    __handleLoginAccount = async () => {
        const { txtEmail, txtPassword } = this.state
        if(!txtEmail || !txtPassword) {
            this._openModalEmptyInput()
        }else{
            if(validateEmail(txtEmail)){
                const infoAccount = {
                    email : txtEmail,
                    password : txtPassword
                }
                this.setState({ isLoading : true })
                const result = await loginAccount(infoAccount)
                if(!result.error) {
                    this.setState({ isLoading : false })
                    const { infoUser } = result
                    await AsyncStorage.setItem('userLogin', JSON.stringify(infoUser))
                    this._openModalDoneLogin()
                }else{
                    this.setState({ isLoading : false })
                    if(result.isNull) {
                        this._openModalNotExistAccount()
                    }
                    if(result.isWrongPass) {
                        this._openModalWrongPass()
                    }
                }
            }else{
                this._openModalErrorMail()
            }
        }
    }

    render() {

        const { isShowPass, isEmptyInput, isModalWrongPass, isModalNotExist, isDoneLogin, isLoading, isErrorEmail,isDangPhatTrien,
            isErrorLoginGoogle,
            isDoneLoginGoogle } = this.state

        return(
            <>

                <ModalOnlyOK 
                    isVisible = {isErrorLoginGoogle}
                    closeModal = { this.__handleShowIsErrorLoginGG }
                    content="Hệ thống đang nâng cấp, vui lòng đăng nhập bằng hình thức khác!"
                    icon={IMAGES.ICON_DANGPHATTRIEN}
                />

                <ModalOnlyOK 
                    isVisible = {isDangPhatTrien}
                    closeModal = { this.__handleShowDangPhatTrien }
                    content="Tính năng đang phát triển"
                    icon={IMAGES.ICON_DANGPHATTRIEN}
                />

                <ModalOnlyOK 
                    isVisible = {!isEmptyInput}
                    closeModal = { this._openModalEmptyInput }
                    content="Vui lòng nhập đầy đủ thông tin!"
                    icon={IMAGES.LOGIN_ICON_NULL_INPUT}
                />

                <ModalOnlyOK 
                    isVisible = {isModalWrongPass}
                    closeModal = { this._openModalWrongPass }
                    content="Sai mật khẩu!"
                    icon={IMAGES.LOGIN_ICON_WRONG_PASS}
                />

                <ModalOnlyOK 
                    isVisible = {isModalNotExist}
                    closeModal = { this._openModalNotExistAccount }
                    content="Tài khoản không tồn tại!"
                    icon={IMAGES.LOGIN_ICON_EXIST}
                />

                {/* ĐĂNG NHẬP GOOGLE */}
                <ModalOnlyOkAction 
                    isVisible = {isDoneLoginGoogle}
                    closeModal = { this.__navigateDoneLoginGoogle }
                    content="Đăng nhập thành công"
                    icon={IMAGES.LOGIN_ICON_DONE}
                    chooseAccept={this.__navigateDoneLoginGoogle}
                />

                <ModalOnlyOkAction 
                    isVisible = {isDoneLogin}
                    closeModal = { this._openModalDoneLogin }
                    content="Đăng nhập thành công"
                    icon={IMAGES.LOGIN_ICON_DONE}
                    chooseAccept={this._handleNavigateLogin}
                />

                <ModalOnlyOK 
                    isVisible = {isErrorEmail}
                    closeModal = { this._openModalErrorMail }
                    content="Sai định dạng Email"
                    icon={IMAGES.LOGIN_ICON_WRONG_PASS}
                />
                
            <ImageBackground 
                source={IMAGES.LOGIN_BG}
                style={{flex: 1,
                    resizeMode: "cover",
                    justifyContent: "center"}}
                >
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
                                        Đăng nhập
                                    </Text>
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
                                        <View style={[style.icon_input, {left : _widthScale(12), top : _heightScale(15)}]}>
                                            <Icon name="lock" size={_heightScale(28)} color={COLOR.MAIN_COLOR} />
                                        </View>
                                        <TextInput 
                                            autoCapitalize='none'
                                            onChangeText={(e) => {this.setState({ txtPassword : e })}}
                                            secureTextEntry={!isShowPass}
                                            placeholder="Nhập mật khẩu"  
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
                                            onPress={ this.__handleLoginGoogle }
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
                                            // onPress={this.__handleLoginFacebook}
                                            onPress={this.__handleShowDangPhatTrien}
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
                                            Nếu chưa có tài khoản, vui lòng 
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
             
            </ImageBackground>
                   
            </>
           
        )
    }
}

const style = StyleSheet.create({
    container : {
        flex : 1,
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
        paddingTop : _heightScale(70)
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

export default Login