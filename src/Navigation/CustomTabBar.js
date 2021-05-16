import React from 'react'
import { CommonActions } from '@react-navigation/native'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { _widthScale, _heightScale } from '../Constant/Constants'
import * as COLOR from '../Constant/Color/index'
import * as _font from '../Constant/Font'

function MyTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={style.wrapMenu}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: route.name },
              ]
            })
          );
        };
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={style.menuItem}
          >
            <Image
              style={{
                marginTop : _heightScale(5),
                width : route.params.icon.iconWidth,
                height : route.params.icon.iconHeight
              }}
              source={ isFocused ? route.params.icon.iconActive : route.params.icon.iconNormal }
            />
            <Text style={[style.titleMenu, _font.stylesFont.fontNolan ,{ color: isFocused ? COLOR.MAIN_COLOR : COLOR.TEXT_NORMAL }]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const style = StyleSheet.create({
    wrapMenu : {
        flexDirection : 'row',
        height : _heightScale(70),
        backgroundColor : COLOR.WHITE,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
    },
    menuItem : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    titleMenu : {
        color : COLOR.MAIN_COLOR,
        marginTop : _heightScale(6),
        fontSize : _heightScale(14)
    }
})

export default MyTabBar