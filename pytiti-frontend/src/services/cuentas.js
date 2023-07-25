import { getToken } from "./token";
import { getUserType } from "./user";
// import { jsonToFormData } from "@/helpers/senasag/form";

const host = process.env.VUE_APP_PROD_URL;

export const uploadFiles = async (companyId, data) => {
    /*const headers = {
        "Authorization": `Bearer ${getToken()}`
    };*/
    let url = `${host}api/v1/solicitud/${companyId}/archivos/`;
    let response = await fetch(url,{ method: "POST", body: data });
    return response.json();
}

/**
 * 
 * USER ACCOUNT REGISTRATIONS
 * 
 * @param {Object} data 
 * @returns {Promise}
 */
export const registerCompany = async (data) => {
    const headers = {
        "Content-Type": "application/json"
    };
    let url = `${host}api/v1/solicitud/empresa/`;
    let response = await fetch(url, {
            headers, 
            method: "POST", 
            body: JSON.stringify(data)
        });
    return response;
}

export const registerCompanyRepresentative = async (companyId, data) => {
    const headers = {
        "Content-Type": "application/json"
    };
    let url = `${host}api/v1/solicitud/${companyId}/representante/`;
    let response = await fetch(
        url, 
        {
            headers, 
            method: "POST", 
            body: JSON.stringify(data)
        });
    return response.json();
}

export const registerPerson = async (data) => {
    let url = `${host}api/v1/solicitud/persona-natural/`;
    let response = await fetch(url, {
        method: "POST", 
        body: JSON.stringify(data)
    });
    return response.json();
}

export const registerProcessorAccount = async (data) => {
    // const bodyData = jsonToFormData(data);
    const bodyData = JSON.stringify(data);
    const headers = {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    };
    let url = `${host}api/v1/${getUserType()}/tramitadores/crear/`;
    let response = await fetch(url, { method: "POST", headers, body: bodyData });
    return response.json();
}

export const registerInternalAccount = async (data) => {
    const headers = {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    };
    let url = `${host}api/v1/interno/create-user/`;
    let response = await fetch(url, { method: "POST", headers, body: JSON.stringify(data)});
    return response.json();
}

/**
 * 
 * USER ACCOUNT APPROVALS
 * 
 * @param {String} requestId 
 * @returns {Promise}
 */
export const approvePersonRequest = async (requestId) => {
    const headers = {
        "Authorization": `Bearer ${getToken()}`
    };
    let url = `${host}api/v1/cuenta/persona-natural/${requestId}/`;
    let response = await fetch(url, {headers});
    return response.json();
}

export const approveEnterpriseAccout = async (requestId) => {
    const headers = {
        "Authorization": `Bearer ${getToken()}`
    };
    let url = `${host}api/v1/cuenta/empresa/${requestId}/`;
    let response = await fetch(url, {headers});
    return response.json();
}

export const approveProcessorAccount = async (requestId) => {
    const headers = {
        "Authorization": `Bearer ${getToken()}`
    };
    let url = `${host}api/v1/cuenta/tramitador/${requestId}/`;
    let response = await fetch(url, { headers });
    return response.json();
}

/**
 * 
 * USER ACCOUNT FETCHING LISTS
 * 
 * @returns {Promise}
 */
 export const getEnterpriseAccounts = async () => {
    const headers = {
        "Authorization": `Bearer ${getToken()}`
    };
    let url = `${host}api/v1/cuenta/empresas/solicitudes/`;
    let response = await fetch(url, {headers});
    return response.json();
}

export const getPersonAccounts = async () => {
    const headers = {
        "Authorization": `Bearer ${getToken()}`
    };
    let url = `${host}api/v1/cuenta/personas-naturales/solicitudes/`;
    let response = await fetch(url, {headers});
    return response.json();
}

export const getCompanyProcessors = async () => {
    const headers = {
        "Authorization": `Bearer ${getToken()}`
    };
    let url = `${host}api/v1/${getUserType()}/tramitadores/`;
    let response = await fetch(url, { headers });
    return response.json();
}

export const getCompanyApprovedProcessors = async () => {
    const headers = {
        "Authorization": `Bearer ${getToken()}`
    };
    let url = `${host}api/v1/empresa/${getUserType()}/tramitadores/aprobados/`;
    let response = await fetch(url, { headers });
    return response.json();   
}

/**
 * 
 * @returns {Promise} Fetch the list of all processor accounts of the company
 */
export const getProcessorAccounts = async () => {
    const headers = {
        "Authorization": `Bearer ${getToken()}`
    };
    let url = `${host}api/v1/empresa/${getUserType()}/tramitadores/`;
    let response = await fetch(url, { headers });
    return response.json();
}

export const getProcessorAccountsForAdmins = async () => {
    const headers = {
        "Authorization": `Bearer ${getToken()}`
    };
    let url = `${host}api/v1/tramitadores/`;
    let response = await fetch(url, { headers });
    return response.json();
}

export const getProcessorAsignedCompanies = async () => {
    const headers = {
        "Authorization": `Bearer ${getToken()}`
    };
    let url = `${host}api/v1/tramitador/empresas/`;
    let response = await fetch(url, { headers });
    return response.json();
}

/**
 * 
 * USER ACCOUNT FETCHING DETAIL
 * 
 * @param {enterpriseId}
 * @returns {Promise}
 */
export const getEnterpriseAccount = async (enterpriseId) => {
    const headers = {
        "Authorization": `Bearer ${getToken()}`
    };
    let url = `${host}api/v1/empresas/${enterpriseId}/`;
    let response = await fetch(url, {headers});
    return response.json();
}

export const getPersonAccount = async (personId) => {
    const headers = {
        "Authorization": `Bearer ${getToken()}`
    };
    let url = `${host}api/v1/personas/${personId}/`;
    let response = await fetch(url, {headers});
    return response.json();
}

export const getProcessorAccount = async (processorId) => {
    const headers = {
        "Authorization": `Bearer ${getToken()}`
    };
    let url = `${host}api/v1/tramitadores/${processorId}/`;
    let response = await fetch(url, { headers })
    return response.json();
}

/**
 * 
 * USER ACCOUNT APPROVE RESEND EMAIL CONFIRMATION
 * 
 */
export const approveResendEmail = async (requestId) => {
    const headers = {
        "Authorization": `Bearer ${getToken()}`
    };
    let url = `${host}api/v1/cuenta/re-enviar-email/${requestId}/`;
    let response = await fetch(url, { headers });
    return response.json();
}

/**
 * 
 * REJECT USER ACCOUNT
 * 
 */
export const rejectUserAccount = async (requestId) => {
    const headers = {
        "Authorization": `Bearer ${getToken()}`
    };
    let url = `${host}api/v1/cuenta/rechazar/${requestId}/`;
    let response = await fetch(url, { headers });
    return response.json();
}