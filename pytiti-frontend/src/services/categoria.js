import {getToken} from "./token"
const host = process.env.VUE_APP_PROD_URL

export const getScopes = async () => {
    const url = `${host}api/v1/api-scopes/list`
    const headers = {
        Authorization: `Bearer ${getToken()}`
    }
    let response = await fetch(url, {method: "GET", headers})
    return response.json()
}

export const getMarketLevels = async () => {
    let url = `${host}api/v1/api-market-level/list`
    let headers = {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    }
    let response = await fetch(url, {method: "GET", headers})
    return response.json()
}

export const getProductTypes = async (unidad) => {
    const url = `${host}api/v1/api-product-type/list/${unidad}/`
    const headers = {
        Authorization: `Bearer ${getToken()}`
    }
    let response = await fetch(url, {method: "GET", headers})
    return response.json()
}

export const getUpdateCategories = async (id_solicitud_tramite, data) => {
    const url = `${host}api/v1/solicitudes-tramite/codigos-certificados/${id_solicitud_tramite}/`
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
    }
    let response = await fetch(url, {headers, method: "PUT", body: JSON.stringify(data)})
    return response.json()
}
