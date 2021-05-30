import React ,{Component}from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput,
    TouchableOpacity,
    Image} from 'react-native'
import { _widthScale, _heightScale }  from '../../Constant/Constants'
import * as COLOR from '../../Constant/Color/index'
import IMAGES from '../../Constant/Images/index'
import * as ScreenKey from '../../Constant/ScreenKey'

class ScreenSearch extends Component {

    constructor() {
        super()
        this.state={
            txtSearch : ''
        }
    }

    render(){

        const { txtSearch } = this.state
        const { navigation } = this.props

        return(
            <View style={style.container}>
                {/* SEARCH */}
                <View style={[style.wrapSearch]}>
                    <View style={style.wrap_input}>
                        <Image
                            style={[style.iconSearch]}
                            source={ IMAGES.ICON_SEARCH_HOME }
                        />
                        <TextInput
                            autoFocus={true}
                            style={[style.input]}
                            onChangeText={(e) => { this.setState({ txtSearch : e }) }}
                            onSubmitEditing={() => {
                                navigation.replace(ScreenKey.SCREEN_NOT_TAB_BOTTOM, { screen : ScreenKey.SEARCH_RESULT, params : { txtSearch } })
                            }}
                        />
                    </View>
                    
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                            navigation.goBack()
                        }}
                        >
                        <View style={style.wrap_btnHuy}>
                            <Text style={[{ color : COLOR.MAIN_COLOR, fontSize : _heightScale(16) }]}>
                                Hủy bỏ
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
        backgroundColor : COLOR.WHITE
    },
    wrapSearch : {
        width : '100%',
        height : _heightScale(50),
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingHorizontal: _widthScale(18),
        paddingVertical : _heightScale(15),
        marginTop : _heightScale(10)
    },
    wrap_input : {
        flex : 1,
        position : 'relative'  
    },
    iconSearch : {
        width: _heightScale(22),
        height : _heightScale(22),
        position : 'absolute',
        top : _heightScale(12),
        left : _widthScale(10),
        zIndex : 2
    },
    input : {
        height : _heightScale(45),
        backgroundColor : COLOR.GREY,
        borderRadius : 20,
        paddingHorizontal : _widthScale(15),
        paddingLeft : _widthScale(35),
        position : 'relative',
        zIndex : 1,
        fontSize : _heightScale(16)
    },
    wrap_btnHuy : {
        marginLeft : _widthScale(10),
        height : _heightScale(40),
        justifyContent : 'center'
    }
})

export default ScreenSearch