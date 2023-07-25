import { getToken } from "./token";

// const host = process.env.VUE_APP_PRODUCTION === true ? process.env.VUE_APP_PROD_URL : process.env.VUE_APP_DEV_URL;
const host = process.env.VUE_APP_PROD_URL;

const options = {
    "headers": {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
    },
    "method": "OPTIONS",
}

/**
 * 
 * @param {string} endpoint - Endpoint donde se quiere obtener el recurso (Ejemplo: usuarios ó usuarios/1)
 * @returns {Promise}
 */
export const getMetadata = async (endpoint) => {
    let url = `${host}api/v1/${endpoint}/`;
    let response = await fetch(url, options);
    return response.json();
}