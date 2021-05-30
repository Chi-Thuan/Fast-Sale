import React, {Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AsyncStorage  from '@react-native-async-storage/async-storage'
import { _widthScale, _heightScale }  from '../../Constant/Constants'
import * as COLOR from '../../Constant/Color/index'

import ScreenNotLogin from '../../Components/Account/ScreenNotLogin/index'
import ScreenLogged from '../../Components/Account/ScreenLogged/index'
import { SkypeIndicator } from 'react-native-indicators';

class Account extends Component {

    constructor() {
        super()
        this.state = {
            isLogin : false,
            userLogin : {},
            isLoading : false 
        }
    }

    async componentDidMount() {
        this.setState({ isLoading : true })
        const UserLogin = await AsyncStorage.getItem('userLogin')
        if(UserLogin != null) {
            this.setState({ isLoading : false })
            this.setState({
                isLogin : true,
                userLogin : JSON.parse(UserLogin)
            })
        }else{
            this.setState({ isLoading : false })
        }
    }

   render() {

        const { navigation } = this.props
        const { isLogin, userLogin, isLoading } = this.state

        return(
            <>
                {
                    isLoading ? 
                    <View style={style.container}>
                        <SkypeIndicator size={_heightScale(40)} color={COLOR.MAIN_COLOR} />
                    </View>
                    :
                     <View style={style.container}>
                     <View style={[style.wrapTitle]}>
                        <Text style={style.title}>
                            Cá nhân
                        </Text>
                     </View>
                        
                        {
                            isLogin ?
                            <ScreenLogged userLogin={userLogin}  navigation={navigation} />
                            : 
                            <ScreenNotLogin navigation={navigation} />
                        }
                        
                        
                    </View>
                }
            </>
        )
   }
}

const style = StyleSheet.create({
    container : {
        flex : 1
    },
    wrapTitle : {
        paddingHorizontal : _widthScale(18),
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        height : _heightScale(70),
        backgroundColor : COLOR.WHITE,
    },
    title : {
        fontSize : _heightScale(24),
        color : COLOR.BLACK,
        fontWeight : 'bold',
    }
})

export default Account