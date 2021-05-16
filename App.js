/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigation from './src/Navigation/AppContainer'

const App = () => {
  return (
      <NavigationContainer>
          <StatusBar translucent={false} barStyle="dark-content" backgroundColor={'white'} />
          <AppNavigation />
      </NavigationContainer>
  )
}

export default App