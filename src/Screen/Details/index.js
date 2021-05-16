import React, { Component } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    ActivityIndicator
} from 'react-native'

import { _widthScale, _heightScale, BASE_URL } from '../../Constant/Constants'
import * as COLOR from '../../Constant/Color/index'
import ButtonBack from '../../Components/Details/ButtonBack/index'
import ButtonYeuThich from '../../Components/Cart/ButtonYeuThich/index'
import BodyDetails from '../../Components/Details/BodyDetails/index'
import { getProductById } from '../../Services/api'
import { formatCurrencyVND } from '../../Utils/utils'

class Details extends Component {

    constructor() {
        super()
        this.state = {
            isLoading : true,
            data : {}
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
        return(
            this.state.isLoading ?   
            <View style={{flex : 1, justifyContent : 'center',alignItems : 'center',backgroundColor : COLOR.WHITE}}>
                <ActivityIndicator size="large" color={COLOR.MAIN_COLOR} />
            </View >
            :
            <View style={[style.container]}>
                {/* CONTROL HEADER */}
                <View style={[style.wrapControl]}>
                    <ButtonBack goBack={() => this.props.navigation.goBack()} />
                    <Text style={[style.titleScreen]}>
                        Fast Sale
                    </Text>
                    <ButtonYeuThich />
                </View>
                {/* BODY DETAILS */}
                <BodyDetails item = { this.state.data } />
                {/* BUTTON MUA NGAY */}
                <View>
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
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    titleScreen : {
        fontSize : _heightScale(24),
        color : COLOR.MAIN_COLOR,
        fontWeight : 'bold',
    }
})

export default Details