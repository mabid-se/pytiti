import { HttpClient } from "@/services/httpClient";
export const getRequestAttachProcessor = (idRequestAttachProcessor) => {
  const httpClient = new HttpClient();
  return httpClient.get(
    `admin/solicitud/vincular-tramitador/${idRequestAttachProcessor}/`
  );
};

export const getCompanyRequestAccount = (idRequest) => {
  const httpClient = new HttpClient();
  return httpClient.get(`cuenta/empresas/solicitudes/${idRequest}/`);
};

export const answerCompanyAccountRequest = async (idRequest, data) => {
  const httpClient = new HttpClient();
  return httpClient.put(`cuenta/empresas/solicitudes/${idRequest}/`, data);
};

export const resendEmailPassword = async (idRequest) => {
  const httpClient = new HttpClient();
  return httpClient.get(`external-email-re-send/${idRequest}/`);
};

export const answerAttachProcessorRequest = async (idRequest, answer) => {
  const httpClient = new HttpClient();
  return httpClient.put(
    `admin/solicitud/vincular-tramitador/${idRequest}/${answer}/`,
    {}
  );
};

export const getSucursalRequestAccount = (idSucursal) => {
  const httpClient = new HttpClient();
  return httpClient.get(`solicitudes/sucursales/${idSucursal}/`);
};

export const answerBranchAccountRequest = async (idSucursal, action) => {
  const httpClient = new HttpClient();
  return httpClient.put(`solicitudes/sucursales/${idSucursal}/${action}/`, {});
};

export const verifyProcedureRequestSettlement = async (idRequest) => {
  const httpClient = new HttpClient();
  return httpClient.get(
    `solicitud-tramite/${idRequest}/verificar-liquidacion/`
  );
};
