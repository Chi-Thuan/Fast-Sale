import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as ScreenKey from '../Constant/ScreenKey'
import { _heightScale } from '../Constant/Constants'
import IMAGES from '../Constant/Images/index'

import Category from '../Screen/Category/index'
import Account from '../Screen/Account/index'
import TabBar from './CustomTabBar'

import HomeNavigator from './Home/index'
import CategoryNavigator from './Category/index'
import CartNavigator from './Cart/index'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    return(
         <Tab.Navigator  
            initialRouteName={ScreenKey.HOME_NAVIGATOR} 
            tabBar={ props => <TabBar {...props} /> }
            >

            <Tab.Screen 
                name={ScreenKey.HOME_NAVIGATOR} 
                component={HomeNavigator}
                options={{
                    tabBarLabel : 'Trang chủ'
                }}
                initialParams={{ 
                    icon : {
                        iconNormal: IMAGES.ICON_HOME , 
                        iconActive : IMAGES.ICON_HOME_ACTIVE,
                        iconWidth : _heightScale(23.47),
                        iconHeight : _heightScale(22.3)
                    }
                }}
                />

            <Tab.Screen 
                name={ScreenKey.CATEGORY_NAVIGATOR} 
                component={CategoryNavigator} 
                options={{
                    tabBarLabel : 'Thể loại'
                }} 
                initialParams={{ 
                    icon : {
                        iconNormal: IMAGES.ICON_CATEGORY , 
                        iconActive : IMAGES.ICON_CATEGORY_ACTIVE,
                        iconWidth : _heightScale(21.42),
                        iconHeight : _heightScale(21.42)
                    }
                }}
                />

            <Tab.Screen 
                name={ScreenKey.CART_NAVIGATOR} 
                component={CartNavigator} 
                options={{
                    tabBarLabel : 'Giỏ hàng'
                }} 
                initialParams={{ 
                    icon : {
                        iconNormal: IMAGES.ICON_CART , 
                        iconActive : IMAGES.ICON_CART_ACTIVE,
                        iconWidth : _heightScale(22.48),
                        iconHeight : _heightScale(21.42)
                    }
                }}
                />

            <Tab.Screen 
                name={ScreenKey.ACCOUNT} 
                component={Account} 
                options={{
                    tabBarLabel : 'Tài khoản'
                }} 
                initialParams={{ 
                    icon : {
                        iconNormal: IMAGES.ICON_ACCOUNT , 
                        iconActive : IMAGES.ICON_ACCOUNT_ACTIVE,
                        iconWidth : _heightScale(18.823),
                        iconHeight : _heightScale(21.412)
                    }
                }}
                />

        </Tab.Navigator>
    )
}

export default TabNavigator