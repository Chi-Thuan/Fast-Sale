import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import * as ScreenKey from '../../Constant/ScreenKey'
import Home from '../../Screen/Home/index'
import Details from '../../Screen/Details/index'

const Stack = createStackNavigator()

const HomeNavigation = () => {
    return(
        <Stack.Navigator headerMode='none' initialRouteName={ScreenKey.HOME} >
            <Stack.Screen name={ScreenKey.HOME} component={Home} />
            <Stack.Screen name={ScreenKey.DETAILS} component={Details} />
        </Stack.Navigator>
    )
}

export default HomeNavigation