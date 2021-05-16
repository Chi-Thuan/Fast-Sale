import React, { Component } from 'react'
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView
} from 'react-native'
import Modal from 'react-native-modal'
import AsyncStorage  from '@react-native-async-storage/async-storage'

import IMAGES from '../../../Constant/Images/index'
import { _heightScale, _widthScale } from '../../../Constant/Constants'
import * as COLOR from '../../../Constant/Color/index'
import { BASE_URL } from '../../../Constant/Constants'
import { formatCurrencyVND, _convertToSlug } from '../../../Utils/utils'
import * as ScreenKey from '../../../Constant/ScreenKey'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import DISTRICT from '../../../Constant/Location/Districts'

class ModalChooseDistrict extends Component {

    constructor() {
        super()
        this.state = {
            txt_search : '',
        }
    }

    __handleChooseLocation = province => {
        this.setState({ 
            province,
            currChoose_code : province.code 
        })
    }

    __renderListDistrict = (parent_code) => {
        const { txt_search } = this.state
        let listItem = [];
        for (let index in DISTRICT) {
            if (DISTRICT[index].parent_code == parent_code) {
                if (DISTRICT[index].slug.toLowerCase().indexOf(_convertToSlug(txt_search)) > -1) {
                    listItem.push(
                        <OptionItem 
                            key={index}
                            isClicked={this.state.currChoose_code == DISTRICT[index].code ? true : false}
                            province={DISTRICT[index]}
                            ___handleChooseProvince={this.__handleChooseLocation}
                        />
                    )
                }
            }
        }

        return listItem.sort(function (a, b) {
            var x = a.props.province.name.toLowerCase();
            var y = b.props.province.name.toLowerCase();
            if (x < y) { return -1; }
            if (x > y) { return 1; }
            return 0;
        })
    }

    render() {

        const { province } = this.state
        const { isVisible, closeModal, actionChoose, parent_code } = this.props

        return (
            <Modal
                animationInTiming={400}
                animationOutTiming={400}
                animationIn='slideInRight'
                animationOut='slideOutRight'
                useNativeDriver={true}
                backdropOpacity={0.2}
                style={style.modal}
                isVisible={isVisible}
                onBackButtonPress={closeModal}
                >
                <View style={style.container}>
                    
                    <View style={[style.wrapTitle]}>
                        <TouchableOpacity
                            onPress={closeModal}
                            >
                            <Icon name="angle-double-left" size={_heightScale(30)} color={COLOR.TEXT_GREY} />
                        </TouchableOpacity>
                        <Text style={style.title}>
                            Chọn quận/huyện
                        </Text>
                        <TouchableOpacity
                              onPress={() => {
                                closeModal()
                                actionChoose(province)
                              }}
                            >
                            <Icon name="check" size={_heightScale(30)} color={COLOR.MAIN_COLOR} />
                        </TouchableOpacity>
                    </View>
                
                    <View style={style.wrap_body}>
                        
                        <View style={style.wrapSearch}>
                            <View style={style.search}>
                                <View style={style.wrap_iconSearch}>
                                    <Icon name="search" size={_heightScale(24)} color={COLOR.TEXT_GREY} />
                                </View>
                                <TextInput 
                                    onChangeText={(e) => this.setState({ txt_search: e })}
                                    style={style.txtSearch}
                                    placeholder="Tìm kiếm quận/huyện..."
                                />
                            </View>
                        </View>

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={style.wrap_list}    
                        >

                            {this.__renderListDistrict(parent_code)}

                        </ScrollView>

                    </View>

                </View>
            </Modal>
        )
    }
}

class OptionItem extends Component {

    render() {
        const style = StyleSheet.create({
            wrap_row : {
                flexDirection : 'row',
                width : '100%',
                paddingHorizontal : _widthScale(18),
                height : _heightScale(50),
                borderBottomWidth : 1,
                justifyContent : 'space-between',
                alignItems : 'center',
                borderBottomColor : COLOR.GREY
            },
            wrap_circle : {
                width : _heightScale(25),
                height : _heightScale(25),
                justifyContent : 'center',
                alignItems : 'center',
                borderWidth : 2,
                borderColor : COLOR.BLACK,
                borderRadius : _heightScale(25/2)
            },
            txt : {
                fontSize : _heightScale(20),
                color : COLOR.BLACK
            }
        })

        const { province, isClicked, ___handleChooseProvince } = this.props

        return(
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => ___handleChooseProvince(province)}
            >
                <View style={style.wrap_row}>
                    <Text style={[style.txt, isClicked && {  color : COLOR.MAIN_COLOR, fontWeight : 'bold' }]}>
                        {province.name}
                    </Text>

                    <View style={style.wrap_circle}>
                        {
                            isClicked ? 
                                <Icon name="circle" size={_heightScale(15)} color={COLOR.MAIN_COLOR} />
                            :
                                <Icon name="circle" size={_heightScale(15)} color={COLOR.WHITE} />
                        }
                        
                    </View>
                </View>
            </TouchableOpacity>
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
        backgroundColor  : COLOR.WHITE
    },
    wrapTitle : {
        paddingHorizontal : _widthScale(18),
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        height : _heightScale(70),
        backgroundColor : COLOR.WHITE,
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title : {
        fontSize : _heightScale(22),
        color : COLOR.BLACK,
        fontWeight : 'bold',
        marginLeft : _widthScale(15)
    },
    wrap_body : {
        flex : 1,
    },
    wrapSearch : {
        paddingHorizontal : _widthScale(18),
        marginTop : _heightScale(10)
    },
    search : {
        width : '100%',
        height : _heightScale(50),
        borderRadius : 5,
        position : 'relative',
        justifyContent : 'center',
        paddingLeft : _widthScale(35),
        paddingRight : _widthScale(10),
        backgroundColor : COLOR.GREY
    },
    wrap_iconSearch : {
        position : 'absolute',
        left : _widthScale(10)
    },
    txtSearch : {
        fontSize : _heightScale(18),
        color : COLOR.MAIN_COLOR
    },
    wrap_list : {
        marginTop : _heightScale(10)
    }
})

export default ModalChooseDistrict