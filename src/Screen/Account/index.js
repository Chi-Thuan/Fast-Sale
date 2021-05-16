import React, {Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AsyncStorage  from '@react-native-async-storage/async-storage'
import { _widthScale, _heightScale }  from '../../Constant/Constants'
import * as COLOR from '../../Constant/Color/index'

import ButtonCart from '../../Components/Account/ButtonCart/index'
import ScreenNotLogin from '../../Components/Account/ScreenNotLogin/index'
import ScreenLogged from '../../Components/Account/ScreenLogged/index'

class Account extends Component {

    constructor() {
        super()
        this.state = {
            isLogin : false,
            userLogin : {}
        }
    }

    async componentDidMount() {
        const UserLogin = await AsyncStorage.getItem('userLogin')
        if(UserLogin != null) {
            this.setState({
                isLogin : true,
                userLogin : JSON.parse(UserLogin)
            })
        }
    }

    // _updateCart = async () => {
    //     const cart = await AsyncStorage.getItem('cart')
    //     if(cart != null) {
    //         const getCart = JSON.parse(cart)
    //         let totalTemp = 0
    //         getCart.forEach(item => {
    //             totalTemp += item.price * item.quantity
    //         });
    //         this.setState({ 
    //             listCart : getCart ,
    //             priceTotal : totalTemp
    //         })
    //     }
    // }

   render() {

        const { navigation } = this.props
        const { isLogin, userLogin } = this.state

        return(
            <View style={style.container}>
                 <View style={[style.wrapTitle]}>
                    <Text style={style.title}>
                        Cá nhân
                    </Text>
                    <ButtonCart goToPageCart={this.props.navigation} />
                </View>
                
                {
                    isLogin ?
                    <ScreenLogged userLogin={userLogin}  navigation={navigation} />
                    : 
                    <ScreenNotLogin navigation={navigation} />
                }
                
                
            </View>
        )
   }
}

const style = StyleSheet.create({
    container : {
        flex : 1
    },
    wrapTitle : {
        paddingHorizontal : _widthScale(18),
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        height : _heightScale(70),
        backgroundColor : COLOR.WHITE,
    },
    title : {
        fontSize : _heightScale(24),
        color : COLOR.BLACK,
        fontWeight : 'bold',
    }
})

export default Account