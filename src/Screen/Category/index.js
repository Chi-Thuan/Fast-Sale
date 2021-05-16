import React ,{Component}from 'react'
import { 
    View, 
    Text, 
    ActivityIndicator,
    StyleSheet } from 'react-native'
import { _widthScale, _heightScale }  from '../../Constant/Constants'
import * as COLOR from '../../Constant/Color/index'

import Search from '../../Components/Category/Search/index'
import CategoryItem from '../../Components/Category/CategoryItem/index'
import DetailsCategory from '../../Components/Category/DetailsCategory/index'
import { 
    getAllCategory,
    getSubCategoryById
 } from '../../Services/api'

class Category extends Component {

    constructor(){
        super()
        this.state = {
            isLoading : true,
            isLoadingCategoryItem : true,
            _idCategoryItem : '',
            dataCategory : [],
            dataSubCategory : []
        }
    }

    async componentDidMount() {
        const { data, error } = await getAllCategory()
        if(!error) {
            this.setState({
                dataCategory : data,
                _idCategoryItem : data[0]._id,
                isLoading : false,
            })
            this.fetchListSubCategory(data[0]._id)
        }else{
            console.log("error fetch category : ", error)
        }
    }

    async fetchListSubCategory (_id) {
        const { data, error } = await getSubCategoryById(_id)
        if(!error) {
            return this.setState({ dataSubCategory : data, isLoadingCategoryItem : false })
        }else{
            console.log("error fetch subCategory : ", error)
            return 
        }
    }

    _chooseCategory = _idCategoryItem => {
        this.fetchListSubCategory(_idCategoryItem)
        this.setState({ _idCategoryItem, isLoadingCategoryItem : true })
    }

    __renderDetailsCategory = (dataDetails) => {
        if(dataDetails.length > 0){
            return <DetailsCategory 
                        isLoading={this.state.isLoadingCategoryItem} 
                        data={dataDetails} 
                        goToProductsOfCategory={this.props.navigation}
                        /> 
        }else{
            return <Text style={{ marginLeft : _widthScale(20), marginTop : _heightScale(20), color : COLOR.TEXT_BLACK, fontSize : _heightScale(18) }}>(Chưa có danh mục)</Text>
        }
    }

    render(){
        return(
            <View style={style.container}>
                {/* SEARCH */}
                <View style={[style.wrapSearch]}>
                    <Search navigation={this.props.navigation} />
                </View>

                {/* BODY CATEGORY */}
            {
                this.state.isLoading ?   
                <View style={{flex : 1, justifyContent : 'center',alignItems : 'center' }}>
                    <ActivityIndicator size="large" color={COLOR.MAIN_COLOR} />
                </View>
                :  
                <View style={[style.wrapBody]}>
                    {/* LIST CATEGORY */}
                    <View style={[style.categoryItem]}>
                        <CategoryItem 
                        data={this.state.dataCategory} 
                        _idActive={this.state._idCategoryItem} 
                        _chooseCategory={ this._chooseCategory }
                        />
                    </View>

                    {/* DETAILS CATEGORY */}
                    <View style={style.categoryDetails}>
                        { this.__renderDetailsCategory(this.state.dataSubCategory) }
                    </View>            
                </View>
               }
            </View>
        )
    }
  
}

const style = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : COLOR.GREY_WHITE
    },
    wrapSearch : {
        width : '100%',
        height : _heightScale(50),
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : COLOR.WHITE,
    },
    wrapBody : {
        flex : 1,
        flexDirection : 'row'
    },
    categoryItem : {
        width : _widthScale(70),
    },
    categoryDetails : {
        flex : 1
    }
})

export default Category