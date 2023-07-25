import {getToken} from "./token"

const host = process.env.VUE_APP_PROD_URL

export const getLiquidacion = async (nroLiquidacion, codigoServicio = null) => {
    const headers = {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    }
    const url = `${host}api/v1/api-liquidador/obtener-liquidacion?nroLiquidacion=${nroLiquidacion}${
        codigoServicio ? `&codigoServicio=${codigoServicio}` : ""
    }`
    let response = await fetch(url, {headers})
    return response.json()
}

export const checkLinkLiquidation = async (nroLiquidacion, idSolicitudTramite) => {
    const headers = {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    }
    const url = `${host}api/v1/liquidaciones/verificar-vinculacion/${nroLiquidacion}/${idSolicitudTramite}`
    let response = await fetch(url, {headers})
    return response.json()
}

export const checkLiquidation = async (nroLiquidacion) => {
    const headers = {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    }
    const url = `${host}api/v1/liquidaciones/verificar-existe/${nroLiquidacion}/`
    let response = await fetch(url, {headers})
    return response.json()
}

export const checkLinkMultas = async (
    tipoParametro,
    valor,
    carnetIdentidad,
    idsolicitudtramite
) => {
    const headers = {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    }
    const url = `${host}api/v1/multas/verificar-vinculacion/${tipoParametro}/${valor}/${carnetIdentidad}/${idsolicitudtramite}`
    let response = await fetch(url, {headers})
    return response.json()
}

export const checkMulta = async (tipoParametro, valor, carnetIdentidad) => {
    const headers = {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    }
    const url = `${host}api/v1/multas/verificar-existe/${tipoParametro}/${valor}/${carnetIdentidad}`
    let response = await fetch(url, {headers})
    return response.json()
}

export const linkMultas = async (tipoParametro, valor, carnetIdentidad, idsolicitudtramite) => {
    const headers = {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    }
    const url = `${host}api/v1/multas/vincular/${tipoParametro}/${valor}/${carnetIdentidad}/${idsolicitudtramite}`
    let response = await fetch(url, {headers})
    return response.json()
}

export const releaseMultas = async (tipoParametro, valor, carnetIdentidad, idsolicitudtramite) => {
    const headers = {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    }
    const url = `${host}api/v1/multas/liberar/${tipoParametro}/${valor}/${carnetIdentidad}/${idsolicitudtramite}`
    let response = await fetch(url, {headers})
    return response.json()
}

export const checkCompanyLiquidation = async (idSolicitudTramite) => {
    const headers = {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    }
    const url = `${host}api/v1/liquidaciones/verificar-empresa-vinculacion/${idSolicitudTramite}/`
    let response = await fetch(url, {headers})
    return response.json()
}

export const linkLiquidation = async (nroLiquidacion, idSolicitudTramite) => {
    const headers = {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    }
    const url = `${host}api/v1/liquidaciones/vincular/${nroLiquidacion}/${idSolicitudTramite}`
    let response = await fetch(url, {headers})
    return response.json()
}

export const releaseLiquidation = async (nroLiquidacion, idSolicitudTramite) => {
    const headers = {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    }
    const url = `${host}api/v1/liquidaciones/liberar/${nroLiquidacion}/${idSolicitudTramite}`
    let response = await fetch(url, {headers})
    return response.json()
}

export const getMulta = async (tipoParametro, valor, carnetIdentidad) => {
    const headers = {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    }
    const url = `${host}api/v1/api-liquidador/obtener-multa?tipoParametro=${tipoParametro}&valor=${valor}&carnetIdentidad=${carnetIdentidad}`
    let response = await fetch(url, {headers})
    return response.json()
}

export const uploadLiquidationFile = async (liquidacionId, file) => {
    let url = `${host}api/v1/liquidaciones/${liquidacionId}/archivos-deposito/`
    const headers = {
        Authorization: `Bearer ${getToken()}`
    }
    let response = await fetch(url, {method: "POST", body: file, headers})
    return response.json()
}

export const registerLiquidation = async (data) => {
    let url = `${host}api/v1/liquidaciones/crear`
    let headers = {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    }
    let response = await fetch(url, {headers, method: "POST", body: JSON.stringify(data)})

    const content = await response.json()
    const ok = response.status < 400
    return {
        ok: ok,
        data: ok ? content : null,
        errors: ok ? null : content
    }
}

export const getMultas = async (idsolicitudtramite) => {
    let url = `${host}api/v1/multas/listar/${idsolicitudtramite}`
    let headers = {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    }
    let response = await fetch(url, {headers, method: "GET"})

    const content = await response.json()
    const ok = response.status < 400
    return {
        ok: ok,
        data: ok ? content : null,
        errors: ok ? null : content
    }
}

export const uploadLiquidation = async (idLiquidacion, data) => {
    let url = `${host}api/v1/liquidaciones/actualizar/${idLiquidacion}`
    let headers = {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    }
    let response = await fetch(url, {headers, method: "PUT", body: JSON.stringify(data)})

    const content = await response.json()
    const ok = response.status < 400
    return {
        ok: ok,
        data: ok ? content : null,
        errors: ok ? null : content
    }
}

export const registerDeposit = async (data) => {
    let url = `${host}api/v1/depositos/crear`
    let headers = {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    }
    let response = await fetch(url, {headers, method: "POST", body: JSON.stringify(data)})

    const content = await response.json()
    const ok = response.status < 400
    return {
        ok: ok,
        data: ok ? content : null,
        errors: ok ? null : content
    }
}

export const updateDeposit = async (idDeposito, data) => {
    let url = `${host}api/v1/depositos/actualizar/${idDeposito}`
    let headers = {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    }
    let response = await fetch(url, {headers, method: "PUT", body: JSON.stringify(data)})

    const content = await response.json()
    const ok = response.status < 400
    return {
        ok: ok,
        data: ok ? content : null,
        errors: ok ? null : content
    }
}

export const consumeService = async (data) => {
    let url = `${host}api/v1/api-liquidador/consumir-servicio-liquidacion`
    let headers = {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    }
    let response = await fetch(url, {headers, method: "PUT", body: JSON.stringify(data)})

    const content = await response.json()
    const ok = response.status < 400
    return {
        ok: ok,
        data: ok ? content : null,
        errors: ok ? null : content
    }
}

export const releaseService = async (data) => {
    let url = `${host}api/v1/api-liquidador/liberar-servicio-liquidacion`
    let headers = {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    }
    let response = await fetch(url, {headers, method: "PUT", body: JSON.stringify(data)})

    const content = await response.json()
    const ok = response.status < 400
    return {
        ok: ok,
        data: ok ? content : null,
        errors: ok ? null : content
    }
}
