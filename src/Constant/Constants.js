import { Dimensions } from 'react-native'

export const BASE_URL = "https://chithuancamau2.tk"
// export const BASE_URL = "http://192.168.1.16:5000"
export const NAME_APP = "Fast Sale"
export const WIDTH_DIMENSION = Dimensions.get('window').width;
export const HEIGHT_DIMENSION = Dimensions.get('window').height;

export const _widthScale = (width) => {
    return width / 375 * WIDTH_DIMENSION
}
export const _heightScale = (height) => {
    return height / 812 * HEIGHT_DIMENSION
}