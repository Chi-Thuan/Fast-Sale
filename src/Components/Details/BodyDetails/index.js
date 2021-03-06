import React, { Component } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native'
import { _heightScale, _widthScale, BASE_URL } from '../../../Constant/Constants'

import IMAGES from '../../../Constant/Images/index'
import * as COLOR from '../../../Constant/Color/index'
import { formatCurrencyVND } from '../../../Utils/utils'
import AsyncStorage  from '@react-native-async-storage/async-storage'
import * as ScreenKey from '../../../Constant/ScreenKey'
import { likeProduct } from '../../../Services/api'
import { dislikeProduct, checkIsLikeProduct } from '../../../Services/api'
import HTML from "react-native-render-html";
import * as _font from '../../../Constant/Font'
import ModalToast from '../../../Components/Modal/ModalToast/index'
import ModalMustLogin from '../../../Components/Modal/ModalMustLogin/index'
import { SkypeIndicator } from 'react-native-indicators';

class ButtonBack extends Component {

    constructor(props){
        super();
        this.state = {
            isLike : false,
            isShowToast : false,
            contentToast : '',
            isErrorLogin : false,
            isLoading : false
        }
    }

    async componentDidMount() {
        this.setState({ isLoading : true })
        const { item } = this.props
        const infoLike = await checkIsLikeProduct(item._id)  
        if(!infoLike.error) {
            this.setState({ isLike : true, isLoading : false })
        }else{
            this.setState({ isLoading : false })
            console.log('Lỗi không lấy được chi tiết sp : ',error)
        }
    }

    openPopupErrorLogin = () => {
        this.setState({ isErrorLogin : !this.state.isErrorLogin })
    }

    _handleShowToast = () => {
        this.setState({  isShowToast : !this.state.isShowToast })
    }

    _handleNavigateLogin = () => {
        this.openPopupErrorLogin()
        const { navigation } = this.props
        navigation.replace(ScreenKey.SCREEN_NOT_TAB_BOTTOM, { screen : ScreenKey.LOGIN})
    }

    _handleLikeProduct = async () => {

        const { navigation, item } = this.props
        const UserLogin = await AsyncStorage.getItem('userLogin')

        console.log(UserLogin)

        if(UserLogin != null) {
            const result = await likeProduct(item._id)
            if(!result.result) {
                this.setState({ isLike : true, contentToast : 'Đã thêm vào danh sách yêu thích'},
                function () {
                    this._handleShowToast()
                    setTimeout(() => {
                        this._handleShowToast()
                    }, 500);
                })
            }else{
                alert(result.message)
            }
        }else{
            this.openPopupErrorLogin()
        }
    }

    

    _handleDisLikeProduct = async () => {
        const { item } = this.props
        const result = await dislikeProduct(item._id)
        if(!result.error) {
            this.setState({ isLike : false, contentToast : 'Đã xóa khỏi danh sách yêu thích!' },
            function () {
                this._handleShowToast()
                setTimeout(() => {
                    this._handleShowToast()
                }, 500);
            })
        }else{
            alert(result.message)
        }
    }

    render(){
        
        const { isLike, isShowToast, contentToast, isErrorLogin, isLoading } = this.state
        const { item } = this.props
        
        return (
            <>
            <ModalToast
                content = {contentToast}
                isVisible = {isShowToast}
            />

            <ModalMustLogin 
                isVisible={isErrorLogin} 
                closeModal={this.openPopupErrorLogin}
                actionAccept={this._handleNavigateLogin}
            /> 

                    {
                    isLoading ?    
                    <View style={{ flex : 1 }}>
                        <SkypeIndicator size={_heightScale(40)} color={COLOR.MAIN_COLOR} />
                    </View>
                    :
                    <ScrollView
                    showsVerticalScrollIndicator={false}
                    >
                   <View style={[style.boxContainer]}>
                        
    
                        {/* ẢNH ĐẠI DIỆN */}
                        <View style={[style.wrapAvatar]}>
                            <Image 
                                style={[style.avatar]}
                                source={{ uri : item.isThumbnailURL ? item.thumbnail : BASE_URL + item.thumbnail }}
                            />
                        </View>
                        {/* GIÁ */}
                        <View style={[style.wrapPrice]}>
                            <Text style={[_font.stylesFont.fontFester500, style.txtPrice]}>
                                { formatCurrencyVND(item.price) }
                            </Text>
    
                            <TouchableWithoutFeedback
                                activeOpacity={0.7}
                                onPress={isLike ? this._handleDisLikeProduct : this._handleLikeProduct}
                            >
                                <View style={[style.wrapBtnFavorite, isLike == false ? style.btnFavorite_Normal : style.btnFavorite_Active]}>
                                    <Image 
                                        style={[style.btnFavorite]}
                                        source={IMAGES.ICON_FAVORITE}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        {/* TÊN SẢN PHẨM */}
                        <Text style={[_font.stylesFont.fontNolanBold, style.nameProduct]}>
                            {item.name}
                        </Text>
                   </View>
    
                   <View style={[style.boxContainer2]}>
                        <Text style={[style.titleBox]}>
                            Chi tiết sản phẩm 
                        </Text>
                         <HTML source={{ html: `${item.description}` }}/>
                       
                    </View>
    
                </ScrollView>
           
                    }
           
            </>
             )
    }
}

const style = StyleSheet.create({
    boxContainer : {
        backgroundColor : COLOR.WHITE
    },
    wrapAvatar : {
        width : '100%',
        height : _heightScale(400),
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
        fontSize : _heightScale(40),
        // color : COLOR.BLACK,
        color : COLOR.MAIN_COLOR
        // fontWeight : 'bold' 
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