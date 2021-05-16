import axios from 'axios'
import { BASE_URL } from '../Constant/Constants'
import AsyncStorage  from '@react-native-async-storage/async-storage'

export default async (endPoint, data = null, method = "get", headers={}) => {

    const UserLogin = await AsyncStorage.getItem('userLogin')
    if(UserLogin) {
        let token_user = JSON.parse(UserLogin).token
        if(token_user){
            headers = {
                token : token_user
            }
        }
    }

    let objFetchAxios = {
        url : BASE_URL + endPoint,
        method,
        headers
    }

    if(data) {
        objFetchAxios = {
            ...objFetchAxios,
            data
        }
    }

    return axios(objFetchAxios).then((response) => {
        const { error, data, mess } = response
        if(!error) {
            console.log('----FETCHING SUCCESS')
            return data
        }

        return { error : true, message : mess }
    }).catch(error => {
        console.log('-------ERROR FETCH API', error)
    })
}