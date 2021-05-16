import React, { Component } from 'react'
import {
    StyleSheet, 
    View, 
    ScrollView,
} from 'react-native'
import { _heightScale } from '../../../Constant/Constants'

import ButtonProfile from '../ButtonProfile/index'
import OptionItem from '../OptionItem/index'

class ScreenNotLogin extends Component {
    render() {

        const { navigation , userLogin } = this.props

        return (
            <ScrollView>
                <ButtonProfile userLogin={userLogin} navigation={navigation} />
                <View style={[style.boxOption]}>
                    {
                        dataOptionNotLogin.map((item, index) => (
                            <OptionItem 
                                key={index}
                                name={item.name}
                                icon={item.icon}
                                iconWidth={item.iconWidthICON}
                                iconHeight={item.iconHeightICON}
                                lineBottom={ index != dataOptionNotLogin.length -1 || false  }
                            />
                        ))
                    }
                </View>

                <View style={[style.boxOption]}>
                    <OptionItem name="Thông tin liên hệ" />
                </View>

            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    boxOption : {
        marginTop : _heightScale(10)
    }
})

export default ScreenNotLogin

const dataOptionNotLogin = [
    {
        name : 'Quản lý đơn hàng',
        icon: 'https://img.icons8.com/ios/452/ingredients-list.png',
        iconWidthICON : _heightScale(25),
        iconHeightICON : _heightScale(25),
    },
    {
        name : 'Sản phẩm đã mua',
        icon: 'https://icons-for-free.com/iconfiles/png/512/basket+buy+cart+shop+shopping+store+icon-1320073180063197567.png',
        iconWidthICON : _heightScale(25),
        iconHeightICON : _heightScale(25),
    },
    {
        name : 'Sản phẩm đã xem',
        icon: 'https://pics.freeicons.io/uploads/icons/png/15475245161548336226-512.png',
        iconWidthICON : _heightScale(25),
        iconHeightICON : _heightScale(25),
    },
    {
        name : 'Sản phẩm yêu thích',
        icon: 'https://icons-for-free.com/iconfiles/png/512/heart-131965017458786724.png',
        iconWidthICON : _heightScale(25),
        iconHeightICON : _heightScale(25),
    },
    {
        name : 'Sản phẩm mua sau',
        icon: 'https://cdn2.iconfinder.com/data/icons/instagram-outline/19/9-512.png',
        iconWidthICON : _heightScale(25),
        iconHeightICON : _heightScale(25),
    },
    {
        name : 'Ưu đãi cho chủ thẻ ngân hàng',
    },
    {
        name : 'Cài đặt',
    }
]