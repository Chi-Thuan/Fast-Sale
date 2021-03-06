import React, { Component } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView,
    TouchableOpacity,
} from 'react-native'

import { _widthScale, _heightScale, BASE_URL } from '../../../Constant/Constants'
import * as COLOR from '../../../Constant/Color/index'
import ButtonBack from '../../../Components/Details/ButtonBack/index'
import { checkout } from '../../../Services/api'
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
                title : `TH??NG TIN ????N H??NG #${this.generateCode()}`,
                content : `Xin ch??o ${userLogin.fullname}, ????n h??ng c???a b???n s??? ???????c giao trong 3 -5 ng??y, t???i ${district.name}, ${province.name}`,
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
                        content="Thanh to??n th??nh c??ng. Vui l??ng ki???m tra l???i Email (c??? trong Spam n???u c???n thi???t nh??)"
                        icon={IMAGES.ICON_ICON_CHECKOUT_DONE}
                    />
    
                    <ModalOnlyOK 
                        isVisible = {isErrorNull}
                        closeModal = { this.__handleShowErrorNull }
                        content="Vui l??ng nh???p ?????y ????? th??ng tin!"
                        icon={IMAGES.ICON_CHECKOUT_TEXT_NULL}
                    />

                    <ModalOnlyOK 
                        isVisible = {isErrorEmail}
                        closeModal = { this.__handleShowErrorEmail }
                        content="H??? th???ng ??ang n??ng c???p, vui l??ng quay l???i sau."
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
                                Thanh to??n
                        </Text>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        >
                        <View style={style.container_body}>
    
                            <View style={style.wrap_box}>
                                <Text style={style.title_box}>
                                    S???n ph???m
                                </Text>
    
                                <View style={style.wrap_bodyBox}>
    
                                    { listCart.map((item, index) =>  <InfoItem  key={index} name={item.name} price={formatCurrencyVND(item.price)} quantity={item.quantity} /> ) }
                                    <Line color='black' margin={_heightScale(15)} />
    
                                    <View style={style.wrap_total} >
                                        <Text style={style.txt_bold}>
                                            T???ng
                                        </Text>
                                        <Text style={style.txt_bold}>
                                            { formatCurrencyVND(priceTotal) }
                                        </Text>
                                    </View>
                                </View>
    
                            </View>
    
                            <View style={style.wrap_box}>
                                <Text style={style.title_box}>
                                    Th??ng tin kh??ch h??ng
                                </Text>
    
                                <View style={style.wrap_bodyBox}>
                                    <View style={style.wrap_row}>
                                        <Text style={[style.txt_row, { flex : 1 }]}>
                                            T??n
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
                                        ?????a ch??? nh???n h??ng
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
                                                        Ch???n t???nh/th??nh ph???
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
                                                    alert('Vui l??ng ch???n t???nh/th??nh ph??? tr?????c!')
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
                                                        Ch???n qu???n/huy???n
                                                    </Text>
                                                }
                                                <Icon name="chevron-right" size={_heightScale(16)} color={COLOR.TEXT_GREY} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
    
                                    {/* <View style={[style.wrap_row, { flexDirection : 'column', alignItems : 'flex-start'}]}>
                                        <Text style={[style.txt_small, { fontStyle : 'normal', fontSize : _heightScale(18), color : COLOR.TEXT_BLACK }]}>
                                            ?????a ch??? c??? th???
                                        </Text>
                                        <TextInput
                                            placeholder={'Nh???p t??n ???????ng, s??? nh??,...'}
                                            style={[style.addressDetails]}
                                        />
                                    </View> */}
    
                                    <Line color='black' margin={_heightScale(15)} />
    
                                    <Text style={[style.title_box, { marginBottom : _heightScale(15) }]}>
                                        H??nh th???c thanh to??n
                                    </Text>
    
                                    <View style={[style.wrap_row, { flexDirection : 'column', alignItems : 'flex-start'}]}>
                                        <View style={style.wrap_option} >
                                            <Text style={[style.txt_small, { fontSize : _heightScale(18), color : COLOR.MAIN_COLOR, fontStyle : 'normal' }]}>
                                                Thanh to??n khi nh???n h??ng
                                            </Text>
                                            <Icon name="circle" size={_heightScale(20)} color={COLOR.MAIN_COLOR} />
                                        </View>
                                        <Text style={[style.txt_small, { marginTop : _heightScale(5) }]}>
                                            Ch??ng t??i ??ang ph??t tri???n m???t v??i h??nh th???c thanh to??n kh??c.
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
                                    txtTitle="MUA H??NG"
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