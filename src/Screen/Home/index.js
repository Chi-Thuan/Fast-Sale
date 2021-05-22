import React, { Component } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    Pressable, 
    Image, 
    ScrollView,
    TouchableWithoutFeedback,
    
} from 'react-native'
import { BarIndicator } from 'react-native-indicators';

import { _widthScale, _heightScale }  from '../../Constant/Constants'
import * as COLOR from '../../Constant/Color/index'
import IMAGES from '../../Constant/Images/index'
import * as _font from '../../Constant/Font'
import Carousel from 'react-native-snap-carousel';
import ProductItem from '../../Components/Global/ProductItem/index'
import { getProductNew, getProductById } from '../../Services/api'
import * as ScreenKey from '../../Constant/ScreenKey'
import ModalAddToCart from '../../Components/Modal/ModalAddToCart/index'
import ComponentLoading from '../../Components/Loading/index'

class Home extends Component {

    constructor(){
        super()
        this.state = {
            currMenu : 0,
            listProduct : [],
            isLoading : true,
            isAddToCart : false,
            isLoadInfoAddToCart : false,
            dataAddToCart : {}
        }
    }

    _chooseMenuItem = index => {
        this.setState({ currMenu : index })
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

    async componentDidMount () {
        const { error, data } = await getProductNew()
        if(!error) {
            this.setState({ listProduct : data, isLoading : false })
        }else{
            console.log('!!!!!! ERROR GET DATA HOME', error)
        }
    }

    render(){
        return(
            this.state.isLoading ?   
            <View style={{flex : 1, justifyContent : 'center',alignItems : 'center',backgroundColor : COLOR.WHITE}}>
               <BarIndicator count={5} size={_heightScale(30)} color={COLOR.MAIN_COLOR} />
            </View>
            : 
            <View style={style.container}>

            

            <ModalAddToCart 
                openModal={this.state.isAddToCart}
                closeModal={this._closeModalAddToCart}
                data={this.state.dataAddToCart}
            />
            
            <ComponentLoading isLoading={this.state.isLoadInfoAddToCart} />
             
            {/** SEACRCH */}
            <View style={[{ backgroundColor : COLOR.WHITE, paddingVertical : _heightScale(10)}]}>
                    <Pressable
                        onPress={() => {
                            this.props.navigation.navigate(ScreenKey.SCREEN_NOT_TAB_BOTTOM, { screen : ScreenKey.SEARCH })
                        }}
                        >
                        <View style={[style.wrapSearch]}>
                            <Image
                                style={[style.iconSearch]}
                                source={ IMAGES.ICON_SEARCH_HOME }
                                />
                            <Text style={[ _font.stylesFont.fontNolan,style.titleSearch]}>
                                Tìm kiếm sản phẩm
                            </Text>
                        </View>
                    </Pressable>
                    
               </View>

            {/** SCROLL MENU */}
            <View style={[style.wrapScrollMenu]}  >
                <ScrollView 
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}>
                        { testMenu.map((item, index) => 
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={ () => this._chooseMenuItem(index)}
                            >
                            <View style={[style.wrapMenu]}>
                                <Text style={[
                                     _font.stylesFont.fontNolan,
                                    style.titleMenu,    
                                    index == this.state.currMenu && style.titleMenu_active]}>
                                    {item.name}
                                </Text>
                                {  index == this.state.currMenu && <View style={[style.lineActive]}/> }
                            </View>
                        </TouchableWithoutFeedback>
                        )}
                </ScrollView>
              </View>

            <ScrollView>
                {/** CAROUSEL */}
                <View>
                    <MyCarousel data={testSlides} />
                </View>

                {/** FLASH SALE */}
                <View style={[style.wrapFlash]}>
                    <View style={[style.wrapTitleFlash]}>
                        <Text style={[style.titleFlash]}>
                            Ưu đãi Flash
                        </Text>
                        <View style={[style.wrapTimeFlash]}>
                            <Image
                                style={style.iconFlash}
                                source={IMAGES.ICON_FLASH}
                            />
                            <Text style={[style.timeFlash]}>
                                40:23:13
                            </Text>
                        </View>
                    </View>
                    <ScrollView 
                        style={[style.scrollFlash]}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        { testFlashSale.map((item, index) => (
                            <TouchableWithoutFeedback
                            key={index}>
                            <View style={[style.wrapCartFlashSale]}>
                                <View style={[style.cartFlashSale]} >
                                    <Image
                                        style={[style.avatarFlashSale]}
                                        source={{ uri: item.img }}
                                        />
                                </View>
                                <Text style={[style.titleFlashSale]}>
                                    {`${item.price} VNĐ`}
                                </Text>
                            </View>
                            </TouchableWithoutFeedback>
                        ))}
                    </ScrollView>                    
                </View>

                {/** SẢN PHẨM NỔI BẬC */}
                <View>
                <Text style={[style.titleFlash, style.titleTrending ]}>
                    Sản phẩm nổi bật
                </Text>
                <View style={style.wrapItemTrending}>
                    {
                        this.state.listProduct.map(( item, index ) => 
                            <ProductItem key={index} item={item} showModalAddToCart={() => this._openModalAddToCart(item._id)} goToDetails={this.props.navigation} />
                        )
                    }
                </View>
            </View>
            </ScrollView>
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
        borderColor : COLOR.MAIN_COLOR,
        borderWidth : 2,
        height : _heightScale(40),
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 20,
        position :'relative',
        backgroundColor: COLOR.WHITE,
        marginHorizontal : _heightScale(30),
    },
    iconSearch : {
        width: _heightScale(20),
        height : _heightScale(20),
        position : 'absolute',
        left : _widthScale(10)
    },
    titleSearch : {
        fontSize : _heightScale(16),
        color : COLOR.TEXT_NORMAL,
        fontStyle : 'italic'
    },
    wrapScrollMenu : {
        marginTop : _heightScale(15),
        height : _heightScale(45),
        marginHorizontal : _widthScale(10),
        paddingBottom : _heightScale(10)
    },
    wrapMenu : {
        height : _heightScale(35),
        alignSelf :'center',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingHorizontal : _widthScale(8)
    },
    titleMenu : {
        fontSize : _heightScale(18),
        color : COLOR.TEXT_NORMAL,
    },
    titleMenu_active : {
        fontWeight : 'bold',
        color : COLOR.BLACK
    },
    lineActive : {
        width : _widthScale(20),
        height : _heightScale(5),
        borderRadius : 10,
        backgroundColor : COLOR.MAIN_COLOR
    },
    wrapFlash : {
        marginTop : _heightScale(10),
        backgroundColor : COLOR.WHITE,
        borderRadius : _widthScale(10),
        marginHorizontal : _widthScale(18),
        padding : _widthScale(10)
    },
    wrapTitleFlash : {
        flexDirection : 'row',
        justifyContent : 'space-between',
    },
    titleFlash : {
        color : COLOR.BLACK,
        fontWeight : 'bold',
        fontSize : _heightScale(16),
    },
    scrollFlash : {
        marginTop : _heightScale(15)
    },
    wrapTimeFlash : {
        position : 'relative',
        flexDirection : 'row',
        alignItems : 'center',
    },
    iconFlash : {
        width: _heightScale(14),
        height : _heightScale(14),
        marginRight : _widthScale(5)
    },
    timeFlash : {
        fontSize : _heightScale(14),
        fontWeight: 'bold',
        color : COLOR.MAIN_COLOR,
        fontStyle : 'italic'
    },
    wrapCartFlashSale : {
        width : _widthScale(80),
        marginRight : _widthScale(5)
    },
    cartFlashSale : {
        width : _widthScale(80),
        height : _widthScale(80),
        borderRadius : _widthScale(10),
        overflow : 'hidden',
        backgroundColor : COLOR.RGBA_04
    },
    avatarFlashSale : {
        width : '100%',
        height : '100%',
        resizeMode : 'cover'
    },
    titleFlashSale : {
        textAlign : 'center',
        color : COLOR.BLACK,
        fontSize : _heightScale(14),
        fontWeight : 'bold',
        marginTop : _heightScale(5)
    },
    titleTrending : {
        paddingHorizontal : _widthScale(18), 
        marginTop : _heightScale(20), 
        marginBottom : _heightScale(10)
    },
    wrapItemTrending : {
        marginHorizontal : _widthScale(8), 
        justifyContent : 'space-between', 
        flexDirection : 'row', 
        flexWrap: 'wrap'
    }
})

export default Home

class MyCarousel extends Component {

    _renderItem = ({item, index}) => {
        return (
            <TouchableWithoutFeedback 
                onPress={()=> {alert('oke')}}>
                    <View style={{ height : _heightScale(200), borderRadius : 10, overflow : 'hidden' }}>
                        <Image
                            style={{ width : '100%', height : '100%' }}
                            source={{
                            uri: item.img
                            }}/>
                    </View>
            </TouchableWithoutFeedback>
        );
    }

    render () {

        const { data } = this.props

        return (
            <Carousel
            style={{ backgroundColor : 'green' }}
              ref={(c) => { this._carousel = c; }}
              data={data}
              renderItem={this._renderItem}
              sliderWidth={_widthScale(375)}
              itemWidth={_widthScale(375) - _widthScale(36)}
            />
        );
    }
}

const testSlides = [
    {
        img : 'https://adsplus.vn/wp-content/uploads/2019/02/cac-buoc-dang-ky-ban-hang-tren-tiki-don-gian-va-hieu-qua-cao-0-1.jpg',
    },
    {
        img : 'http://channel.mediacdn.vn/prupload/156/2019/03/img_201903300945422654.png'
    },
    {
        img : 'https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1544957663159-8ERDL1W8ZJS9YRUTLR1F/ke17ZwdGBToddI8pDm48kI2qRkg-0q3G45PV89WLa4d7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UT36OZ7az3zCDcEfkzx6jyfjhzgnXkqhbYjEPbvXGon_qdLEBu-2DNU3MEyxLWdSkg/chup-anh-quang-cao-lazada-2.jpg?format=2500w',
    },
    {
        img : 'https://vnn-imgs-f.vgcloud.vn/2020/12/10/16/12-diem-nhan-cua-le-hoi-mua-sam-12-12-tren-lazada.jpg'
    },
    {
        img : 'https://plus24h.com/upload/images/4321maxresdefault.jpg',
    },
    {
        img : 'https://afamilycdn.com/150157425591193600/2020/10/28/photo-1-16038765917651316719032-1603877514069-1603877514420170709971.jpg'
    }
]

const testMenu = [
    {
        name  : 'Hot'
    },
    {
        name : 'Đèn chiếu sáng'
    },
    {
        name  : 'Điện tử dân dụng'
    },
    {
        name : 'Sở thích Đồ chơi & Robot'
    },
    {
        name  : 'Máy tính & Văn phòng'
    },
    {
        name : 'Nữ'
    },
    {
        name  : 'Công cụ'
    },
    {
        name : 'Ô tô & Xe máy'
    }
]

const testFlashSale = [
    {
        img : 'https://techland.com.vn/wp-content/uploads/2019/09/apple-iphone-11-7.jpg',
        price : '120k'
    },
    {
        img : 'https://cf.shopee.vn/file/da0aad070c03547583730c52f362e3ee',
        price : '320k'
    },
    {
        img : 'https://cdn.tgdd.vn/Products/Images/54/70820/tai-nghe-chup-tai-kanen-ip-952-2-6-org.jpg',
        price : '500k' 
    },
    {
        img : 'https://ben.com.vn/Content/Images/Products/B%C3%A0n%20ph%C3%ADm%20c%C6%A1%20Logitech%20G%20Pro%20X%20RGB%20Lightsync%20-%20%20GX%20Blue%20Switch%20Gaming%20Keyboard-3.jpg',
        price : '100k',
    },
    {
        img : 'https://khogiaythethao.vn/wp-content/uploads/2017/01/giay-nike-air-jordan-1-high-tie-dye-8.jpg',
        price : '10k'
    },
    {
        img : 'https://xgear.vn/wp-content/uploads/2017/10/Dell-Alienware-17inch-Vindicator-2.0-Backpack-1.jpg',
        price : '460k'
    },
    {
        img : 'https://lionunisex.vn/wp-content/uploads/2019/12/v%C3%A1y-4.jpg',
        price : '329k'
    }
]