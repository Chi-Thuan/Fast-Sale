import React, {Component} from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'

import { _widthScale, _heightScale }  from '../../Constant/Constants'
import * as COLOR from '../../Constant/Color/index'
import { dislikeProduct, getListFavoriteProduct } from '../../Services/api'
import ButtonBack from '../../Components/Details/ButtonBack/index'
import CartFavoriteItem from '../../Components/Favorite/CartItem/index'
import { SkypeIndicator } from 'react-native-indicators';
import ModalConfirm from '../../Components/Modal/ModalConfirm/index'
import IMAGES from '../../Constant/Images/index'

class Cart extends Component {

    constructor(){
        super()
        this.state = {
            listFavorite : [],
            isLoading : false,
            isPopupRemove : false,
            _idCartRemove : ''
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

    __handleOpenPopupRemove = _id => {
        this.setState({isPopupRemove : !this.state.isPopupRemove, _idCartRemove : _id})
    }

    __handleRemove = async () => {
        const { _idCartRemove } = this.state
        const result = await dislikeProduct(_idCartRemove)
        if(!result.error){
            const rs = await getListFavoriteProduct()
            if(!rs.error) {
                this.setState({ listFavorite : rs.data, isPopupRemove : false })
            }
        }else{
            alert(result.message)
        }
    }

    render() {

        const { listFavorite, isLoading, isPopupRemove } = this.state
        const { navigation } = this.props

        return(
            <View style={style.container}>

                <ModalConfirm 
                    icon={IMAGES.ICON_CART_TRASH}
                    isVisible={isPopupRemove}
                    content={"Bạn chắc muốn xóa sản phẩm ra khỏi danh sách yêu thích?"}
                    closeModal={this.__handleOpenPopupRemove}
                    actionAccept={this.__handleRemove}
                />

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
                            <CartFavoriteItem key={index} data={item} removeProduct={ ()=> this.__handleOpenPopupRemove(item._id)} navigation={navigation} /> 
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