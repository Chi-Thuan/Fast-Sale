import React, { Component } from 'react'
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native'
import Modal from 'react-native-modal'

import IMAGES from '../../../Constant/Images/index'
import { _heightScale, _widthScale } from '../../../Constant/Constants'
import * as COLOR from '../../../Constant/Color/index'

class ModelSearch extends Component {

    constructor() {
        super()
        this.state = {
            txtSearch_new : ''
        }
    }

    render() {

        const { txtSearch_new } = this.state
        const { isVisible, closeModal, txtSearch, actionSearch } = this.props

        return (
            <Modal
                animationInTiming={400}
                animationOutTiming={400}
                animationIn='slideInUp'
                animationOut='slideOutLeft'
                useNativeDriver={true}
                onBackdropPress={closeModal}
                backdropOpacity={0.2}
                style={style.modal}
                isVisible={isVisible}
                onBackButtonPress={closeModal}
                >
                <View style={style.container}>
                    <View style={[style.wrapSearch]}>
                    <View style={style.wrap_input}>
                        <Image
                            style={[style.iconSearch]}
                            source={ IMAGES.ICON_SEARCH_HOME }
                        />
                        <TextInput
                            autoFocus={true}
                            style={[style.input]}
                            defaultValue={txtSearch}
                            onChangeText={(e) => { this.setState({ txtSearch_new : e }) }}
                            onSubmitEditing={() => {
                                actionSearch(txtSearch_new)
                                closeModal()
                            }}
                        />
                    </View>
                    
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={closeModal}
                        >
                        <View style={style.wrap_btnHuy}>
                            <Text style={[{ color : COLOR.MAIN_COLOR, fontSize : _heightScale(16) }]}>
                                Hủy bỏ
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
        )
    }
}

const style = StyleSheet.create({
    modal : {
        margin : 0,
        flex : 1,
        justifyContent : 'flex-end'
    },
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

export default ModelSearch