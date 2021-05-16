import React, { Component } from 'react'
import {
    StyleSheet, 
    TouchableOpacity, 
    View, 
    Text,
    Image,
    Alert,
} from 'react-native'
import AsyncStorage  from '@react-native-async-storage/async-storage'

import { BASE_URL } from '../../../Constant/Constants' 
import { _heightScale, _widthScale } from '../../../Constant/Constants'
import IMAGES from '../../../Constant/Images/index'
import * as COLOR from '../../../Constant/Color/index'
import * as ScreenKey from '../../../Constant/ScreenKey'
import { formatCurrencyVND } from '../../../Utils/utils'

class CartItem extends Component {

    constructor(){
        super()
        this.state = {
            count : 1
        }
    }

    componentDidMount() {
        this.setState({ count : this.props.data.quantity })
    }

    __plusCount = () => {
        this.setState({ count : this.state.count + 1 })
        this._updateQuantity()
    }

    __subCount = async () => {
        const preCount = this.state.count
        if(preCount != 1) {
            this.setState({ count : preCount - 1 })
            this._updateQuantity()
        }
    }

    _updateQuantity = async () => {
        const cart = await AsyncStorage.getItem('cart')
        const listCart = JSON.parse(cart)
        listCart.forEach(item => {
            if(item._id == this.props.data._id) {
                item.quantity = this.state.count
            }
        })
        await AsyncStorage.setItem('cart', JSON.stringify(listCart))
        this.props.updateCart()
    }

    __removeCart = () => {
        Alert.alert("Xóa khỏi giỏ hàng", "Xóa sản phẩm này ra khỏi giỏ hàng?", [
            { text : "Không" },
            { text : 'Xóa',  onPress : async () => {  
                const listCart = JSON.parse(await AsyncStorage.getItem('cart'))
                const new_list = listCart.filter(item => item._id !== this.props.data._id )
                await AsyncStorage.setItem('cart', JSON.stringify(new_list))
                this.props.updateCart()
            }}
        ])
    }

    render() {

        const { data, navigation } = this.props

        return (
            <View style={[style.container]}>
                <TouchableOpacity 
                    onPress={this.__removeCart}
                    style={[style.wrapBtnDelete]}
                    >
                    <View>
                        <Image 
                            style={style.iconTrash}
                            source={IMAGES.TRASH}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                >
                    <View style={[style.wrapAvatar]}>
                        <Image
                            style={[style.avatar]}
                            source={{ uri : BASE_URL + data.thumbnail }}
                        />
                    </View>
                </TouchableOpacity>

                <View style={[style.wrapInfoItem]}>
                    <TouchableOpacity style={{ marginRight : _widthScale(30) }}>
                        <Text 
                            style={[style.titleItem]}
                            numberOfLines={3}
                        >  
                            { data.name }
                        </Text>
                    </TouchableOpacity>
                    
                    <View style={[style.wrapInfoBottom]}>
                        <Text style={[style.txtPrice]}>
                        { formatCurrencyVND(data.price) }
                        </Text>
                        <View style={[style.wrapQuantity]}>
                            <TouchableOpacity
                                onPress={this.__subCount}
                                activeOpacity={0.7}
                                >
                                <View  style={[style.btnQuantity]}>
                                    <Text style={[style.iconQuantity]}>
                                        -
                                    </Text>
                                </View>
                            </TouchableOpacity>
                           <View style={[style.countQuantity]}>
                                <Text style={[style.txtCount]}>
                                    { this.state.count }
                                </Text>
                           </View>
                            <TouchableOpacity
                                onPress={this.__plusCount}
                                activeOpacity={0.7}
                                >
                                <View style={[style.btnQuantity]}>
                                    <Text style={[style.iconQuantity]}>
                                        +
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View> 
        )
    }
}

const style = StyleSheet.create({
    container : {
        paddingHorizontal : _widthScale(18),
        backgroundColor : COLOR.WHITE,
        width : '100%',
        height :_heightScale(140),
        flexDirection : 'row',
        alignItems : 'center',
        position : 'relative',
    },
    wrapBtnDelete : {
        position : 'absolute',
        top : _heightScale(20),
        right :_widthScale(18)
    },
    iconTrash : {
        width : _heightScale(20),
        height : _heightScale(21)
    },  
    wrapAvatar : {
        borderRadius : 10,
        overflow : 'hidden',
        width : _heightScale(100),
        height : _heightScale(100)
    },
    avatar : {
        width : '100%',
        height : '100%',
        resizeMode : 'contain'
    },
    wrapInfoItem : {
        flex : 1,
        height : '100%',
        paddingVertical : _heightScale(20),
        marginLeft : _widthScale(15),
        justifyContent : 'space-between'
    },
    titleItem : {
        fontSize : _heightScale(16),
        color : COLOR.TEXT_BLACK,
        lineHeight : _heightScale(20)
    },
    wrapInfoBottom : {
        flexDirection : 'row',
        alignItems : 'flex-end',
        justifyContent : 'space-between',
    },
    txtPrice : {
        fontSize : _heightScale(20),
        fontWeight : 'bold'
    },
    wrapQuantity : {
        flexDirection : 'row',
        alignItems : 'flex-end'
    },
    btnQuantity : {
        width : _heightScale(25),
        height : _heightScale(25),
        justifyContent : 'center',
        alignItems : 'center'
    },
    iconQuantity : {
        fontWeight : 'bold',
        fontSize : _heightScale(20)
    },
    countQuantity : {
        width : _heightScale(35),
        height : _heightScale(25),
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : COLOR.GREY_WHITE,
        marginHorizontal : _widthScale(5)
    },
    txtCount : {
       fontSize : _heightScale(14)
    }
})

export default CartItem