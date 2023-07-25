import { HttpClient } from "@/services/httpClient";

export const getSigners = async (procedureRequestId) => {
  const httpClient = new HttpClient();
  return httpClient.get(`admin/solicitud-tramite/${procedureRequestId}/firmantes/`);
};

export const assingSigners = async (procedureRequestId,data) => {
  const httpClient = new HttpClient();
  return httpClient.post(`admin/solicitud-tramite/${procedureRequestId}/asignar-firmantes-bulk/`,data);
};

export const notifySigners = async (procedureRequestId) => {
  const httpClient = new HttpClient();
  return httpClient.put(`admin/solicitud-tramite/${procedureRequestId}/notificar-firmantes/`);
};

export const getSingersByProcedure = async (procedureRequestId) => {
  const httpClient = new HttpClient();
  return httpClient.get(`admin/solicitud-tramite/${procedureRequestId}/asignar-firmantes/`);
};

export const sendPdfSigned = async (procedureRequestId,digitalSignId,data) => {
  const httpClient = new HttpClient();
  return httpClient.put(`admin/solicitud-tramite/${procedureRequestId}/firma-digital/${digitalSignId}/firmar/`,data);
};

export const checkProgramStatus = async () => {
  const httpClient = new HttpClient();
  return httpClient.get(`api-firma-digital/check-program-status`);
};

export const getTokenConnected = async () => {
  const httpClient = new HttpClient();
  return httpClient.get(`api-firma-digital/get-token-connected`);
};

export const getTokenData = async (data) => {
  const httpClient = new HttpClient();
  return httpClient.post(`api-firma-digital/get-token-data`,data);
};

export const signPdf = async (data) => {
  const httpClient = new HttpClient();
  return httpClient.post(`api-firma-digital/sign-pdf`,data);
};

export const validatePdf = async (data) => {
  const httpClient = new HttpClient();
  return httpClient.post(`api-firma-digital/validate-pdf`,data);
};

export const checkTokenValidacion = async (data) => {
  const httpClient = new HttpClient();
  return httpClient.get(`api-firma-digital/check-token-validation`,data);
};

export const printPdf = async (url) => {
  const httpClient = new HttpClient();
  return httpClient.get(url);
};

