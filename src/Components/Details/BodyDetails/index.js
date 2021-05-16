import React, { Component } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native'
import { _heightScale, _widthScale, BASE_URL } from '../../../Constant/Constants'

import IMAGES from '../../../Constant/Images/index'
import * as COLOR from '../../../Constant/Color/index'
import { formatCurrencyVND } from '../../../Utils/utils'

class ButtonBack extends Component {

    constructor(props){
        super();
        this.state = {
            isFavorite : false
        }
    }

    setFavorite = () => {
        this.setState({ isFavorite: !this.state.isFavorite })
    }

    render(){

        const { item } = this.props
        
        return (
            <ScrollView>
               <View style={[style.boxContainer]}>
                    {/* ẢNH ĐẠI DIỆN */}
                    <View style={[style.wrapAvatar]}>
                        <Image 
                            style={[style.avatar]}
                            source={{ uri : BASE_URL +item.thumbnail }}
                        />
                    </View>
                    {/* GIÁ */}
                    <View style={[style.wrapPrice]}>
                        <Text style={[style.txtPrice]}>
                            { formatCurrencyVND(item.price) }
                            
                        </Text>

                        <TouchableWithoutFeedback
                            activeOpacity={0.7}
                            onPress={this.setFavorite}
                        >
                            <View style={[style.wrapBtnFavorite, this.state.isFavorite == false ? style.btnFavorite_Normal : style.btnFavorite_Active]}>
                                <Image 
                                    style={[style.btnFavorite]}
                                    source={IMAGES.ICON_FAVORITE}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    {/* TÊN SẢN PHẨM */}
                    <Text style={[style.nameProduct]}>
                        {item.name}
                    </Text>
               </View>

               <View style={[style.boxContainer2]}>
                    <Text style={[style.titleBox]}>
                        Chi tiết sản phẩm 
                    </Text>
                    <Text style={[style.contentBoxDes]}>
                    {item.description}
                    </Text>
                </View>

            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    boxContainer : {
        backgroundColor : COLOR.WHITE
    },
    wrapAvatar : {
        width : '100%',
        height : _heightScale(500),
    },
    avatar : {
        width : '100%',
        height : '100%',
        resizeMode : 'cover'
    },
    wrapPrice : {
        paddingTop :_heightScale(20),
        paddingBottom : _heightScale(10),
        width : '100%',
        paddingHorizontal : _widthScale(18),
        flexDirection : 'row',
        justifyContent : 'space-between',
        backgroundColor : COLOR.WHITE
    },
    txtPrice : {
        fontSize : _heightScale(34),
        color : COLOR.BLACK,
        fontWeight : 'bold' 
    },
    wrapBtnFavorite : {
        width : _heightScale(38),
        height : _heightScale(38),
        borderRadius : _heightScale(38/2),
        justifyContent : 'center',
        alignItems : 'center',
        borderWidth : 1,
    },
    btnFavorite_Normal : {
        borderColor : COLOR.GREY,
    },
    btnFavorite_Active : {
        borderColor : COLOR.MAIN_COLOR,
        backgroundColor : COLOR.MAIN_COLOR
    },
    btnFavorite : {
        width : _heightScale(21),
        height : _heightScale(17),
    },
    nameProduct : {
        paddingHorizontal : _widthScale(18),
        fontSize : _heightScale(22),
        lineHeight : _heightScale(30),
        paddingBottom : _heightScale(15),
    },
    boxContainer2 : {
        marginTop : _heightScale(10),
        backgroundColor : COLOR.WHITE,
        paddingHorizontal : _widthScale(18)
    },
    titleBox : {
        color : COLOR.BLACK,
        fontWeight : 'bold',
        fontSize : _heightScale(20),
        marginTop : _heightScale(20), 
        marginBottom : _heightScale(10),
    }, 
    contentBoxDes : {
        fontSize : _heightScale(20),
        color : COLOR.TEXT_BLACK,
        lineHeight : _heightScale(25),
        paddingBottom : _heightScale(15),
        textAlign : 'justify'
    }
})

export default ButtonBack