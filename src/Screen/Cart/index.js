import React, {Component} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImagePropTypes, ScrollView, Alert } from 'react-native'
import AsyncStorage  from '@react-native-async-storage/async-storage'

import { _widthScale, _heightScale }  from '../../Constant/Constants'
import * as COLOR from '../../Constant/Color/index'
import { getProductById } from '../../Services/api'
import ButtonYeuThich from '../../Components/Cart/ButtonYeuThich/index'
import EmptyCart from '../../Components/Cart/EmptyCart/index'
import ProductOffer from '../../Components/Cart/ProductOffer/index'
import ListCartItem from '../../Components/Cart/ListCartItem/index'
import * as ScreenKey from '../../Constant/ScreenKey'
import ModalAddToCart from '../../Components/Modal/ModalAddToCart/index'
import ComponentLoading from '../../Components/Loading/index'

class Cart extends Component {

    constructor(){
        super()
        this.state = {
            isAddToCart : false,
            isLoadInfoAddToCart : false,
            dataAddToCart : {},
            listCart : [],
            priceTotal : 0
        }
    }

    async componentDidMount() {
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

    __navigateCheckout =  async () => {
        const { navigation } = this.props
        const userLogin = await AsyncStorage.getItem('userLogin')
        if(!userLogin) {
            Alert.alert("Thông báo", "Bạn phải đăng nhập để sử dụng tính năng này!", [
                { text : "Hủy" },
                { text : 'Đăng nhập',  onPress : () => {
                    navigation.navigate(ScreenKey.SCREEN_NOT_TAB_BOTTOM, { screen : ScreenKey.LOGIN, params : {
                        // Đăng nhập xong navigate qua thanh toán
                        conditionNavigate : {
                            screen : ScreenKey.CHECKOUT
                        }
                    }})  
                }}
            ])
        }else{
            navigation.navigate(ScreenKey.SCREEN_NOT_TAB_BOTTOM, { screen : ScreenKey.CHECKOUT })  
        }
    }

    render() {

        const { listCart, priceTotal } = this.state
        const { navigation } = this.props

        return(
            <View style={style.container}>

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
                    <ButtonYeuThich navigation={navigation} />
                </View>

                {
                    listCart.length > 0 
                    ?
                    /* CÓ SẢN PHẨM */
                    <ListCartItem totalPrice={priceTotal} updateCart={this._updateCart} data={listCart} navigateCheckout={this.__navigateCheckout} /> 
                    :
                    /* KHÔNG CÓ SẢN PHẨM */
                    <ScrollView>
                        <EmptyCart goHome={this.props.navigation} />
                        <ProductOffer _openModalAddToCart={(_id) => this._openModalAddToCart(_id)} navigation={this.props.navigation} />
                    </ScrollView>
                }
              
               

                
            </View>
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