import React, {Component} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImagePropTypes, ScrollView, Alert } from 'react-native'
import AsyncStorage  from '@react-native-async-storage/async-storage'

import { _widthScale, _heightScale }  from '../../Constant/Constants'
import * as COLOR from '../../Constant/Color/index'
import { dislikeProduct, getListFavoriteProduct } from '../../Services/api'
import ButtonYeuThich from '../../Components/Cart/ButtonYeuThich/index'
import EmptyCart from '../../Components/Cart/EmptyCart/index'
import ProductOffer from '../../Components/Cart/ProductOffer/index'
import ListCartItem from '../../Components/Cart/ListCartItem/index'
import * as ScreenKey from '../../Constant/ScreenKey'
import ModalAddToCart from '../../Components/Modal/ModalAddToCart/index'
import ComponentLoading from '../../Components/Loading/index'
import ButtonBack from '../../Components/Details/ButtonBack/index'
import CartFavoriteItem from '../../Components/Favorite/CartItem/index'
import { SkypeIndicator } from 'react-native-indicators';

class Cart extends Component {

    constructor(){
        super()
        this.state = {
            listFavorite : [],
            isLoading : false
        }
    }

    async componentDidMount() {
        this.setState({ isLoading : true })
        const rs = await getListFavoriteProduct()
        if(!rs.error) {
            this.setState({ listFavorite : rs.data, isLoading : false })
        }else{
            this.setState({ isLoading : false })
        }
    }

    _removeProductFavorite = async _id => {

        Alert.alert("Thông báo", "Bạn có muốn xóa sản phẩm này ra khỏi danh sách yêu thích?", [
            { text : "Không" },
            { text : 'Có',  onPress : async () => {
                const result = await dislikeProduct(_id)
                if(!result.error) {
                    alert('Đã xóa khỏi danh sách yêu thích!')
                    // RELOAD
                    const rs = await getListFavoriteProduct()
                    if(!rs.error) {
                        this.setState({ listFavorite : rs.data })
                    }
                }else{
                    alert(result.message)
                }
            }}
        ])
    }

    render() {

        const { listFavorite, isLoading } = this.state
        const { navigation } = this.props

        return(
            <View style={style.container}>

                <View style={[style.wrapTitle]}>
                    <ButtonBack goBack={() => navigation.goBack()} />
                    <Text style={style.title}>
                            Danh sách yêu thích
                    </Text>
                </View>

                <View style={[style.container2]}>
                {
                    isLoading ?
                    <View style={style.container}>
                        <SkypeIndicator size={_heightScale(40)} color={COLOR.MAIN_COLOR} />
                    </View>
                    :
                    <ScrollView 
                    showsVerticalScrollIndicator ={false}
                    style={[style.wrapListItem]}>
                        {
                            listFavorite.length > 0 ?
                            listFavorite.map((item, index) =>
                            <CartFavoriteItem key={index} data={item} removeProduct={this._removeProductFavorite} navigation={navigation} /> 
                            )
                            :
                            <View style={style.wrap_title_empty}>
                                <Text style={[style.txt_empty]}>
                                    Danh sách trống
                                </Text>
                            </View>
                        }
                </ScrollView>
                }
                {/* */}
            </View> 

            </View>
        )
    }
   
}

const style = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : COLOR.WHITE
    },
    wrapTitle : {
        paddingHorizontal : _widthScale(18),
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
        height : _heightScale(70),
        backgroundColor : COLOR.WHITE,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title : {
        fontSize : _heightScale(24),
        color : COLOR.BLACK,
        fontWeight : 'bold',
        marginLeft : _widthScale(20),
    },
    container2 : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'space-between',
    },
    wrapListItem : {
        width : '100%',
        marginBottom : _heightScale(10)
    },
    wrap_title_empty : {
        marginTop : _heightScale(20),
        paddingHorizontal : _widthScale(18)
    },
    txt_empty : {
        fontSize : _heightScale(18),
        color : COLOR.TEXT_GREY
    }
})

export default Cart