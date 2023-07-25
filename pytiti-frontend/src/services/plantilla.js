import { jsonToFormData } from "@/helpers/senasag/form";
import { getToken } from "./token";
import { getUserType, userIsCompany } from "./user";

const host = process.env.VUE_APP_PROD_URL;
import { HttpClient, TypeHttpRequest } from "@/services/httpClient";

export const getStartedTemplate = async (procedureRequestId) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  let url = "";
  if (userIsCompany()) {
    url = `${host}api/v1/empresa/${getUserType()}/tramites/${procedureRequestId}/`;
  } else {
    url = `${host}api/v1/persona/${getUserType()}/tramites/${procedureRequestId}/`;
  }
  //const url = `${host}api/v1/plantilla-tramite-completo/${procedureRequestId}/`;
  let response = await fetch(url, { headers });
  return response.json();
};

export const getComponentFieldsTemplate = async (
  procedureRequestId,
  componentId
) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  let url = "";
  if (userIsCompany()) {
    url = `${host}api/v1/empresa/${getUserType()}/tramites/${procedureRequestId}/components/${componentId}/`;
  } else {
    url = `${host}api/v1/persona/${getUserType()}/tramites/${procedureRequestId}/components/${componentId}/`;
  }
  //const url = `${host}api/v1/plantilla-tramite-completo/${procedureRequestId}/`;
  let response = await fetch(url, { headers });
  return response.json();
};

export const deleteFileMetadata = async (metadataKey, idDocument) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  let url = "";

  if (userIsCompany()) {
    url = `${host}api/v1/empresa/${getUserType()}/representante/${metadataKey}/${idDocument}/`;
  } else {
    url = `${host}api/v1/persona/${getUserType()}/representante/${metadataKey}/${idDocument}/`;
  }
  //const url = `${host}api/v1/plantilla-tramite-completo/${procedureRequestId}/`;
  let response = await fetch(url, {
    headers,
    method: "DELETE",
  });

  const ok = response.status < 400;

  return {
    ok: ok,
  };
};

export const getProcessorTemplate = async (procedureRequestId) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  let url = `${host}api/v1/tramitador/${getUserType()}/empresa/${localStorage.getItem(
    "selected_company"
  )}/tramites/${procedureRequestId}/`;
  let response = await fetch(url, { headers });
  return response.json();
};

export const postStartedTemplate = async (templateUrl = "/", data) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };
  const url = `${host}api/v1/empresa/${getUserType()}${templateUrl}`;
  const bodyData = jsonToFormData(data);
  let response = await fetch(url, {
    headers,
    method: "POST",
    body: bodyData,
  });
  return response.json();
};

export const saveComponentInfo = async (
  solicitudTramiteId,
  empresaId,
  componentId,
  data
) => {
  const url = `empresa/${empresaId}/tramites/${solicitudTramiteId}/components/${componentId}/`;
  const httpClient = new HttpClient(TypeHttpRequest.Multipart);
  return httpClient.put(url, data);
};

export const postStartedTemplateJson = async (templateUrl = "/", data) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };

  const url = `${host}api/v1/empresa/${getUserType()}${templateUrl}`;
  let response = await fetch(url, {
    headers,
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
};

export const uploadRequirementTemplate = async (fieldId, bodyData) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };
  const url = `${host}api/v1/empresa/${getUserType()}/requisito/${fieldId}/`;
  let response = await fetch(url, {
    headers,
    method: "POST",
    body: bodyData,
  });
  return response.json();
};

export const putStartedTemplate = async (templateUrl = "/", data) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };
  const url = `${host}api/v1/empresa/${getUserType()}${templateUrl}`;
  const bodyData = jsonToFormData(data);
  let response = await fetch(url, {
    headers,
    method: "PUT",
    body: bodyData,
  });

  const content = await response.json();
  const ok = response.status < 400;
  return {
    ok: ok,
    data: ok ? content : null,
    errors: ok ? null : content,
  };
};

/**
 * Obtiene todos plantilla llenada por usuario SENASAG
 * method: GET
 + endpoint: api/v1/solicitudes/tramites/<id_solicitud_tramite>/
 **/
export const getProcedureTemplateForAdmin = async (procedureId) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  const url = `${host}api/v1/solicitudes/tramites/${procedureId}/`;
  const response = await fetch(url, { headers });
  return response.json();
};

/**
 * Registro formulario
 *
 **/
export const postProcessorTemplate = async (templateUrl = "/", data) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };
  const url = `${host}api/v1/tramitador/${getUserType()}/empresa/${localStorage.getItem(
    "selected_company"
  )}${templateUrl}`;
  const bodyData = jsonToFormData(data);
  let response = await fetch(url, {
    headers,
    method: "POST",
    body: bodyData,
  });
  return response.json();
};

export const putProcessorTemplate = async (templateUrl = "/", data) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };
  const url = `${host}api/v1/tramitador/${getUserType()}/empresa/${localStorage.getItem(
    "selected_company"
  )}${templateUrl}`;
  const bodyData = jsonToFormData(data);
  let response = await fetch(url, {
    headers,
    method: "PUT",
    body: bodyData,
  });
  return response.json();
};
