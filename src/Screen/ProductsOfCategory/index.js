import React, {Component} from 'react'
import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    TouchableOpacity, 
    ScrollView,
    FlatList,
 } from 'react-native'
import { _widthScale, _heightScale, BASE_URL }  from '../../Constant/Constants'
import * as COLOR from '../../Constant/Color/index'
import { getProductBySubCategory, getInfoCategory, getProductById } from '../../Services/api'
import Search from '../../Components/Category/Search/index'
import ProductItem from '../../Components/Global/ProductItem/index'
import ModalAddToCart from '../../Components/Modal/ModalAddToCart/index'
import ComponentLoading from '../../Components/Loading/index'
import ButtonBack from '../../Components/Details/ButtonBack/index'
import { SkypeIndicator } from 'react-native-indicators';

class ProductsOfCategory extends Component {

    constructor(){
        super()
        this.state = {
            isLoading : true,
            infoParentCategory : {},
            infoSubCategory : {}, 
            dataProduct : [],
            isAddToCart : false,
            isLoadInfoAddToCart : false,
            dataAddToCart : {}
        }
    }

    async componentDidMount () {
        const { infoSubCategory } = this.props.route.params
        const fetchInfoParentCategory = await getInfoCategory(infoSubCategory.parentCategory)
        const { data, error } = await getProductBySubCategory(infoSubCategory._id)
        if(!error) {
            this.setState({ 
                isLoading : false, 
                infoParentCategory : fetchInfoParentCategory.data,
                infoSubCategory,
                dataProduct : data, 
            })
        }else{
            console.log('!!!!!! ERROR GET DATA OFFER', error)
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

  
    render() {
        const { 
            isLoading,
            infoParentCategory,
            infoSubCategory,
            dataProduct
        } = this.state

        const fromData = (data, numColumns) => {
            const numberOfFullRows = Math.floor(data.length/numColumns);
            let numberOfElementLastRow = data.length - (numberOfFullRows * numColumns)
            while(numberOfElementLastRow !== numColumns && numberOfElementLastRow !== 0) {
                data.push({ key : `blank - ${numberOfElementLastRow}`, empty : true })
                numberOfElementLastRow = numberOfElementLastRow + 1
            }
            return data
        }

        const numColumns = 2

        const _renderItem = ({ item, index }) => {
            if(item.empty == true) {
                return <View style={{width : _widthScale(300)}}/>
            }
            return  <ProductItem 
                        item={item} 
                        key={index} 
                        goToDetails={this.props.navigation} 
                        showModalAddToCart={() => this._openModalAddToCart(item._id)}
                    />
        }
    
        return(
            <>
            {
                isLoading ?   
                <View style={{flex : 1, justifyContent : 'center',alignItems : 'center' }}>
                   <SkypeIndicator size={_heightScale(40)} color={COLOR.MAIN_COLOR} />
                </View> :
                  <View style={style.container}>

                  <ModalAddToCart 
                      openModal={this.state.isAddToCart}
                      closeModal={this._closeModalAddToCart}
                      data={this.state.dataAddToCart}
                  />
                  
                  <ComponentLoading isLoading={this.state.isLoadInfoAddToCart} />
      
                      {/* SEARCH */}
                      <View style={[style.wrapSearch]}>
                          <View style={{ marginRight : _widthScale(10) }}>
                              <ButtonBack goBack={() => this.props.navigation.goBack()} />
                          </View>
                          <Search navigation={this.props.navigation} />
                      </View>
      
                      <View style={[style.wrapAddress]}>
                          <TouchableOpacity
                              activeOpacity={0.7}
                              onPress={ () => this.props.navigation.goBack() }
                              >
                              <View style={[style.addressItem]}>
                                  <Image 
                                      style={[style.logo]}
                                      source={{ uri : BASE_URL + infoParentCategory.thumbnail }}
                                  />
                                  <View style={{ justifyContent : 'center' }}>
                                      <Text style={[style.txtAddress]}>
                                          { infoParentCategory.name }
                                      </Text>
                                  </View>
                              </View>
                          </TouchableOpacity>
                          <Text style={{ fontWeight : 'bold' }}>
                              /
                          </Text>
                          <View style={[style.addressItem]}>
                              <Text style={[style.txtAddress]}>
                                  { infoSubCategory.name }
                              </Text>
                          </View>
                      </View>
      
                      <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{alignItems : 'center'}}>
                                <FlatList 
                                showsVerticalScrollIndicator={false}
                                numColumns={2}
                                data={fromData(dataProduct, numColumns)}
                                renderItem={_renderItem}
                            />
                        </View>
                      </ScrollView>
                      
                  </View>
                }
            </>
          )
    }
   
}

const style = StyleSheet.create({
    container : {
        flex : 1,
    },
    wrapSearch : {
        width : '100%',
        height : _heightScale(50),
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : COLOR.WHITE,
    },
    wrapAddress : {
        backgroundColor : COLOR.WHITE,
        flexDirection : 'row',
        alignItems : 'center',
        paddingHorizontal : _widthScale(18),
        height : _heightScale(60),
    },
    addressItem : {
        flexDirection : 'row',
        alignContent : 'center'
    },
    logo : {
        width : _heightScale(32),
        height : _heightScale(32)
    },
    txtAddress : {
        fontSize : _heightScale(16),
        fontWeight : 'bold',
        marginHorizontal : _widthScale(10)
    },
    wrapBody : {
        flex : 1,
        flexDirection : 'row',
        flexWrap : 'wrap',
        justifyContent : 'space-between'
    },
    hidden_item : {
        opacity : 0
    }
})

export default ProductsOfCategory