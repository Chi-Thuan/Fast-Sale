import React, { Component } from 'react'
import {
    StyleSheet, 
    TouchableOpacity, 
    View, 
    Text,
    Image,
    ScrollView
} from 'react-native'
import { _heightScale, _widthScale, BASE_URL } from '../../../Constant/Constants'
import * as COLOR from '../../../Constant/Color/index'

class CategoryItem extends Component {

    render() {
        const { data, _idActive } = this.props
        return(
            <ScrollView
            showsVerticalScrollIndicator={false}
            >
                {
                    data.length > 0 && data.map((item, index) => 
                    (
                        <TouchableOpacity
                        key={index}
                        activeOpacity={0.9}
                        onPress={ () => this.props._chooseCategory(item._id) }
                        >
                            <View style={[style.cart, item._id == _idActive && { backgroundColor : COLOR.WHITE }]}>
                                
                                { item._id == _idActive && <View style={[style.lineActive]} /> }
                                
                                <Image
                                    style={{
                                        width: _heightScale(30),
                                        height : _heightScale(30),
                                        resizeMode : 'cover'
                                    }}
                                    source={{ uri : BASE_URL + item.thumbnail }}
                                    />
                                <Text style={[style.title, item._id == _idActive ? style.colorActive : style.colorNormal]}>
                                    {item.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }

            </ScrollView>
        )
    }
}

export default CategoryItem

const style = StyleSheet.create({
    cart : {
        width : _widthScale(70),
        height : _heightScale(85),
        backgroundColor: COLOR.GREY_WHITE,
        justifyContent : 'center',
        alignItems : 'center',
        position : 'relative'
    },
    title : {
        textAlign : 'center',
        fontSize : _heightScale(14),
        paddingHorizontal : _widthScale(5),
        marginTop : _heightScale(5)
    },
    colorActive : {
        color : COLOR.MAIN_COLOR,
        fontWeight : 'bold'
    },
    colorNormal : {
        color : COLOR.TEXT_BLACK,
    },
    lineActive : {
        height : '100%',
        position : 'absolute',
        width : _widthScale(3),
        backgroundColor : COLOR.MAIN_COLOR,
        top : 0,
        left : 0,
    }
})