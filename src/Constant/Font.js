
import {
    Platform,
    StyleSheet
} from 'react-native'
import { _widthScale, _heightScale } from '../Constant/Constants'
export const FONT_MOHAVE = "Mohave-Regular"
export const FONT_MOHAVE_BOLD = "Mohave-Bold"
export const FONT_MULI_BLACK = "Muli-Black"
export const FONT_MOHAVE_MEDIUM = "Mohave-Medium"
export const FONT_MOHAVE_ITALIC = "Mohave-Italic"

// FONT ANDROID
export const FONT_NOLAN_NEXT_ANDROID = "Kastelov-NolanNext-Regular"
export const FONT_NOLAN_NEXT_ANDROID_MEDIUM = 'Kastelov - NolanNext-Medium'
export const FONT_NOLAN_NEXT_ANDROID_BOLD = 'Kastelov-Nolan-Next-Bold'
export const FONT_DINTEXT_PRO_ANDROID = "SVN-PF Din Text Pro Regular"
export const FONT_DINTEXT_PRO_ANDROID_BOLD = "SVN-PF Din Text Pro Bold"
export const FONT_FESTER_ANDROID = "Fester Book"
export const FONT_FESTER_ANDROID_MEDIUM = "Fester Medium"

// FONNT IOS
export const FONT_NOLAN_NEXT = "NolanNext"
export const FONT_DINTEXT_PRO = "SVN-PF Din Text Pro"
export const FONT_FESTER = "iCielFesterSemiCondensed-Book"
// export const FONT_NOLAN_NEXT_IOS_BOLD='NolanNext-Bold'
// export const FONT_NOLAN_NEXT_ANDROID = "Kastelov - NolanNext-Medium"

// FONTSIZE
export const FONT_SIZE_18 = _widthScale(18)

export const stylesFont = StyleSheet.create({
    fontNolan: Platform.OS == "ios" ?
        {
            fontFamily: FONT_NOLAN_NEXT
        }
        :
        {
            fontFamily: FONT_NOLAN_NEXT_ANDROID
        },

    fontNolan500: Platform.OS == 'ios' ?
        {
            fontFamily: FONT_NOLAN_NEXT,
            fontWeight: '500'
        }
        :
        {
            fontFamily: FONT_NOLAN_NEXT_ANDROID_MEDIUM
        },
    fontNolanBold: Platform.OS == "ios" ?
        {
            fontFamily: FONT_NOLAN_NEXT,
            fontWeight: 'bold'
        }
        : {
            fontFamily: FONT_NOLAN_NEXT_ANDROID_BOLD
        },
    fontDinTextPro: Platform.OS == "ios" ?
        {
            fontFamily: FONT_DINTEXT_PRO,
        }
        : {
            fontFamily: FONT_DINTEXT_PRO_ANDROID
        },
    fontDinTextProBold: Platform.OS == "ios" ?
        {
            fontFamily: FONT_DINTEXT_PRO,
            fontWeight: 'bold'
        }
        : {
            fontFamily: FONT_DINTEXT_PRO_ANDROID_BOLD
        },
    fontFester: Platform.OS == "ios" ?
        {
            fontFamily: FONT_FESTER,
        }
        : {
            fontFamily: FONT_FESTER_ANDROID
        },
    fontFester500: Platform.OS == "ios" ?
        {
            fontFamily: FONT_FESTER,
            fontWeight: '500'
        }
        : {
            fontFamily: FONT_FESTER_ANDROID_MEDIUM
        },
})

