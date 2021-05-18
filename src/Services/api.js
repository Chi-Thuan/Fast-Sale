import fetchApi from './config'

const METHOD = {
    GET : 'GET',
    POST : 'POST'
}

export const getAllCategory = () => {
    return fetchApi('/api/user/get-all-category', {}, METHOD.GET)
}

export const getSubCategoryById = _id => {
    return fetchApi(`/api/user/get-sub-category-by-id/${_id}`, {}, METHOD.GET)
}

export const getProductNew = () => {
    // limit 5 sản phẩm
    return fetchApi('/api/user/get-product-new', {}, METHOD.GET)
}

export const getProductById = _id => {
    return fetchApi(`/api/user/get-product-by-id/${_id}`, {}, METHOD.GET)
}

export const getInfoCategory = _id => {
    return fetchApi(`/api/user/get-info-category/${_id}`, {}, METHOD.GET)
}

export const getProductBySubCategory = _id => {
    return fetchApi(`/api/user/get-product-by-subCategory/${_id}`, {}, METHOD.GET)
}

export const registerAccount = data => {
    return fetchApi('/api/user/auth/register', data, METHOD.POST)
}

export const loginAccount = data => {
    return fetchApi('/api/user/auth/login', data, METHOD.POST)
}

export const likeProduct = _id => {
    return fetchApi(`/api/user/like-product/${_id}`, {}, METHOD.GET)
}

export const dislikeProduct = _id => {
    return fetchApi(`/api/user/dislike-product/${_id}`, {}, METHOD.GET)
}

export const checkIsLikeProduct = _id => {
    return fetchApi(`/api/user/check-product-is-like/${_id}`, {}, METHOD.GET)
}