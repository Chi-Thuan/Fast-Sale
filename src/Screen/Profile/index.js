import React, {Component} from 'react'
import { View, 
    Text, StyleSheet,
    StatusBar,
    Image, 
    } from 'react-native'
import { StackActions } from '@react-navigation/native';
import AsyncStorage  from '@react-native-async-storage/async-storage'
import { _widthScale, _heightScale }  from '../../Constant/Constants'
import * as COLOR from '../../Constant/Color/index'

import ButtonBack from '../../Components/Details/ButtonBack/index'
import ButtonPrimaryFullRow from '../../Components/Global/ButtonPrimaryFullRow/index'
import * as ScreenKey from '../../Constant/ScreenKey' 
import { GoogleSignin } from '@react-native-google-signin/google-signin';

class Profile extends Component {

    constructor() {
        super()
        this.state = {
            userLogin : {}
        }
    }

    async componentDidMount() {
        const userLogin = await AsyncStorage.getItem('userLogin')
        const userParse = JSON.parse(userLogin)
        if(userLogin != null) {
            this.setState({ userLogin : userParse })
            if(userParse.type == 'google') {
                GoogleSignin.configure({
                    webClientId: '855836727440-ljpncdfvki2p42ebde3fj3dt2fsvuncb.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
                    offlineAccess: true,
                });
            }
        }
    }

    __handleLogout = async () => {
        try {
            const { userLogin } = this.state
            if(userLogin.type == 'google'){
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();
            }
           
            await AsyncStorage.removeItem('userLogin')
            this.props.navigation.dispatch(
                StackActions.replace(ScreenKey.SCREEN_TAB_BOTTOM, {
                  screen : ScreenKey.ACCOUNT
                })
            );

          } catch (error) {
            console.error(error);
          }
    }

   render() {
    
        const { userLogin } = this.state

        return(
            <View style={style.container}>
                 <StatusBar translucent={false} barStyle="light-content" backgroundColor={COLOR.MAIN_COLOR} />
                 <View style={style.bg_color}>
                    <ButtonBack 
                        isColorWhite={true}
                        goBack={() => this.props.navigation.goBack()}
                        />
                 </View>
                 <View style={style.body_screen}>
                    <View style={style.wrap_info_user}>
                        {/* AVATAR */}
                        <View style={style.wrap_avatar}>
                            <View style={style.avatar}>
                                <Image
                                    style={style.styleAvt}
                                    source={{ uri : userLogin.avatar || 'https://chithuancamau2.tk/upload/images/Personal.png' }}
                                />
                            </View>
                        </View>
                        {/* NAME */}
                        <View style={style.wrapName}>
                            <Text style={[style.name]}>
                               {userLogin.fullname}
                            </Text>
                            <View style={style.wrap_price}>
                                <Text style={[style.price]}>Số dư: 100.000 VNĐ</Text>
                            </View>
                        </View>
                        {/* BUTTON LOGOUT */}
                        <View style={style.wrap_logout}>
                            <View style={style.btnLogout}>
                                <ButtonPrimaryFullRow 
                                    chooseAccept={ this.__handleLogout }
                                    txtTitle="Đăng xuất"
                                />
                            </View>
                        </View>
                    </View>
                 </View>
            </View>
        )
   }
}

const style = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : COLOR.GREY
    },
    bg_color : {
        width : '100%',
        height : _heightScale(250),
        backgroundColor : COLOR.MAIN_COLOR,
        position : 'relative',
        zIndex : 1,
        paddingHorizontal : _widthScale(18),
        paddingTop : _heightScale(18)
    },
    body_screen : {
        position : 'relative',
        zIndex : 2,    
        alignItems : 'center',
        transform: [{ translateY: _heightScale(-50) }]
    },
    wrap_info_user : {
        width : _widthScale(350),
        height : _heightScale(500),
        backgroundColor : COLOR.WHITE,
        borderRadius : 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position : 'relative'
    },
    wrap_avatar : {
        width : '100%',
        height : _heightScale(170/2),
        position : 'relative'
    },
    avatar : {
        position : 'absolute',
        overflow : 'hidden',
        width : _heightScale(170),
        height : _heightScale(170),
        borderRadius : _heightScale(170/2),
        left : '50%',
        transform: [{ translateX: _heightScale(-170/2)}, {  translateY: _heightScale(-170/2)  }],
        borderWidth : 4,
        borderColor : COLOR.WHITE,
        backgroundColor : COLOR.GREY,
        justifyContent : 'center',
        alignItems : 'center'
    },
    styleAvt : {
        width : _heightScale(170),
        height : _heightScale(170),
    },
    wrapName : {
        width : '100%',
        alignItems : 'center',
        justifyContent : 'center',
        marginTop : _heightScale(20)
    },
    name : {
        color : COLOR.BLACK,
        fontWeight : 'bold',
        fontSize : _heightScale(24)
    },
    wrap_price : {
        marginTop : _heightScale(5)
    },
    price : {
        color : COLOR.TEXT_BLACK,
        fontSize : _heightScale(18)
    },
    wrap_logout : {
        position : 'absolute',
        bottom : _heightScale(10),
        width : '100%',
        alignItems : 'center'
    },
    btnLogout : {
        width : _widthScale(200),
    }
})

export default Profile