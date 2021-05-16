import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import * as ScreenKey from '../../Constant/ScreenKey'
import Cart from '../../Screen/Cart/index'
import Details from '../../Screen/Details/index'
import Favorite from '../../Screen/Favorite/index'

const Stack = createStackNavigator()

const CartNavigator = () => {
    return(
        <Stack.Navigator headerMode='none' initialRouteName={ScreenKey.CART} >
            <Stack.Screen name={ScreenKey.CART} component={Cart} />
            <Stack.Screen name={ScreenKey.DETAILS} component={Details} />
            <Stack.Screen name={ScreenKey.FAVORITE} component={Favorite} />
        </Stack.Navigator>
    )
}

export default CartNavigator