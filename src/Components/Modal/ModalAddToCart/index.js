import React, { Component } from 'react'
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'
import Modal from 'react-native-modal'
import AsyncStorage  from '@react-native-async-storage/async-storage'

import IMAGES from '../../../Constant/Images/index'
import { _heightScale, _widthScale } from '../../../Constant/Constants'
import * as COLOR from '../../../Constant/Color/index'
import { BASE_URL } from '../../../Constant/Constants'
import { formatCurrencyVND } from '../../../Utils/utils'
import * as _font from '../../../Constant/Font'
import LinearGradient from 'react-native-linear-gradient';

class ModalAddToCart extends Component {

    constructor(){
        super()
        this.state = {
            count : 1,
        }
    }

    __plusCount = () => {
        this.setState({ count : this.state.count + 1 })
    }

    __subCount = () => {
        const preCount = this.state.count
        if(preCount != 1) {
            this.setState({ count : preCount - 1 })
        }
    }

    __resetCount = () => {
        this.setState({ count : 1 })
    }

    _isExistCart = (arr=[]) => {
        return arr.some(item => item._id == this.props.data._id )
    }

    __addToCart = async () => {
        const { data } = this.props // data cart item
        const cart = await AsyncStorage.getItem('cart')
        if(cart != null) {
            const listCart = JSON.parse(cart)
            if(this._isExistCart(listCart)) {
                listCart.forEach(item => {
                    if(item._id == data._id) {
                        item.quantity = this.state.count
                    }
                })
                this.props.closeModal()
                return await AsyncStorage.setItem('cart', JSON.stringify(listCart))
            } else {
                listCart.push({
                    _id : data._id,
                    name : data.name,
                    price : data.price,
                    thumbnail : data.thumbnail,
                    quantity : this.state.count
                }) 
                this.props.closeModal()
                return await AsyncStorage.setItem('cart', JSON.stringify(listCart))
            }
        }else{
            const data_cart = {
                _id : data._id,
                name : data.name,
                price : data.price,
                thumbnail : data.thumbnail,
                quantity : this.state.count
            }
            this.props.closeModal()
            await AsyncStorage.setItem('cart', JSON.stringify([data_cart]))
        }
    }

    render() {
        const { openModal, closeModal, data } = this.props

        return (
            <Modal
                onModalHide={this.__resetCount}
                animationInTiming={400}
                animationOutTiming={400}
                animationIn='slideInUp'
                animationOut='slideOutDown'
                useNativeDriver={true}
                onBackdropPress={closeModal}
                backdropOpacity={0.2}
                style={style.modal}
                isVisible={openModal}
                onBackButtonPress={closeModal}
                >
                <View style={style.container}>

                    <View style={style.wrap_then_gio_hang}>
                        <Text style={[ _font.stylesFont.fontDinTextProBold, style.txt_them_gio_hang]}>Thêm vào giỏ hàng</Text>
                    </View>

                    <TouchableOpacity  
                        onPress={closeModal}
                        style={[style.wrapBtnClose]}>
                        <Image
                            style={style.iconClose}
                            source={IMAGES.ICON_CLOSE_X}
                        />
                    </TouchableOpacity>

                    <View style={[style.wrapBody]}>
                        <View style={[style.wrapInfoCart]}>
                            <Image
                                style={style.avatar}
                                source={{ uri : BASE_URL + data.thumbnail }}
                            />
                            <View style={[style.infoCart]} >
                                <Text 
                                    style={[ _font.stylesFont.fontDinTextPro, style.title ]}
                                    numberOfLines={3}
                                    >
                                {data.name}
                                </Text>
                                <Text style={[_font.stylesFont.fontFester500, style.des ]}>
                                {formatCurrencyVND(data.price)}
                                </Text>
                            </View>
                        </View>

                        <View style={[ style.wrapQuantity ]}>
                            <Text style={[ _font.stylesFont.fontNolan500, style.titleQuantity ]}>
                                Số lượng
                            </Text>
                            <View style={[style.wrapBtnQuantity]}>
                                <TouchableOpacity
                                      activeOpacity={0.7}
                                      onPress={this.__subCount}
                                    >
                                    <View style={[ style.btnQuantity ]}>
                                        <Text>
                                            -
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <View style={[ style.countQuantity ]} >
                                    <Text style={[ _font.stylesFont.fontFester500,]}>
                                        { this.state.count }
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={this.__plusCount}
                                    >
                                    <View style={[ style.btnQuantity ]}>
                                        <Text>
                                            +
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={this.__addToCart}
                        activeOpacity={0.7}
                        >
                             <LinearGradient 
                                start={{x: 1, y: 1}}
                                end={{x: 0, y: 0}}
                                colors={['#4E37D3', '#2481D6']}
                                style={style.wrapBtnCheckout}
                                >
                                        <Text style={[ _font.stylesFont.fontNolanBold, ,style.btnCheckout]}>
                                            Thêm vào giỏ hàng
                                        </Text>
                                </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
}

const style = StyleSheet.create({
    modal : {
        margin : 0,
        flex : 1,
        justifyContent : 'flex-end'
    },
    container : {
        width : '100%',
        height : _heightScale(370),
        backgroundColor : COLOR.WHITE,
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10,
        paddingHorizontal : _widthScale(18),
        paddingTop : _heightScale(60),
        paddingBottom : _heightScale(20),
        position : 'relative',
        justifyContent : 'space-between',
    },
    wrapBtnClose : {
        position : 'absolute',
        top : _heightScale(25),
        right : _widthScale(18)
    },
    iconClose : {
        width : _heightScale(20),
        height : _heightScale(20)
    },
    wrapBody : {
        alignItems : 'center' ,
        flex : 1,
        marginTop : _heightScale(10)
    },
    wrap_then_gio_hang : {
        position : 'absolute',
        top : _heightScale(25),
        left : _widthScale(18)
    },  
    txt_them_gio_hang : {
        fontSize : _heightScale(22),
        textTransform : 'uppercase'
    },
    wrapInfoCart : {
        flexDirection : 'row',
        borderBottomWidth : 0.5,
        borderColor : COLOR.GREY,
        paddingBottom : _heightScale(20)
    },
    avatar : {
        width : _heightScale(100),
        height : _heightScale(100),
        borderRadius : 5
    },
    infoCart : {
        marginLeft : _widthScale(20),
        flex : 1, 
        justifyContent : 'space-between'
    },
    wrapBtnCheckout : {
        width : '100%',
        height : _heightScale(55),
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 40
    },
    title : {
        fontSize : _heightScale(20),
        lineHeight : _heightScale(25),
        color : COLOR.BLACK
    },
    des : {
        fontSize : _heightScale(26),
    },
    wrapQuantity : {
        flex : 1,
        width : '100%',
        justifyContent : 'center',
        marginBottom : _heightScale(15)
    },
    titleQuantity : {
        fontSize : _heightScale(18),
        color : COLOR.TEXT_BLACK
    },
    wrapBtnQuantity : {
        flexDirection : 'row',
        marginTop : _heightScale(10),   
        height : _heightScale(40)
    },
    btnQuantity : {
        width : _heightScale(50),
        height : '100%',
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : COLOR.GREY,
        borderRadius : 5
    },
    countQuantity : {
        width : _heightScale(30),
        height : '100%',
        justifyContent : 'center',
        alignItems : 'center',
        marginHorizontal : _widthScale(10)
    },
    btnCheckout : {
        fontSize : _heightScale(18),
        textTransform : 'uppercase',
        color : COLOR.WHITE,
    }
})

export default ModalAddToCart