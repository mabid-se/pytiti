const host = process.env.VUE_APP_PROD_URL;
import { getToken } from "./token";

export const getPermissionsSiaService = async () => {
    const url = `${host}api/sia/permissions/`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
        method: "GET",
    });
    return response.json();
}

export const createPermissionsSiaService = async (data) => {
    const url = `${host}api/sia/permissions/`;
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

export const createRolesSiaService = async (data) => {
    const url = `${host}api/sia/roles/`;
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

export const getRolesSiaService = async () => {
    const url = `${host}api/sia/roles/`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
        method: "GET",
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


export const getRoleSiaService = async (id) => {
    const url = `${host}api/sia/roles/${id}/`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
        method: "GET",
    });
    return response.json();
}

export const getRoleUpdateSiaService = async (id, data) => {
    const url = `${host}api/sia/roles/${id}/`;
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

export const deleteRoleSiaService = async (id) => {
    const url = `${host}api/sia/roles/${id}/`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
        method: "DELETE",
    });
    return response;
}

export const getPermissionSiaService = async (id) => {
    const url = `${host}api/sia/permissions/${id}/`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
        method: "GET",
    });
    return response.json();
}

export const getPermissionUpdateSiaService = async (id, data) => {
    const url = `${host}api/sia/permissions/${id}/`;
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

export const deletePermissionSiaService = async (id) => {
    const url = `${host}api/sia/permissions/${id}/`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
        method: "DELETE",
    });
    return response;
}


export const setPasswordSiaService = async (data) => {
    const url = `${host}api/sia/request-password-reset/`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(data)
    });
    return response.json();
}