import { getToken, getUserStored } from "./token";

const host = process.env.VUE_APP_PROD_URL;

var headers = new Headers();
headers.append("Authorization", `Bearer ${getToken()}`);

export const getProfileInfo = async () => {
  headers.append("Content-Type", "application/json");
  let response = await fetch(`${host}api/v1/me/profile/`, {
    headers,
    method: "GET",
  });
  return response.json();
};

export const userGroups = () => {
  return getUserStored().profile.groups;
};

export const userData = () => {
  return getUserStored().data;
};

export const setPassword = async (data) => {
  let url = `${host}api/v1/cuenta/empresa/password/`;
  let bodyData = JSON.stringify(data);
  let response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: bodyData,
  });
  return response.json();
};

export const getAdditionalProfileInfo = async () => {
  let url = `${host}api/v1/aditional-profile/`;
  let response = await fetch(url, { headers });
  return response.json();
};

export const getUserType = () => {
  let { empresas_asociadas } = getUserStored();
  if (empresas_asociadas) {
    let selectedCompany = localStorage.getItem("selected_company");
    return empresas_asociadas.find((item) => item === selectedCompany);
  }
  let { empresa, persona_natural, persona_tramitador } = getUserStored();
  return empresa || persona_natural || persona_tramitador;
};

/**
 *
 * @returns {Boolean}
 */
export const userIsAdmin = () => {
  return getUserStored().profile.groups.includes("interno-aprobar-solicitudes");
};

export const userIsCompany = () => {
  return getUserStored().profile.groups.includes("externo-empresa");
};

export const userIsPerson = () => {
  return getUserStored().profile.groups.includes("externo-persona-natural");
};

export const userIsProcessor = () => {
  return getUserStored().profile.groups.includes("externo-tramitador");
};

export const userIsCreator = () => {
  return getUserStored().profile.groups.includes("interno-creador-tramite");
};

export const userIsSystemNal = () => {
    return getUserStored().profile.groups.includes("interno-sia-sistemas-nacional");
}

export const processorId = () => {
  return getUserStored().persona_tramitador;
};
