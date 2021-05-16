import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import * as ScreenKey from '../../Constant/ScreenKey'
import Category from '../../Screen/Category/index'
import ProductsOfCategory from '../../Screen/ProductsOfCategory/index'
import Details from '../../Screen/Details/index'

const Stack = createStackNavigator()

const CategoryNavigator = () => {
    return(
        <Stack.Navigator headerMode='none' initialRouteName={ScreenKey.CATEGORY} >
            <Stack.Screen name={ScreenKey.CATEGORY} component={Category} />
            {/* <Stack.Screen name={ScreenKey.PRODUCTS_OF_CATEGORY} component={ProductsOfCategory} /> */}
            <Stack.Screen name={ScreenKey.DETAILS} component={Details} />
        </Stack.Navigator>
    )
}

export default CategoryNavigator