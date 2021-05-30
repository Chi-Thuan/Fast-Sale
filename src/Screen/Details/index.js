import React, { Component } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'

import { _widthScale, _heightScale } from '../../Constant/Constants'
import * as COLOR from '../../Constant/Color/index'
import ButtonBack from '../../Components/Details/ButtonBack/index'
import BodyDetails from '../../Components/Details/BodyDetails/index'
import { getProductById } from '../../Services/api'
import * as _font from '../../Constant/Font'
import LinearGradient from 'react-native-linear-gradient';
import { SkypeIndicator } from 'react-native-indicators';

class Details extends Component {

    constructor() {
        super()
        this.state = {
            isLoading : true,
            data : {},
            isLike : false
        }
    }

    async componentDidMount () {
        const { _id } = this.props.route.params
        const { error, data } = await getProductById(_id)
        if(!error) {
            this.setState({ data : data, isLoading : false })
        }else{
            console.log('Lỗi không lấy được chi tiết sp : ',error)
        }
    }

    render() {

        const { isLoading, data } = this.state
        const { navigation } = this.props

        return(
            isLoading ?   
            <View style={{flex : 1, justifyContent : 'center',alignItems : 'center',backgroundColor : COLOR.WHITE}}>
                <SkypeIndicator size={_heightScale(40)} color={COLOR.MAIN_COLOR} />
            </View >
            :
            <View style={[style.container]}>
                {/* CONTROL HEADER */}
                <View style={[style.wrapControl]}>
                    <ButtonBack goBack={() => this.props.navigation.goBack()} />
                    <Text style={[style.titleScreen]}>
                        Fast Sale
                    </Text>
                    {/* <ButtonYeuThich navigation={navigation} /> */}
                </View>
                {/* BODY DETAILS */}
                <BodyDetails item= { data } navigation={navigation} />
                {/* BUTTON MUA NGAY */}
                <View style={style.wrap_button_buynow}>
                    <TouchableOpacity 
                        style={{ flex : 2 }}
                        activeOpacity={0.7}
                        >
                        <LinearGradient 
                        start={{x: 1, y: 1}}
                        end={{x: 0, y: 0}}
                        colors={['#4E37D3', '#2481D6']}
                        style={style.btn_mua_ngay}
                        >
                            <Text style={[_font.stylesFont.fontNolanBold, style.txtMuangay]}>Mua ngay</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{ flex : 1 }} 
                        activeOpacity={0.7}
                        >
                        <View style={style.wrap_add_to_card}>
                            <Text style={[_font.stylesFont.fontNolanBold, style.wrap_txt_add_to_card]}>
                                Thêm giỏ hàng
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container : {
        flex : 1,
        position : 'relative'
    },  
    wrapControl : {
        height : _heightScale(70),
        top : 0,
        left : 0,
        flexDirection : 'row',
        backgroundColor : 'white',
        width : '100%',
        paddingHorizontal : _widthScale(18),
        justifyContent : 'flex-start',
        alignItems : 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    titleScreen : {
        fontSize : _heightScale(24),
        color : COLOR.MAIN_COLOR,
        fontWeight : 'bold',
        marginLeft : _widthScale(20)
    },
    wrap_button_buynow : {
        bottom : 0 ,
        width : '100%',
        flexDirection : 'row',
        justifyContent : 'space-between',
        overflow : 'hidden',
        alignItems : 'center',
        backgroundColor : COLOR.WHITE,
        height : _heightScale(60),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    btn_mua_ngay : {
        padding  : _heightScale(10),
        backgroundColor : COLOR.MAIN_COLOR,
        width : '100%',
        height : '100%',
        justifyContent : 'center',
        alignItems : 'center'
    },
    txtMuangay : {
        color : COLOR.WHITE,
        fontSize : _heightScale(16),
        textTransform : 'uppercase',
    },
    wrap_add_to_card : {
        padding  : _heightScale(10),
        backgroundColor : COLOR.TEXT_GREY,
        width : '100%',
        height : '100%',
        justifyContent : 'center',
        alignItems : 'center'
    },
    wrap_txt_add_to_card : {
        color : COLOR.WHITE,
        fontSize : _heightScale(15),
        textTransform : 'uppercase',
    }
})

export default Details