import React, {Component} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImagePropTypes, ScrollView, Alert } from 'react-native'
import AsyncStorage  from '@react-native-async-storage/async-storage'
import { _widthScale, _heightScale }  from '../../Constant/Constants'
import * as COLOR from '../../Constant/Color/index'
import { getProductById, getListFavoriteProduct } from '../../Services/api'
import ButtonYeuThich from '../../Components/Cart/ButtonYeuThich/index'
import EmptyCart from '../../Components/Cart/EmptyCart/index'
import ProductOffer from '../../Components/Cart/ProductOffer/index'
import ListCartItem from '../../Components/Cart/ListCartItem/index'
import * as ScreenKey from '../../Constant/ScreenKey'
import ModalAddToCart from '../../Components/Modal/ModalAddToCart/index'
import ComponentLoading from '../../Components/Loading/index'
import ModalMustLogin from '../../Components/Modal/ModalMustLogin/index';
import { SkypeIndicator } from 'react-native-indicators';

class Cart extends Component {

    constructor(){
        super()
        this.state = {
            isAddToCart : false,
            isLoadInfoAddToCart : false,
            dataAddToCart : {},
            listCart : [],
            priceTotal : 0,
            isErrorLogin : false,
            isLoading : false,
            totalLike : 0
        }
    }

    async componentDidMount() {
        this.setState({ isLoading : true })
      
        // if(!rs.error) {
        //     this.setState({ listFavorite : rs.data })
        // }
        // const rs = await getListFavoriteProduct()
        const userLogin = await AsyncStorage.getItem('userLogin')
        if(userLogin) {
            const rs = await getListFavoriteProduct()
            this.setState({ totalLike : rs.data.length })
        }
        const cart = await AsyncStorage.getItem('cart')
        if(cart != null) {
            const getCart = JSON.parse(cart)
            let totalTemp = 0
            getCart.forEach(item => {
                totalTemp += item.price * item.quantity
            });
            this.setState({ 
                listCart : getCart,
                priceTotal : totalTemp,
                isLoading : false,
            })
        }else{
            this.setState({ isLoading : false })
        }
    }

    _updateCart = async () => {
        const cart = await AsyncStorage.getItem('cart')
        if(cart != null) {
            const getCart = JSON.parse(cart)
            let totalTemp = 0
            getCart.forEach(item => {
                totalTemp += item.price * item.quantity
            });
            this.setState({ 
                listCart : getCart ,
                priceTotal : totalTemp
            })
        }
    }


    _openModalAddToCart = async _id => {
        this.setState({ isLoadInfoAddToCart : true })
        const dataLoad = await getProductById(_id)
        if(!dataLoad.error) {
            this.setState({ 
                isLoadInfoAddToCart : false,
                dataAddToCart : dataLoad.data,
                isAddToCart : true
            })
        }else{
            this.setState({ isLoadInfoAddToCart : false })
        }
    }

    _closeModalAddToCart = () => {
        this.setState({ isAddToCart : false })
    }

    openPopupErrorLogin = () => {
        this.setState({ isErrorLogin : true })
    }

    closePopupErrorLogin = () => {
        this.setState({ isErrorLogin : false })
    }

    handleLogin_favorite = () => {
        this.setState({ isErrorLogin_favorite : !this.state.isErrorLogin_favorite })
    }

    _handleNavigateLogin = () => {
        this.closePopupErrorLogin()
        const { navigation } = this.props
        navigation.navigate(ScreenKey.SCREEN_NOT_TAB_BOTTOM, { screen : ScreenKey.LOGIN, params : {
            // Đăng nhập xong navigate qua thanh toán
            conditionNavigate : {
                screen : ScreenKey.CHECKOUT
            }
        }})  
    }

    _handleNavigate_favorite = () => {
        this.handleLogin_favorite()
        const { navigation } = this.props
        navigation.navigate(ScreenKey.SCREEN_NOT_TAB_BOTTOM, { screen : ScreenKey.LOGIN, params : {
            // Đăng nhập xong navigate qua thanh toán
            conditionNavigate : {
                screen : ScreenKey.FAVORITE
            }
        }})  
    }

    __navigateCheckout =  async () => {
        const { navigation } = this.props
        const userLogin = await AsyncStorage.getItem('userLogin')
        if(!userLogin) {
            this.openPopupErrorLogin()
        }else{
            navigation.navigate(ScreenKey.SCREEN_NOT_TAB_BOTTOM, { screen : ScreenKey.CHECKOUT })  
        }
    }

    __navigateFavorite =  async () => {
        const { navigation } = this.props
        const userLogin = await AsyncStorage.getItem('userLogin')
        if(!userLogin) {
            this.handleLogin_favorite()
        }else{
            navigation.navigate(ScreenKey.SCREEN_NOT_TAB_BOTTOM, { screen : ScreenKey.FAVORITE })  
        }
    }

    render() {

        const { listCart, priceTotal, isLoading, totalLike } = this.state
        const { navigation } = this.props

        return(
            <>
                {
                    isLoading ?
                    <View style={style.container}>
                        <SkypeIndicator size={_heightScale(40)} color={COLOR.MAIN_COLOR} />
                    </View>
                    :
                    <View style={style.container}>

                    <ModalMustLogin 
                        isVisible={this.state.isErrorLogin} 
                        closeModal={this.closePopupErrorLogin}
                        actionAccept={this._handleNavigateLogin}
                        /> 
    
                    <ModalMustLogin 
                        isVisible={this.state.isErrorLogin_favorite} 
                        closeModal={this.handleLogin_favorite}
                        actionAccept={this._handleNavigate_favorite}
                    /> 
    
                    <ModalAddToCart 
                        openModal={this.state.isAddToCart}
                        closeModal={this._closeModalAddToCart}
                        data={this.state.dataAddToCart}
                    />
                
                    <ComponentLoading isLoading={this.state.isLoadInfoAddToCart} />
    
                    <View style={[style.wrapTitle]}>
                        <Text style={style.title}>
                                Giỏ hàng
                        </Text>
                        <ButtonYeuThich totalLike={totalLike} navigateFavorite={this.__navigateFavorite} />
                    </View>
    
                    {
                        listCart.length > 0 
                        ?
                        /* CÓ SẢN PHẨM */
                        <ListCartItem totalPrice={priceTotal} updateCart={this._updateCart} data={listCart} navigation={navigation} navigateCheckout={this.__navigateCheckout} /> 
                        :
                        /* KHÔNG CÓ SẢN PHẨM */
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            >
                            <EmptyCart goHome={this.props.navigation} />
                            <ProductOffer _openModalAddToCart={(_id) => this._openModalAddToCart(_id)} navigation={this.props.navigation} />
                        </ScrollView>
                    }
                    </View>
                }
            </>
        )
    }
   
}

const style = StyleSheet.create({
    container : {
        flex : 1,
    },
    wrapTitle : {
        paddingHorizontal : _widthScale(18),
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        height : _heightScale(70),
        backgroundColor : COLOR.WHITE
    },
    title : {
        fontSize : _heightScale(24),
        color : COLOR.BLACK,
        fontWeight : 'bold',
    }
})

export default Cart