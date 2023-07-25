import { HttpClient, TypeHttpRequest } from "@/services/httpClient";

export const getInspectors = async (requestProcedureId) => {
  const httpClient = new HttpClient();
  return httpClient.get(
    `solicitudes-tramite/${requestProcedureId}/inspectores/`
  );
};

export const getInspectionTypes = async () => {
  const httpClient = new HttpClient();
  return httpClient.get(`tipos-inspeccion/`);
};

export const getRequestRegisterInspections = async (requestProcedureId) => {
  const httpClient = new HttpClient();
  return httpClient.get(
    `solicitudes-tramite/${requestProcedureId}/registros-inspeccion/`
  );
};

export const getInspectorRegisterInspections = async (inspectorId) => {
  const httpClient = new HttpClient();
  return httpClient.get(`inspectores/${inspectorId}/registros/`);
};

export const getRegisterInspection = async (registerId) => {
  const httpClient = new HttpClient();
  return httpClient.get(`registros-inspeccion/${registerId}/`);
};

export const createOrUpdateRegisterInspection = async (data) => {
  const url = data.id
    ? `registros-inspeccion/${data.id}/`
    : `solicitudes-tramite/${data.fid_solicitud_tramite}/registros-inspeccion/`;
  const method = data.id ? "put" : "post";
  const httpClient = new HttpClient(TypeHttpRequest.Multipart);
  return httpClient[method](url, data);
};

export const deleteRegisterInspection = (registerId) => {
  const httpClient = new HttpClient();
  return httpClient.delete(`registros-inspeccion/${registerId}/`);
};
