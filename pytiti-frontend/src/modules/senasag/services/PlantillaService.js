import { HttpClient } from "@/services/httpClient";

export const getStartedTemplate = async (procedureRequestId) => {
  const httpClient = new HttpClient();
  return httpClient.get(`admin/solicitudes-tramite/${procedureRequestId}/`);
};

export const goForward = async (procedureRequestId) => {
  const httpClient = new HttpClient();
  return httpClient.put(
    `admin/solicitudes-tramite/${procedureRequestId}/continuar/`
  );
};

export const goForwardChangeStatus = async (procedureRequestId, newStatus) => {
  const httpClient = new HttpClient();
  return httpClient.put(
    `admin/solicitudes-tramite/${procedureRequestId}/continuar/${newStatus}/`
  );
};

export const getInfo = async (procedureRequestId) => {
  const httpClient = new HttpClient();
  return httpClient.get(`admin-solicitudes-tramite/${procedureRequestId}/`);
};