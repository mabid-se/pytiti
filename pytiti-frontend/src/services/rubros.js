import {getToken} from "./token"
const host = process.env.VUE_APP_PROD_URL

export const getRubrosByTramite = async (id_servicio) => {
    const url = `${host}api/v1/select-options/rubros/${id_servicio}/`
    const headers = {
        Authorization: `Bearer ${getToken()}`
    }
    let response = await fetch(url, {method: "POST", headers})
    return response.json()
}

export const registerServices = async (data) => {
    let url = `${host}api/v1/solicitudes-tramite-servicios/crear`
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

export const registerCategoryNames = async (data) => {
    let url = `${host}api/v1/solicitudes-tramite-servicios-categoria/registrar-categorias/`
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

export const registrarUnidadRubro = async (data) => {
    let url = `${host}api/v1/solicitudes-tramite-servicios-categoria/actualizar-rubro-unidad/`
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

export const getServicesByProcedure = async (id_solicitud_servicio) => {
    const url = `${host}api/v1/solicitudes-tramite-servicios/${id_solicitud_servicio}/`
    const headers = {
        Authorization: `Bearer ${getToken()}`
    }
    let response = await fetch(url, {method: "GET", headers})
    return response.json()
}
