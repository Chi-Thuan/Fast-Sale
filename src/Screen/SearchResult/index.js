import React, {Component} from 'react'
import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    TouchableOpacity, 
    ScrollView,
    ActivityIndicator } from 'react-native'
import { _widthScale, _heightScale, BASE_URL, WIDTH_DIMENSION }  from '../../Constant/Constants'
import * as COLOR from '../../Constant/Color/index'
import * as ScreenKey from '../../Constant/ScreenKey'
import { getProductBySubCategory, getInfoCategory, getProductById } from '../../Services/api'
import Search from '../../Components/Category/Search/index'
import ProductItem from '../../Components/Global/ProductItem/index'
import ModalAddToCart from '../../Components/Modal/ModalAddToCart/index'
import ComponentLoading from '../../Components/Loading/index'
import IMAGES from '../../Constant/Images/index'
import ModalSearch from '../../Components/Modal/ModalSearch/index'
import {Picker} from '@react-native-picker/picker';
import ButtonBack from '../../Components/Details/ButtonBack/index'

class ScreenSearchResult extends Component {

    constructor() {
        super()
        this.state={
            isVisibleModalSearch : false,
            txtSearch : '',
            filter : -1
        }
    }

    componentDidMount() {
        const txtSearch = this.props.route.params.txtSearch || 'deoco '
        this.setState({ txtSearch })
    }

    __closeModalSearch = () => {
        this.setState({ isVisibleModalSearch : false })
    }

    __openModalSearch = () => {
        this.setState({ isVisibleModalSearch : true })
    }

    _reSearch = txtSearch_new => {
        this.setState({ txtSearch : txtSearch_new })
    }

    setSelectedLanguage = itemValue => {
        this.setState({ filter : itemValue })
    }

    render() {

        const { isVisibleModalSearch, txtSearch, filter } = this.state
        const { navigation } = this.props

        return(
            <View style={style.container}>

                <ModalSearch 
                    isVisible={isVisibleModalSearch}
                    openModal={() => this.__openModalSearch()}
                    closeModal={() => this.__closeModalSearch()}
                    txtSearch={txtSearch}
                    navigation={navigation}
                    actionSearch={(txtSearch_new) => this._reSearch(txtSearch_new)}
                />

                {/* SEARCH */}
                <View style={[style.wrapSearch]}>
                    <View style={{ marginRight : _widthScale(10) }}>
                        <ButtonBack goBack={() => this.props.navigation.goBack()} />
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => this.__openModalSearch()}
                        >
                        <View style={[style.search]}>
                            <Image
                                style={[style.iconSearch]}
                                source={ IMAGES.ICON_SEARCH_HOME }
                                />
                            <Text style={[style.titleSearch]}>{txtSearch}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={[style.wrapAddress]}>
                    <View style={[style.addressItem]}>
                        <Text style={[style.txtAddress]}>
                            Kết quả tìm kiếm
                        </Text>
                    </View>
                </View>

                    {/* KHÔNG TÌM THẤY SẢN PHẨM */}
                    {/* <View style={[style.wrap_txt_empty]}>
                        <Text style={[style.txt_empty]}>
                            Không tìm thấy sản phẩm phù hợp.
                        </Text>
                    </View> */}

                    <View style={style.wrap_filter}>
                        <Text>
                            Sắp xếp theo
                        </Text>
                       <View>
                            <Picker
                                style={{ width : _widthScale(200) }}
                                selectedValue={filter}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setSelectedLanguage(itemValue)
                                }
                                >
                                <Picker.Item label="Mới nhất" value="-1" />
                                <Picker.Item label="Cũ nhất" value="0" />
                                <Picker.Item label="Giá thấp đến cao" value="1" />
                                <Picker.Item label="Giá cao đến thấp" value="2" />
                            </Picker>
                       </View>
                    </View>
                    <ScrollView
                    showsVerticalScrollIndicator={false}
                    >

                    <View style={[style.wrapBody]}>
                        <View style={style.wrap_product}>
                            <ProductItem 
                                item={productTest} 
                                key={1} 
                                goToDetails={navigation} 
                            />
                        </View>
                        <View style={style.wrap_product}>
                            <ProductItem 
                                item={productTest} 
                                key={1} 
                                goToDetails={navigation} 
                            />
                        </View>
                        <View style={style.wrap_product}>
                            <ProductItem 
                                item={productTest} 
                                key={1} 
                                goToDetails={navigation} 
                            />
                        </View>
                        <View style={style.wrap_product}>
                            <ProductItem 
                                item={productTest} 
                                key={1} 
                                goToDetails={navigation} 
                            />
                        </View>
                        <View style={style.wrap_product}>
                            <ProductItem 
                                item={productTest} 
                                key={1} 
                                goToDetails={navigation} 
                            />
                        </View>
                        <View style={style.wrap_product}>
                            <ProductItem 
                                item={productTest} 
                                key={1} 
                                goToDetails={navigation} 
                            />
                        </View>
                        <View style={style.wrap_product}>
                            <ProductItem 
                                item={productTest} 
                                key={1} 
                                goToDetails={navigation} 
                            />
                        </View>
                        <View style={style.wrap_product}>
                            <ProductItem 
                                item={productTest} 
                                key={1} 
                                goToDetails={navigation} 
                            />
                        </View>
                    </View>
                </ScrollView>
                
                {/* BODY CATEGORY */}
                {/* {
                isLoading ?   
                    <View style={{flex : 1, justifyContent : 'center',alignItems : 'center' }}>
                        <ActivityIndicator size="large" color={COLOR.MAIN_COLOR} />
                    </View> :
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        >
                        <View style  ={[style.wrapBody]}>
                            {
                                dataProduct.map((item, index) => 
                                    <ProductItem 
                                        item={item} 
                                        key={index} 
                                        goToDetails={this.props.navigation} 
                                        showModalAddToCart={() => this._openModalAddToCart(item._id)}
                                        />
                                )
                            }
                        </View>
                    </ScrollView>
               } */}
            </View>
        )
    }
}

const productTest = {
    createAt: "2021-05-11T16:18:39.391Z",
    description: "- Mô tả tóm tắt đặc tính\r\n\r\n1.4GHz quad-core 8th-generation Intel Core i5 processor\r\nTurbo Boost up to 3.9GHz\r\nIntel Iris Plus Graphics 645\r\n8GB 2133MHz LPDDR3 memory\r\n256GB SSD storage¹\r\n13-inch Retina display with True Tone\r\nMagic Keyboard\r\nTouch Bar and Touch ID\r\nTwo Thunderbolt 3 ports",
    modifyAt: "2021-05-11T16:18:39.391Z",
    name: "Macbook Pro 13 inch 2020 Quad Core I5 1.4Ghz 8GB 256GB (MXK32, MXK62)",
    parentCategory: "609b77cc51f089bd2142d4b4",
    price: 29500000,
    quantity: 100,
    slug: "macbook-pro-13-inch-2020-quad-core-i5-14ghz-8gb-256gb-mxk32-mxk62",
    subCategory: "609b789351f089bd2142d4b6",
    thumbnail: "/upload/images/1620802168236-Macbook-MYD82.png",
    __v: 0,
    _id: "609b7a7851f089bd2142d4ba",
}

const style = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : COLOR.WHITE,
    },
    wrapSearch : {
        width : '100%',
        height : _heightScale(50),
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : COLOR.WHITE,
    },
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
    },
    wrapAddress : {
        backgroundColor : COLOR.WHITE,
        flexDirection : 'row',
        alignItems : 'center',
        paddingHorizontal : _widthScale(18),
        height : _heightScale(60),
        borderBottomWidth : 1,
    },
    addressItem : {
        flexDirection : 'row',
        alignContent : 'center'
    },
    wrap_txt_empty : {
        paddingHorizontal : _widthScale(18),
        marginTop : _heightScale(10)
    },
    txt_empty : {
        fontSize : _heightScale(16),
        color : COLOR.TEXT_BLACK
    },  
    logo : {
        width : _heightScale(32),
        height : _heightScale(32)
    },
    txtAddress : {
        fontSize : _heightScale(16),
        fontWeight : 'bold',
    },
    wrapBody : {
        width : '100%',
        flex : 1,
        flexDirection : 'row',
        flexWrap : 'wrap',
        justifyContent : 'space-between'
    },
    wrap_filter : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        marginTop : _heightScale(5),
        width : '100%',
        height : _heightScale(50),
        paddingHorizontal : _widthScale(18)
    },
    wrap_product : {
        borderWidth : 1,
        borderColor : COLOR.GREY,
        margin : 2
    }
})

export default ScreenSearchResult