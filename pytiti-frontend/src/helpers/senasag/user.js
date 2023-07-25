import { 
    userIsAdmin, 
    userIsCompany, 
    userIsPerson, 
    userIsProcessor 
} from "@/services/user";

export const userRole = (userData) => {
    return userData.profile.groups.includes("senasag");
}

export const userGroups = (userData) => {
    return userData.profile.groups;
}

export const userProfile = () => {
    return JSON.parse(localStorage.getItem("user")).profile;
}

export const getUserRole = () => {
    let userRoles = {
        empresa: userIsCompany(),
        "persona-natural": userIsPerson(),
        "persona_tramitador": userIsProcessor(),
        senasag: userIsAdmin(),
    };
    let userRole;
    for(let role in userRoles) {
        if (userRoles[role]) {
            userRole = role;
        }
    }
    return userRole;
}

export const getUserSessionRequest = (sessionKey) => {
    return JSON.parse(sessionStorage.getItem(sessionKey));
}

export const getCompanyProcessors = () => {
    return JSON.parse(localStorage.getItem("tramitadores_empresa"));
}

export const getCompanyInfo = () => {
    return JSON.parse(localStorage.getItem("empresa_info"));
}