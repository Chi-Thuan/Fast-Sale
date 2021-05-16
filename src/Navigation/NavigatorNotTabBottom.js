import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import * as ScreenKey from '../Constant/ScreenKey'
import ScreenCheckout from '../Screen/Cart/Checkout/index'
import ScreenDetails from '../Screen/Details/index'
import ScreenLogin from '../Screen/Login/index'
import ScreenRegister from '../Screen/Register/index'
import ScreenProfile from '../Screen/Profile/index'
import ScreenSearch from '../Screen/Search/index'
import ScreenSearchResult from '../Screen/SearchResult/index'
import ProductsOfCategory from '../Screen/ProductsOfCategory/index'

const Stack = createStackNavigator()

const ScreenNotTabBottom = () => {
    return (
        <Stack.Navigator headerMode={'none'} >
            <Stack.Screen name={ScreenKey.PRODUCTS_OF_CATEGORY} component={ProductsOfCategory} />
            <Stack.Screen name={ScreenKey.CHECKOUT} component={ScreenCheckout} />
            <Stack.Screen name={ScreenKey.DETAILS} component={ScreenDetails}
                options={{
                    ...TransitionPresets.ModalSlideFromBottomIOS,
                }} 
            />
            <Stack.Screen name={ScreenKey.LOGIN} component={ScreenLogin} 
            />
            <Stack.Screen name={ScreenKey.REGISTER} component={ScreenRegister} 
                // Animation từ Screen not tab bottom vào Screen not tab bottom
                options={{
                    ...TransitionPresets.SlideFromRightIOS,
                }} 
            />
            <Stack.Screen name={ScreenKey.PROFILE} component={ScreenProfile} />
            <Stack.Screen name={ScreenKey.SEARCH} component={ScreenSearch} />
            <Stack.Screen name={ScreenKey.SEARCH_RESULT} component={ScreenSearchResult} />
        </Stack.Navigator>
    )
}

export default ScreenNotTabBottom