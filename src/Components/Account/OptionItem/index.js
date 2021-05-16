import React, { Component } from 'react'
import {
    StyleSheet, 
    TouchableOpacity, 
    View, 
    Text,
    Image,
} from 'react-native'
import { _widthScale, _heightScale, NAME_APP }  from '../../../Constant/Constants'
import IMAGES from '../../../Constant/Images/index'
import * as COLOR from '../../../Constant/Color/index'

class OptionItem extends Component {
    render() {

        const data = this.props

        return (    
            <TouchableOpacity
                onPress={() => {
                    // console.log(data.navigation)
                    // if(data.navigation != null){
                    //     data.navigation()
                    // }else{
                        // alert('ocockso')
                    // }
                }}
                activeOpacity={0.7}>
                <View style={[style.container]}>
                    <View style={[style.wrapTitleOption]}>
                        {
                            data.icon != undefined && 
                              <Image
                              style={{
                                  width :  data.iconWidth ,
                                  height :  data.iconHeight ,
                                  marginRight : _widthScale(10)
                              }}
                              source={{ uri: data.icon }}
                          />
                        }
                        <Text style={[style.title]}>
                            {data.name}
                        </Text>
                    </View>
                    <Image
                        style={[style.iconArrow]}
                        source={IMAGES.ICON_ARROW_RIGHT}
                    />
                    { data.lineBottom == true && <View style={[style.lineBottom]} /> }
                </View>
            </TouchableOpacity>
        )
    }
}

const style = StyleSheet.create({
    container : {
        backgroundColor : COLOR.WHITE,
        position : 'relative',
        height : _heightScale(60),
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingHorizontal : _widthScale(18)
    },
    wrapTitleOption : {
        flexDirection : 'row',
        height : '100%',
        alignItems : 'center'
    },
    title : {
        color : COLOR.BLACK,
        fontSize : _heightScale(18)
    },
    iconArrow : {
        width : _heightScale(9.16),
        height : _heightScale(14.67)
    },
    lineBottom : {
        width : '100%',
        height : 1,
        backgroundColor : COLOR.GREY,
        position : 'absolute',
        bottom : 0,
        marginHorizontal: _widthScale(18)
    }
})

export default OptionItem