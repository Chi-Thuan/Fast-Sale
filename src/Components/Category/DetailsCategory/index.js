import React, { Component } from 'react'
import {
    StyleSheet, 
    TouchableOpacity, 
    View, 
    Text,
    Image,
    ScrollView,
    ActivityIndicator
} from 'react-native'
import { _heightScale, _widthScale, BASE_URL } from '../../../Constant/Constants'
import * as COLOR from '../../../Constant/Color/index'
import * as ScreenKey from '../../../Constant/ScreenKey'

class DetailsCategory extends Component {

    __goToProductsOfCategory = item => {
        this.props.goToProductsOfCategory.navigate(
            // ScreenKey.CATEGORY_NAVIGATOR,
            // {
            //     screen : ScreenKey.PRODUCTS_OF_CATEGORY,
            //     params : {
            //         infoSubCategory : item
            //     }
            // } 
            ScreenKey.SCREEN_NOT_TAB_BOTTOM,
            {
                screen : ScreenKey.PRODUCTS_OF_CATEGORY,
                params : {
                    infoSubCategory : item
                }
            }
        )
    }

    render() {
        const { data, isLoading } = this.props
        return (
            isLoading ? 
            <View style={{flex : 1, justifyContent : 'center',alignItems : 'center' }}>
                <ActivityIndicator size="large" color={COLOR.MAIN_COLOR} />
            </View>
            :
            <ScrollView
                style={[style.container]}>
                <View style={[style.wrapList]}>

                    {
                        data.map((item, index) => (
                            <TouchableOpacity
                            key={index}
                            style={[style.wrapCart]}
                            activeOpacity={0.7}
                            onPress={ () =>  this.__goToProductsOfCategory(item)}
                            >
                            <View style={[style.cart]}>
                                    <View style={[style.wrapAvatar]}>
                                        <Image
                                            style={[style.avatar]}
                                            source={{ uri : BASE_URL + item.thumbnail }}
                                        />
                                    </View>
                                    <Text style={[style.title]} numberOfLines={2} >
                                        {item.name}
                                    </Text>
                            </View>
                        </TouchableOpacity>
                        ))
                    }
                
                </View>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    container : {
        flex : 1, 
        backgroundColor : COLOR.WHITE,
        paddingHorizontal : _widthScale(5)
    },
    wrapList : {
        width : '100%', 
        flexDirection : 'row', 
        flexWrap : 'wrap', 
        justifyContent : 'space-between' 
    },
    wrapCart : {
        width : '45%',
        marginVertical : _heightScale(5),
        marginHorizontal : _widthScale(5),
    },
    cart : {
        width : '100%',
        height : _heightScale(170),
        justifyContent : 'center',
        alignItems : 'center',
        borderWidth : 1,
        borderColor : COLOR.GREY,
        borderRadius : 10,
        padding: _widthScale(5)
    },
    wrapAvatar : {
        marginTop : _widthScale(5),
        width : '90%',
        height : _heightScale(100),
    },
    avatar : {
        width : '100%',
        height : '100%',
        resizeMode : 'cover',
        borderRadius : _widthScale(5)
    },
    title : {
        marginTop : _heightScale(10),
        color : COLOR.BLACK,
        fontWeight : 'bold',
        fontSize : _heightScale(16),
        textAlign : 'center'
    }
})

export default DetailsCategory