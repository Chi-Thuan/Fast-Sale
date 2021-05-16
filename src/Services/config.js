import axios from 'axios'
import { BASE_URL } from '../Constant/Constants'
import GlobalStore from '../Constant/GlobalStore'

export default async (endPoint, data = null, method = "get", headers={}) => {

    let token = GlobalStore.token

    if(token){
        headers = {
            token
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