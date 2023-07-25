import { getToken } from "./token";
import { getUserType } from "./user";

const host = process.env.VUE_APP_PROD_URL;

export const getAlmacenes = async () => {
    const headers = {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json",
    };
    const url = `${host}api/v1/empresa/${getUserType()}/galpones`;
    let response = await fetch(url, { headers });
    return response.json();
}

export const getAlmacenesAdmin = async (uuid) => {
    const headers = {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json",
    };
    const url = `${host}api/v1/empresa/${uuid}/galpones`;
    let response = await fetch(url, { headers });
    return response.json();
}