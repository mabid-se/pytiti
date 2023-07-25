import { HttpClient, TypeHttpRequest } from "@/services/httpClient";
export const getPrincipiosActivos = async (requestProcedureId, productId) => {
  const httpClient = new HttpClient();
  return httpClient.get(
    `solicitud-tramite/${requestProcedureId}/productos/${productId}/principios-activos/`
  );
};

export const registerPrincipioActivo = async (
  requestProcedureId,
  productId,
  data
) => {
  const httpClient = new HttpClient();
  return httpClient.post(
    `solicitud-tramite/${requestProcedureId}/productos/${productId}/principios-activos/`,
    data
  );
};

export const delelePrincipioActivo = async (
  requestProcedureId,
  productId,
  principioActivoId
) => {
  const httpClient = new HttpClient();
  return httpClient.delete(
    `solicitud-tramite/${requestProcedureId}/productos/${productId}/principios-activos/${principioActivoId}/`
  );
};

export const getExcipientes = async (requestProcedureId, productId) => {
  const httpClient = new HttpClient();
  return httpClient.get(
    `solicitud-tramite/${requestProcedureId}/productos/${productId}/excipientes/`
  );
};
export const registerExcipiente = async (
  requestProcedureId,
  productId,
  data
) => {
  const httpClient = new HttpClient();
  return httpClient.post(
    `solicitud-tramite/${requestProcedureId}/productos/${productId}/excipientes/`,
    data
  );
};

export const deleleExcipiente = async (
  requestProcedureId,
  productId,
  excipienteId
) => {
  const httpClient = new HttpClient();
  return httpClient.delete(
    `solicitud-tramite/${requestProcedureId}/productos/${productId}/excipientes/${excipienteId}/`
  );
};
