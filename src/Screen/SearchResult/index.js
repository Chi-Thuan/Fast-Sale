import React, {Component} from 'react'
import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    TouchableOpacity, 
    ScrollView,
    FlatList } from 'react-native'
import { _widthScale, _heightScale }  from '../../Constant/Constants'
import * as COLOR from '../../Constant/Color/index'
import { getProductById, search } from '../../Services/api'
import ProductItem from '../../Components/Global/ProductItem/index'
import ModalAddToCart from '../../Components/Modal/ModalAddToCart/index'
import ComponentLoading from '../../Components/Loading/index'
import IMAGES from '../../Constant/Images/index'
import ModalSearch from '../../Components/Modal/ModalSearch/index'
import {Picker} from '@react-native-picker/picker';
import { SkypeIndicator } from 'react-native-indicators';
import ButtonBack from '../../Components/Details/ButtonBack/index'

class ScreenSearchResult extends Component {

    constructor() {
        super()
        this.state={
            isVisibleModalSearch : false,
            txtSearch : '',
            filter : -1,
            dataProduct : [],
            isNotFound : false,
            isLoading : false,
            dataAddToCart : {},
            isLoadInfoAddToCart : false,
            isAddToCart : false,
        }
    }

    async componentDidMount() {
        const txtSearch = this.props.route.params.txtSearch || 'search'
        this.setState({ txtSearch, isLoading : true })
        const result = await search(txtSearch)

        if(!result.error) {
            this.setState({ 
                dataProduct : result.data,
                isLoading : false
            })
        }else{
            this.setState({ 
                isNotFound : true,
                isLoading : false 
            })
        }
    }

    __handleIsNotFound = () => {
        this.setState({ isNotFound : !this.state.isNotFound })
    }

    __closeModalSearch = () => {
        this.setState({ isVisibleModalSearch : false })
    }

    __openModalSearch = () => {
        this.setState({ isVisibleModalSearch : true })
    }

    _reSearch = async txtSearch_new => {
        this.setState({ txtSearch : txtSearch_new,  isLoading : true })
        const result = await search(txtSearch_new)
        if(!result.error) {
            this.setState({ 
                dataProduct : result.data,
                isNotFound : false ,
                isLoading : false
            })
        }else{
            this.setState({ isNotFound : true,  isLoading : false })
        }
    }

    _openModalAddToCart = async _id => {
        this.setState({ isLoadInfoAddToCart : true })
        const dataLoad = await getProductById(_id)
        if(!dataLoad.error) {
            this.setState({ 
                isLoadInfoAddToCart : false,
                dataAddToCart : dataLoad.data,
                isAddToCart : true
            })
        }else{
            this.setState({ isLoadInfoAddToCart : false })
        }
    }

    _closeModalAddToCart = () => {
        this.setState({ isAddToCart : false })
    }

    setSelectedLanguage = async itemValue => {
        this.setState({ filter : itemValue,isLoading : true })
        /*
        -1 : Mới nhất
        0 : Cũ nhất
        1 : Giá thấp đến cao,
        2 : Giá cao đến thấp
        */
        let dataFilter = ''
        switch (itemValue) {
            case '-1':
                    dataFilter = '?CreateAt=-1'
                break;

                case '0':
                    dataFilter = '?CreateAt=1'
                    break;
        
                case '1':
                    dataFilter = '?price=1'
                    break;

                case '2':
                    dataFilter = '?price=-1'
                    break;
            default:
                break;
        }
        
        const result = await search(this.state.txtSearch + dataFilter)

        if(!result.error) {
            this.setState({ 
                dataProduct : result.data,
                isNotFound : false ,
                isLoading : false
            })
        }else{
            this.setState({ isNotFound : true,  isLoading : false })
        }
    }

    render() {
        const { isVisibleModalSearch, txtSearch, filter, dataProduct,
            isNotFound,
            isLoading } = this.state
        const { navigation } = this.props

        const numColumns = 2
        const fromData = (data, numColumns) => {
            const numberOfFullRows = Math.floor(data.length/numColumns);
            let numberOfElementLastRow = data.length - (numberOfFullRows * numColumns)
            while(numberOfElementLastRow !== numColumns && numberOfElementLastRow !== 0) {
                data.push({ key : `blank - ${numberOfElementLastRow}`, empty : true })
                numberOfElementLastRow = numberOfElementLastRow + 1
            }
            return data
        }

        const _renderItem = ({ item, index }) => {
            if(item.empty == true) {
                return <View style={{width : _widthScale(300)}}/>
            }
            return  <ProductItem 
                        item={item} 
                        key={index} 
                        goToDetails={navigation} 
                        showModalAddToCart={() => this._openModalAddToCart(item._id)}
                    />
        }

        return(
            <View style={style.container}>

                <ComponentLoading isLoading={this.state.isLoadInfoAddToCart} />

                <ModalAddToCart 
                      openModal={this.state.isAddToCart}
                      closeModal={this._closeModalAddToCart}
                      data={this.state.dataAddToCart}
                  />

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

                    {
                        isLoading ?
                        <SkypeIndicator size={_heightScale(40)} color={COLOR.MAIN_COLOR} />
                        :
                        <>
                        {/* KHÔNG TÌM THẤY SẢN PHẨM */}
                        { 
                                               isNotFound ? 
                                               <View style={[style.wrap_txt_empty]}>
                                                   <Text style={[style.txt_empty]}>
                                                       Không tìm thấy sản phẩm phù hợp.
                                                   </Text>
                                               </View>
                                               :
                                               <>
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
                                               <ScrollView showsVerticalScrollIndicator={false} >
                                                   <View style={{width : '100%', paddingLeft : _widthScale(6)}}>
                                                       <FlatList 
                                                           showsVerticalScrollIndicator={false}
                                                           numColumns={2}
                                                           data={fromData(dataProduct, numColumns)}
                                                           renderItem={_renderItem}
                                                       />
                                                   </View>
                                               </ScrollView>
                                               </>
                                           }
                       </>
                    }
            </View>
        )
    }
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