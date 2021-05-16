import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import * as ScreenKey from '../Constant/ScreenKey'
import ScreenTabBottom from './NavigatorTabBottom'
import ScreenNotTabBottom from './NavigatorNotTabBottom'

const Stack = createStackNavigator()

const AppContainer = () => {
    return (
        <Stack.Navigator
            headerMode={'none'}
            initialRouteName={ScreenKey.SCREEN_TAB_BOTTOM}
>
            <Stack.Screen name={ScreenKey.SCREEN_TAB_BOTTOM} component={ScreenTabBottom} />

            <Stack.Screen 
                name={ScreenKey.SCREEN_NOT_TAB_BOTTOM} 
                component={ScreenNotTabBottom}  

                // Animation từ Screen tab bottom vào Screen not tab bottom
                options={{
                    ...TransitionPresets.SlideFromRightIOS,
                }} />

        </Stack.Navigator>
    )
}

export default AppContainer