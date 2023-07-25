const host = process.env.VUE_APP_PROD_URL;

import { HttpClient, TypeHttpRequest } from "@/services/httpClient";

export const registerCompanyAccountRequest = async (data, step) => {
  const httpClient = new HttpClient(TypeHttpRequest.Multipart, null, false);
  return httpClient.post("solicitud/empresa/", data, { step });
};

export const registerNaturalPersonAccountRequest = async (data, step) => {
  const httpClient = new HttpClient(TypeHttpRequest.Multipart, null, false);
  return httpClient.post("solicitud/persona-natural/", data, { step });
};

export const processorAccountRequest = async (data) => {
  const httpClient = new HttpClient(TypeHttpRequest.Multipart, null, false);
  return httpClient.post("solicitud/tramitador/", data);
};

export const registerCompanyRepresentative = async (companyId, data) => {
  const headers = { "Content-Type": "application/json" };
  let url = `${host}api/v1/solicitud/${companyId}/representante/`;
  try {
    let response = await fetch(url, {
      headers,
      method: "POST",
      body: JSON.stringify(data),
    });
    const content = await response.json();
    const ok = response.status < 400;
    return {
      ok: ok,
      data: ok ? content : null,
      errors: ok ? null : content,
    };
  } catch (err) {
    console.log(err);
  }
};

export const uploadFiles = async (companyId, data) => {
  let url = `${host}api/v1/solicitud/${companyId}/archivos/`;
  let response = await fetch(url, { method: "POST", body: data });
  return response.json();
};

export const registerPerson = async (data) => {
  let url = `${host}api/v1/solicitud/persona-natural/`;
  let headers = {
    "Content-Type": "application/json",
  };
  let response = await fetch(url, {
    headers,
    method: "POST",
    body: JSON.stringify(data),
  });

  const content = await response.json();
  const ok = response.status < 400;
  return {
    ok: ok,
    data: ok ? content : null,
    errors: ok ? null : content,
  };
};

export const uploadPersonFile = async (personId, file) => {
  let url = `${host}api/v1/solicitud/${personId}/archivos-persona-natural/`;
  let response = await fetch(url, { method: "POST", body: file });
  return response.json();
};
