import React, { Component } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    TextInput
} from 'react-native'

import { _widthScale, _heightScale, BASE_URL } from '../../../Constant/Constants'
import * as COLOR from '../../../Constant/Color/index'
import ButtonBack from '../../../Components/Details/ButtonBack/index'
import ButtonYeuThich from '../../../Components/Cart/ButtonYeuThich/index'
import BodyDetails from '../../../Components/Details/BodyDetails/index'
import { getProductById, checkout } from '../../../Services/api'
import { formatCurrencyVND, _convertToSlug } from '../../../Utils/utils'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import ButtonPrimaryFullRow from '../../../Components/Global/ButtonPrimaryFullRow/index'
import ModelChooseLocation from '../../../Components/Modal/ModalChooseLocation/index'
import ModelChooseDistrict from '../../../Components/Modal/ModalChooseDistrict/index'
import AsyncStorage  from '@react-native-async-storage/async-storage'
import IMAGES from '../../../Constant/Images/index'
import ModalOnlyOK from '../../../Components/Modal/ModalOnlyOK/index'
import { SkypeIndicator } from 'react-native-indicators';

class ScreenCheckout extends Component {

    constructor() {
        super()
        this.state = {
            isShowModelProvince : false,
            isShowModelDistrict : false,
            listCart : [],
            userLogin : {},
            isCheckoutDone : false,
            isErrorNull : false,
            isLoading : true, 
            isLoadingCheckout : false,
            isErrorEmail : false
        }
    }

    __handleShowDoneCheckout = () => {
        this.setState({ isCheckoutDone : !this.state.isCheckoutDone })
    }

    __handleShowErrorEmail = () => {
        this.setState({ isErrorEmail : !this.state.isErrorEmail })
    }

    __handleShowErrorNull = () => {
        this.setState({ isErrorNull : !this.state.isErrorNull })
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
                priceTotal : totalTemp,
                isLoading : false
            })
        }
        const UserLogin = await AsyncStorage.getItem('userLogin')
        if(UserLogin != null) {
            this.setState({
                userLogin : JSON.parse(UserLogin),
                isLoading : false
            })
        }
    }

    __openModalProvince = () => {
        this.setState({ isShowModelProvince : true })
    }

    __closeModalProvince = () => {
        this.setState({ isShowModelProvince : false })
    }

    _getProvinceFromModel = province => {
        if(province) {
            this.setState({ 
                province,
                district : null
            })
        }
    }

    __openModalDistrict = () => {
        this.setState({ isShowModelDistrict : true })
    }

    __closeModalDistrict = () => {
        this.setState({ isShowModelDistrict : false })
    }

    _getDistrictFromModel = district => {
        if(district) {
            this.setState({ district })
        }
    }

    generateCode = (n = '') => n.length < 6 ? this.generateCode(n + `${Math.floor(Math.random() * 10)}`) : n

    __handleBuy = async () => {
        const { province, district } = this.state
        this.setState({ isLoadingCheckout : true })
        if( !province || !district) {
            this.setState({ isLoadingCheckout : false })
            this.__handleShowErrorNull()
        }else{
            const { userLogin } = this.state
            let info = {
                email  : userLogin.email ,
                title : `THÔNG TIN ĐƠN HÀNG #${this.generateCode()}`,
                content : `Xin chào ${userLogin.fullname}, đơn hàng của bạn sẽ được giao trong 3 -5 ngày, tại ${district.name}, ${province.name}`,
            }
            const rs = await checkout(info)
            this.setState({ isLoadingCheckout : false })
            if(!rs.error) {
                this.__handleShowDoneCheckout()
            }else{
                this.__handleShowErrorEmail()
            }
        }
    }

    render() {

        const { 
            isShowModelProvince, 
            isShowModelDistrict, 
            province, 
            district, 
            priceTotal, 
            listCart,
            isCheckoutDone,
            userLogin,
            isErrorNull,
            isLoadingCheckout,
            isErrorEmail,
            isLoading } = this.state
        const { navigation } = this.props

        return(
            <>
                {
                    isLoading ? 
                    <View style={{flex : 1, justifyContent : 'center',alignItems : 'center',backgroundColor : COLOR.WHITE}}>
                      <SkypeIndicator size={_heightScale(40)} color={COLOR.MAIN_COLOR} />
                   </View> :
                    <View style={style.container}>

                    <ModalOnlyOK 
                        isVisible = {isCheckoutDone}
                        closeModal = { this.__handleShowDoneCheckout }
                        content="Thanh toán thành công. Vui lòng kiểm tra lại Email (cả trong Spam nếu cần thiết nhé)"
                        icon={IMAGES.ICON_ICON_CHECKOUT_DONE}
                    />
    
                    <ModalOnlyOK 
                        isVisible = {isErrorNull}
                        closeModal = { this.__handleShowErrorNull }
                        content="Vui lòng nhập đầy đủ thông tin!"
                        icon={IMAGES.ICON_CHECKOUT_TEXT_NULL}
                    />

                    <ModalOnlyOK 
                        isVisible = {isErrorEmail}
                        closeModal = { this.__handleShowErrorEmail }
                        content="Hệ thống đang nâng cấp, vui lòng quay lại sau."
                        icon={IMAGES.ICON_CHECKOUT_UPDATE}
                    />
    
                    <ModelChooseLocation
                        isVisible={isShowModelProvince}
                        closeModal={this.__closeModalProvince}
                        actionChoose={this._getProvinceFromModel}
                    />
                    
    
                    <ModelChooseDistrict
                        isVisible={isShowModelDistrict}
                        closeModal={this.__closeModalDistrict}
                        actionChoose={this._getDistrictFromModel}
                        parent_code={province && province.code || null }
                    />  

                    {
                        isLoadingCheckout ?
                         <View style={{flex : 1, zIndex: 1000, width : '100%', height : '100%',  position : 'absolute', top : 0, left :0 ,justifyContent : 'center',alignItems : 'center',backgroundColor : 'rgba(0,0,0,0.095)'}}>
                            <SkypeIndicator size={_heightScale(40)} color={COLOR.MAIN_COLOR} />
                        </View> 
                        : <></>
                    }
                     
                    <>
                    <View style={[style.wrapTitle]}>
                        <ButtonBack goBack={() => navigation.goBack()} />
                        <Text style={style.title}>
                                Thanh toán
                        </Text>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        >
                        <View style={style.container_body}>
    
                            <View style={style.wrap_box}>
                                <Text style={style.title_box}>
                                    Sản phẩm
                                </Text>
    
                                <View style={style.wrap_bodyBox}>
    
                                    { listCart.map((item, index) =>  <InfoItem  key={index} name={item.name} price={formatCurrencyVND(item.price)} quantity={item.quantity} /> ) }
                                    <Line color='black' margin={_heightScale(15)} />
    
                                    <View style={style.wrap_total} >
                                        <Text style={style.txt_bold}>
                                            Tổng
                                        </Text>
                                        <Text style={style.txt_bold}>
                                            { formatCurrencyVND(priceTotal) }
                                        </Text>
                                    </View>
                                </View>
    
                            </View>
    
                            <View style={style.wrap_box}>
                                <Text style={style.title_box}>
                                    Thông tin khách hàng
                                </Text>
    
                                <View style={style.wrap_bodyBox}>
                                    <View style={style.wrap_row}>
                                        <Text style={[style.txt_row, { flex : 1 }]}>
                                            Tên
                                        </Text>
                                        <View style={style.item_left}>
                                            <Text style={style.txt_row}>
                                                { userLogin.fullname }
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={style.wrap_row}>
                                        <Text style={[style.txt_row]}>
                                            Email
                                        </Text>
                                        <View style={style.item_left}>
                                            <Text style={style.txt_row}>
                                            { userLogin.email }
                                            </Text>
                                        </View>
                                    </View>
    
                                    <Line color='black' margin={_heightScale(15)} />
    
                                    <Text style={[style.title_box, { marginBottom : _heightScale(15) }]}>
                                        Địa chỉ nhận hàng
                                    </Text>
    
    
                                    <View style={style.wrap_row}>
                                        <TouchableOpacity style={{width : '100%'}}
                                            onPress={this.__openModalProvince}
                                            activeOpacity={0.7}
                                        >
                                            <View style={style.wrap_option} >
                                                {
                                                    province ?
                                                    <Text style={[style.txt_small, { fontSize : _heightScale(18), color : COLOR.MAIN_COLOR, fontStyle : 'normal' }]}>
                                                        {`${province.name}`}
                                                    </Text> 
                                                    :
                                                    <Text style={style.txt_small}>
                                                        Chọn tỉnh/thành phố
                                                    </Text>
                                                }
                                                <Icon name="chevron-right" size={_heightScale(16)} color={COLOR.TEXT_GREY} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
    
                                    <View style={style.wrap_row}>
                                        <TouchableOpacity style={{width : '100%'}}
                                            activeOpacity={0.7}
                                            onPress={() => {
                                                if(!province) {
                                                    alert('Vui lòng chọn tỉnh/thành phố trước!')
                                                }else{
                                                    this.__openModalDistrict()
                                                }
                                            }}
                                        >
                                            <View style={style.wrap_option} >
                                                {
                                                    district ?
                                                    <Text style={[style.txt_small, { fontSize : _heightScale(18), color : COLOR.MAIN_COLOR, fontStyle : 'normal' }]}>
                                                        {`${district.name}`}
                                                    </Text> 
                                                    :
                                                    <Text style={style.txt_small}>
                                                        Chọn quận/huyện
                                                    </Text>
                                                }
                                                <Icon name="chevron-right" size={_heightScale(16)} color={COLOR.TEXT_GREY} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
    
                                    {/* <View style={[style.wrap_row, { flexDirection : 'column', alignItems : 'flex-start'}]}>
                                        <Text style={[style.txt_small, { fontStyle : 'normal', fontSize : _heightScale(18), color : COLOR.TEXT_BLACK }]}>
                                            Địa chỉ cụ thể
                                        </Text>
                                        <TextInput
                                            placeholder={'Nhập tên đường, số nhà,...'}
                                            style={[style.addressDetails]}
                                        />
                                    </View> */}
    
                                    <Line color='black' margin={_heightScale(15)} />
    
                                    <Text style={[style.title_box, { marginBottom : _heightScale(15) }]}>
                                        Hình thức thanh toán
                                    </Text>
    
                                    <View style={[style.wrap_row, { flexDirection : 'column', alignItems : 'flex-start'}]}>
                                        <View style={style.wrap_option} >
                                            <Text style={[style.txt_small, { fontSize : _heightScale(18), color : COLOR.MAIN_COLOR, fontStyle : 'normal' }]}>
                                                Thanh toán khi nhận hàng
                                            </Text>
                                            <Icon name="circle" size={_heightScale(20)} color={COLOR.MAIN_COLOR} />
                                        </View>
                                        <Text style={[style.txt_small, { marginTop : _heightScale(5) }]}>
                                            Chúng tôi đang phát triển một vài hình thức thanh toán khác.
                                        </Text>
                                    </View>
    
                                </View>
    
                            </View>
    
                            <View
                                style={{
                                    marginTop : _heightScale(10),
                                    paddingHorizontal : _widthScale(18),
                                    marginBottom : _heightScale(30)
                                }}
                            >
                                <ButtonPrimaryFullRow 
                                    chooseAccept={this.__handleBuy}
                                    txtTitle="MUA HÀNG"
                                />
                            </View>
                        </View>
                    </ScrollView>
                    </>
    
                  </View>
            
                }
            </>
           )
    }
}

class InfoItem extends Component{
    render() {

        const style = StyleSheet.create({
            wrap_row : {
                flexDirection : 'row',
                justifyContent : 'space-between',
                alignItems : 'flex-start',
                marginBottom : _heightScale(10)
            },
            item_left : {
                flex : 1,
                flexDirection : 'row',
                justifyContent : 'flex-end',
                marginLeft : _widthScale(30)
            },
            txt_row : {
                fontSize : _heightScale(18),
                color : COLOR.TEXT_BLACK
            }
        })

        const { name, price, quantity } = this.props

        return(
            <View style={style.wrap_row}>
                <Text style={[style.txt_row, { flex : 1 }]}>
                    {name}
                </Text>
                <View style={style.item_left}>
                    <Text style={style.txt_row}>
                        {price}
                    </Text>
                    <Text style={[style.txt_row, { marginLeft : _widthScale(20) }]}>
                        {`x ${quantity}`}
                    </Text>
                </View>
            </View>
        )
    }
}

class Line extends Component {
    render(){
        const data = this.props
        return (
            <View style={{ height : data.height || _heightScale(1), width : '100%', backgroundColor : data.color, marginVertical : data.margin || _heightScale(10) }} />
        )
    }
}

const style = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor  : COLOR.WHITE,
        position : 'relative'
    },
    wrapTitle : {
        paddingHorizontal : _widthScale(18),
        flexDirection : 'row',
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
        marginLeft : _widthScale(15)
    },
    container_body : {
        paddingTop : _heightScale(10)
    },
    wrap_box : {
        marginHorizontal : _widthScale(18),
        backgroundColor : COLOR.WHITE,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        
        padding : _widthScale(15),
        borderRadius : 10,
        marginVertical : _heightScale(10)
    },
    title_box : {
        fontSize : _heightScale(22),
        fontWeight : 'bold'
    },
    wrap_bodyBox : {
        marginTop : _heightScale(20)
    },
    wrap_total : {
        flexDirection: 'row',
        width : '100%',
        justifyContent : 'space-between'
    },
    txt_bold : {
        fontSize : _heightScale(20),
        fontWeight : 'bold'
    },

    wrap_row : {
        width : '100%',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginBottom : _heightScale(10)
    },
    item_left : {
        flexDirection : 'row',
        justifyContent : 'flex-end',
    },
    txt_row : {
        fontSize : _heightScale(18),
        color : COLOR.TEXT_BLACK
    },
    txt_small : {
        fontSize : _heightScale(16),
        fontStyle : 'italic',
        color : COLOR.TEXT_GREY
    },
    wrap_option : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        width : '100%',
        alignItems : 'center',
        height : _heightScale(40),
        paddingHorizontal : _widthScale(10),
        borderWidth : 1,
        borderColor : COLOR.TEXT_GREY,
        borderRadius : 5
    },
    addressDetails : {
        marginTop : _heightScale(10),
        width : '100%',
        paddingHorizontal : _widthScale(10),
        borderWidth : 1,
        borderColor : COLOR.TEXT_GREY,
        borderRadius : 5,
        color : COLOR.MAIN_COLOR,
        fontSize : _heightScale(18),
    }
})

export default ScreenCheckout