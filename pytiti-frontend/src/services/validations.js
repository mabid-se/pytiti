import { getToken } from "./token";
// helpers
import { jsonToFormData } from "@/helpers/senasag/form";

const host = process.env.VUE_APP_PROD_URL;

export const fieldValidation = async (data) => {
    let url = `${host}api/v1/is-valid-person/`
    let bodyData = jsonToFormData(data);

    let response = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${getToken()}`,
        },
        method: "POST",
        body: bodyData
    });
    return response.json();
}

export const checkEmailIsUnique = async (data) => {
    let url = `${host}api/v1/verificate/email/`;
    let response = await fetch(url, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data)
    });
    return response.json();
}