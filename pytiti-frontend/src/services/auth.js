import { getToken } from "./token";

// const host = process.env.VUE_APP_PRODUCTION === true ? process.env.VUE_APP_PROD_URL : process.env.VUE_APP_DEV_URL;
const host = process.env.VUE_APP_PROD_URL;

var headers = new Headers();
headers.append("Authorization", `Bearer ${getToken()}`);

export const loginService = async (credentials) => {
    const url = `${host}api/v1/auth/login/`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(credentials)
    });
    return response.json();
}

export const signInService = async (bodyData) => {
    const url = `${host}api/v1/auth/login/`;
    const response = await fetch(url, {
        method: "POST",
        body: bodyData
    });
    return response.json();
}

export const logoutService = async () => {
    const url = `${host}auth/logout/`
    const response = await fetch(url, {
        method: "POST",
        headers
    })
    return response.json();
}

export const setPasswordSiaService = async (data) => {
    const url = `${host}api/sia/request-password-reset/`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data)
    });
    return response.json();
}