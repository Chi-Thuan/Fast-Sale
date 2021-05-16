import React, { Component } from 'react'
import { 
    View,
    StyleSheet
} from 'react-native'
import { UIActivityIndicator } from 'react-native-indicators';

import * as COLOR from '../../Constant/Color/index'
import { _heightScale } from '../../Constant/Constants';

class Loading extends Component {
    render() {

        const { isLoading } = this.props

        return(
            isLoading 
            ?
            <View style={style.container}>
                <UIActivityIndicator size={_heightScale(30)} color={COLOR.MAIN_COLOR} />
            </View>
            :
            <></>
        )
    }
}

const style = StyleSheet.create({
    container : {
        position : 'absolute',
        zIndex : 1000,
        justifyContent : 'center',
        alignContent :'center',
        width : '100%',
        height : '100%',
    }
})

export default Loading