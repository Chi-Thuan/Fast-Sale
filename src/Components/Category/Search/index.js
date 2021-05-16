import React, { Component } from 'react'
import {
    StyleSheet, 
    TouchableOpacity, 
    View, 
    Text,
    Image
} from 'react-native'
import { _heightScale, _widthScale } from '../../../Constant/Constants'
import * as COLOR from '../../../Constant/Color/index'
import IMAGES from '../../../Constant/Images/index'
import * as ScreenKey from '../../../Constant/ScreenKey'

class Search extends Component {

    render() {

        const { navigation } = this.props

        return(
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    navigation.navigate(ScreenKey.SCREEN_NOT_TAB_BOTTOM, { screen : ScreenKey.SEARCH })
                }}
                >
                <View style={[style.search]}>
                    <Image
                        style={[style.iconSearch]}
                        source={ IMAGES.ICON_SEARCH_HOME }
                        />
                    <Text style={[style.titleSearch]}>Tìm kiếm sản phẩm</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default Search

const style = StyleSheet.create({
    search : {
        width : _widthScale(300),
        height : _heightScale(40),
        borderRadius : 20,
        backgroundColor : COLOR.GREY,
        flexDirection : 'row',
        alignItems : 'center',
        paddingLeft : _widthScale(30)
    },
    titleSearch : {
        color: COLOR.TEXT_GREY,
        fontSize : _heightScale(16)
    },
    iconSearch : {
        width: _heightScale(15),
        height : _heightScale(15),
        position : 'absolute',
        left : _widthScale(10)
    }
})