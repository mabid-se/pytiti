import { getToken } from "./token";
import { getUserType } from "./user";

// const host = process.env.VUE_APP_PRODUCTION === true ? process.env.VUE_APP_PROD_URL : process.env.VUE_APP_DEV_URL;
const host = process.env.VUE_APP_PROD_URL;

const headers = new Headers();
headers.append("Authorization", `Bearer ${getToken()}`);

import { HttpClient } from "@/services/httpClient";

export const getProcedureById = async (id) => {
  const httpClient = new HttpClient();

  return httpClient.get(`tramites/${id}/`);
};

export const getAllProceduresList = async () => {
  let url = `${host}api/v1/solicitudes/tramites/`;
  let response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    method: "GET",
  });
  return response.json();
};

export const getProceduresList = async (unidad) => {
  headers.append("Content-Type", "application/json");
  let url = `${host}api/v1/tramites-servicios/?unidad=${unidad}`;
  let response = await fetch(url, {
    headers,
    method: "GET",
  });
  return response.json();
};

export const getProcedureTemplate = async (slug) => {
  let url = `${host}api/v1/proceso-tramite/${slug}/`;
  let response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    method: "GET",
  });
  return response.json();
};

export const sendProcedureTemplate = async (slug, body, entityId) => {
  const header = new Headers();
  header.append("Authorization", `Bearer ${getToken()}`);
  let url = `${host}api/v1/proceso-tramite/${slug}/${entityId}/`;
  let response = await fetch(url, {
    headers: header,
    method: "POST",
    body: body,
  });
  return response.json();
};

export const updateProcedureTemplate = async (slug, body, entityId) => {
  const header = new Headers();
  header.append("Authorization", `Bearer ${getToken()}`);
  let url = `${host}api/v1/proceso-tramite/${slug}/${entityId}/`;
  let response = await fetch(url, {
    headers: header,
    method: "PUT",
    body: body,
  });
  return response.json();
};

export const sendProcedureRequirementFiles = async (slug, bodyData) => {
  const header = new Headers();
  header.append("Authorization", `Bearer ${getToken()}`);
  // header.append("Content-Type", "multipart/form-data");
  // header.append("Accept", "application/json, application/xml, text/plain, text/html, *.*");
  let url = `${host}api/v1/tramites/${slug}/plantilla/requisitos/`;
  let response = await fetch(url, {
    headers: header,
    method: "POST",
    body: bodyData,
  });
  return response.json();
};

export const sendProcedureTemplateTest = async (slug, body, entity_name) => {
  headers.append("Content-Type", "application/json");
  let url = `${host}api/v1/tramites/${slug}/plantilla/${entity_name}/`;
  let response = await fetch(url, {
    headers,
    method: "POST",
    body: JSON.stringify(body),
  });
  return response.json();
};

export const getApiOptions = async (apiEndpoint, body) => {
  const header = new Headers();
  header.append("Authorization", `Bearer ${getToken()}`);
  header.append("Content-Type", "application/json");
  let url = `${host}${apiEndpoint.slice(1)}/`;
  let response = await fetch(url, {
    headers: header,
    method: "POST",
    body: JSON.stringify(body),
  });
  return response.json();
};

export const asignProcedure = async (body) => {
  const header = new Headers();
  header.append("Authorization", `Bearer ${getToken()}`);
  header.append("Content-Type", "application/json");
  let url = `${host}api/v1/proceso-tramite/create/`;
  let response = await fetch(url, {
    headers: header,
    method: "POST",
    body: JSON.stringify(body),
  });
  return response.json();
};

export const asignationProcedure = async (data, procedureId) => {
  let url = `${host}api/v1/${getUserType()}/iniciar-tramite/${procedureId}/`;
  let response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getUserProceduresList = async () => {
  const header = new Headers();
  header.append("Authorization", `Bearer ${getToken()}`);
  header.append("Content-Type", "application/json");
  let url = `${host}api/v1/proceso-tramite/`;
  const response = await fetch(url, { headers: header, method: "GET" });
  return response.json();
};

export const getFilledProceduresList = async () => {
  const header = new Headers();
  header.append("Authorization", `Bearer ${getToken()}`);
  header.append("Content-Type", "application/json");
  let url = `${host}api/v1/tramites-llenados/`;
  const response = await fetch(url, { headers: header, method: "GET" });
  return response.json();
};

export const getStartedCompanyProcedures = async () => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${getToken()}`);
  let url = `${host}api/v1/tramites/${getUserType()}/iniciados/`;
  let response = await fetch(url, { headers });
  return response.json();
};

export const getUnasignedCompanyProcedures = async () => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${getToken()}`);
  let url = `${host}api/v1/tramites/${getUserType()}/iniciados/sin-asignar/`;
  let response = await fetch(url, { headers });
  return response.json();
};

export const getComponentPreviewProcedureTemplate = async (
  slug,
  componentId
) => {
  const httpClient = new HttpClient();
  return httpClient.get(
    `plantilla-tramite-completo/${slug}/components/${componentId}/`
  );
};

/**
 * Obtiene trámite plantilla de ejemplo
 * method: GET
 * endpoint: api/v1/plantilla-tramite-completo/<slug:slug>/
 */
export const getPreviewProcedureTemplate = async (slug) => {
  const httpClient = new HttpClient();
  return httpClient.get(`plantilla-tramite-completo/${slug}/`);
};

/**
 * Solicitud de pre-solicitud de trámite
 * method: POST
 * enpoint: api/v1/empresa/<str:idempresa>/pre-solicitudes/
 */
export const sendProcedurePreRequestEmpresa = async (idEmpresa, data) => {
  const httpClient = new HttpClient();
  let url = `empresa/${idEmpresa}/pre-solicitudes/`;
  return httpClient.post(url, data);
};

export const sendProcedurePreRequest = async (
  userAccountType = "empresa",
  data
) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  let url = `${host}api/v1/${userAccountType}/${getUserType()}/pre-solicitudes/`;
  if (userAccountType === "empresa") {
    url = `${url}crear/`;
  }
  const response = await fetch(url, {
    headers,
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
};

/**
 * Lista de trámites pre-solicitados
 * method: GET
 * endpoint: api/v1/pre-solicitudes/
 */
export const getPreRequestedProcedures = async () => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  const url = `${host}api/v1/pre-solicitudes/`;
  const response = await fetch(url, { headers });
  return response.json();
};

/**
 * Aprobar trámite pre-solicitado
 * method: GET
 * endpoint: api/v1/pre-solicitud/<str:id_pre_solicitud>
 */
export const approveRequestedProcedure = async (requestId, data) => {
  const httpClient = new HttpClient();
  return httpClient.put(`pre-solicitudes/${requestId}/aprobar/`, data);
};

/**
 * Ver detalle de trámite pre-solicitado
 * method: GET
 * endpoint: api/v1/pre-solicitudes/<str:id_pre_solicitud>
 */
export const getRequestedProcedure = async (requestId) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  const url = `${host}api/v1/pre-solicitudes/${requestId}/`;
  const response = await fetch(url, { headers });
  return response.json();
};

/**
 * Rechazar trámite pre-solicitado
 * method: GET
 * endpoint: api/v1/pre-solicitud/<str:idpresolicitud>/rechazar/
 */
export const rejectRequestedProcedure = async (requestId) => {
  const httpClient = new HttpClient();
  return httpClient.get(`pre-solicitud/${requestId}/rechazar/`);
};

/**
 * Cambiar trámite pre-solicitado
 * method: GET
 * endpoint: api/v1/pre-solicitud/<str:idpresolicitud>/cambio-tramite/<str:idtramite>/
 */
export const changeRequestedProcedure = async (requestId, procedureId) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  const url = `${host}api/v1/pre-solicitud/${requestId}/cambio-tramite/${procedureId}/`;
  const response = await fetch(url, { headers, method: "PUT" });
  return response.json();
};

/**
 * Enviar trámite plantilla a SENASAG
 * method: GET
 * endpoint: empresa/<str:idempresa>/tramites/<str:idsolicitud_tramite>/enviar/
 */
export const sendProcedureToSenasag = async (procedureRequestId, empresaId) => {
  const httpClient = new HttpClient();
  return httpClient.get(
    `empresa/${empresaId}/tramites/${procedureRequestId}/enviar/`
  );
};

export const sendProductProcedureToSenasag = async (
  procedureRequestId,
  empresaId
) => {
  const httpClient = new HttpClient();
  return httpClient.get(
    `empresa/${empresaId}/tramites/${procedureRequestId}/enviar-prod/`
  );
};
