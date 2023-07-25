const host = process.env.VUE_APP_PROD_URL;
import axios from 'axios';
import { getToken } from "./token";

export const verifySiaService = async (data) => {
    const url = `${host}api/sia/verificaciones/`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data)
    });
    return response.json();
}

export const saveRequestSiaService = async (data) => {
    const url = `${host}api/sia/verificaciones/`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(data)
    });
    return response.json();
}


export const getRequestUsersSiaService = async (data) => {
    const url = `${host}api/sia/solicitudes/`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
        method: "GET",
        body: JSON.stringify(data)
    });
    return response.json();
}


export const retrieveUserRequestSiaService = async (uid) => {
    const url = `${host}api/sia/solicitudes/user/${uid}/`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
        method: "GET",
    });
    return response.json();
}


export const cancelRequestSiaService = async (uid, data) => {
    const url = `${host}api/sia/solicitudes/rechazar/${uid}/`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
        method: "PUT",
        body: JSON.stringify(data)
    });
    return response.json();
}

export const approveRequestSiaService = async (data, uid) => {
    const url = `${host}api/sia/solicitudes/aprobar/${uid}/`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
        method: "PUT",
        body: JSON.stringify(data)
    });
    return response.json();
}

export const attachedAndApproveService = async (selectedFile, id, uid) => {
    const url = `${host}api/sia/attach-file/user/`
    let formData = new FormData();
    formData.append("files", selectedFile);
    formData.append("user", id);
    formData.append("request_id", uid);
    formData.append('file', {
        filename: selectedFile.filename,
        contentType: selectedFile.contentType,
    });
    const config = {
        headers: {
            "Authorization": `Bearer ${getToken()}`,
            'Content-Type': 'multipart/form-data',
        },
    }
    const response = await axios.post(
        url,
        formData,
        config
    )

    return response.data;
}

export const retrieveUserTramitesSiaService = async (uid) => {
    const url = `${host}api/sia/solicitudes/user/${uid}/tramites`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
        method: "GET",
    });
    return response.json();
}

export const retrieveUserRolesSiaService = async () => {
    const url = `${host}api/sia/roles`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
        method: "GET",
    });
    return response.json();
}

export const retrieveUserData = async (uid) => {
    console.log(uid);
    const url = `${host}api/sia/info/user/${uid}`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
        method: "GET",
    });
    return response.json();
}

export const updateTramitUserSiaService = async (pk, data) => {
    const url = `${host}api/sia/solicitudes/tramite/${pk}`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
        method: "PUT",
        body: JSON.stringify(data)
    });
    return response.json();
}

export const updatePermisionUserSiaService = async (pk, data) => {
    const url = `${host}api/sia/permissions/user/${pk}`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
        method: "PUT",
        body: JSON.stringify(data)
    });
    return response.json();
}

export const updatePasswordUserSiaService = async (data) => {
    const url = `${host}api/sia/update-password/`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
        method: "POST",
        body: JSON.stringify(data)
    });
    return response.json();
}

export const userDataPDFSiaService = async (uid) => {
    const url = `${host}api/sia-admin/formulario/${uid}/pdf/`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
        method: "GET",
        responseType: 'blob',
        //body: JSON.stringify(data)
    });
    return response;
}

export const getRequestUsersPasswordService = async (data) => {
    const url = `${host}api/sia-admin/request-password-reset/`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
        method: "GET",
        body: JSON.stringify(data)
    });
    return response.json();
}

export const updateRequestPasswordService = async (uid) => {
    const url = `${host}api/sia-admin/request-password-reset/${uid}/?status=procesado`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
        method: "PUT",
        //body: JSON.stringify(data)
    });
    return response.json();
}