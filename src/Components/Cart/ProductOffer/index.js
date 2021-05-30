import React, { Component } from 'react'
import {
    StyleSheet, 
    View, 
    Text,
} from 'react-native'
import { _heightScale, _widthScale } from '../../../Constant/Constants'
import * as COLOR from '../../../Constant/Color/index'
import ProductItem from '../../../Components/Global/ProductItem/index'
import { getProductNew } from '../../../Services/api';
import { SkypeIndicator } from 'react-native-indicators';

class ProductOffer extends Component {

    constructor(){
        super()
        this.state = {
            dataOffer : [],
            isLoading : true
        }
    }

    async componentDidMount () {
        const { error, data } = await getProductNew()
        if(!error) {
            this.setState({ dataOffer : data, isLoading : false })
        }else{
            console.log('!!!!!! ERROR GET DATA OFFER', error)
        }
    }

    render() {
        return (
            <View style={[style.container]}>
                <Text style={[style.title]}>
                    Sản phẩm nổi bật
                </Text>
                {
                    this.state.isLoading ?   
                    <View style={{flex : 1, justifyContent : 'center',alignItems : 'center' }}>
                         <SkypeIndicator size={_heightScale(40)} color={COLOR.MAIN_COLOR} />
                    </View>
                    : 
                    <View style={style.wrapItemTrending}>
                        {
                            this.state.dataOffer.map((item, index) => 
                                <ProductItem showModalAddToCart={() => this.props._openModalAddToCart(item._id)} item={item} key={index} goToDetails={this.props.navigation} />
                            )
                        }
                </View>
                }
            </View>
        )
    }
}

const style = StyleSheet.create({
    container : {
        marginTop : _heightScale(10),
        backgroundColor : COLOR.GREY_WHITE
    },
    title : {
        textAlign : 'center',
        color : COLOR.BLACK,
        fontWeight : 'bold',
        fontSize : _heightScale(18),
        marginTop : _heightScale(20), 
        marginBottom : _heightScale(20),
        textTransform : 'uppercase',
    },
    wrapItemTrending : {
        marginHorizontal : _widthScale(8), 
        justifyContent : 'space-between', 
        flexDirection : 'row', 
        flexWrap: 'wrap'
    }
})

export default ProductOffer