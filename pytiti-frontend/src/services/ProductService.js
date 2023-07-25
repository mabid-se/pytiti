import { HttpClient, TypeHttpRequest } from "@/services/httpClient";

export const searchProduct = async (data) => {
  const httpClient = new HttpClient();
  return httpClient.get(`buscar-productos/service/`, data);
};

export const getTypesProduct = async () => {
  const httpClient = new HttpClient();
  return httpClient.get(`productos/tipos-de-productos/`);
};

export const getTypesActivity = async () => {
  const httpClient = new HttpClient();
  return httpClient.get(`productos/tipos-actividad-rs/`);
};

export const getClassesProduct = async () => {
  const httpClient = new HttpClient();
  return httpClient.get(`productos/clases-productos/`);
};

export const getTypes = async (queryParams = {}) => {
  const httpClient = new HttpClient();
  return httpClient.get(`productos/tipos-productos/`, queryParams);
};

export const getProducts = async (requestProcedureId, tag = false) => {
  const httpClient = new HttpClient();
  return httpClient.get(`solicitud-tramite/${requestProcedureId}/productos/`, {
    etiqueta: tag ? "true" : "",
  });
};

export const deleteProduct = async (
  procedureRequestId,
  productId,
  tag = false
) => {
  const httpClient = new HttpClient();
  return httpClient.delete(
    `solicitud-tramite/${procedureRequestId}/productos/${productId}/`,
    {
      etiqueta: tag ? "true" : "",
    }
  );
};

export const registerProduct = async (requestProcedureId, data, tag) => {
  const httpClient = new HttpClient(TypeHttpRequest.Multipart);
  return httpClient.post(
    `solicitud-tramite/${requestProcedureId}/productos/`,
    data,
    {
      etiqueta: tag ? "true" : "",
    }
  );
};

export const updateProduct = async (
  requestProcedureId,
  productId,
  data,
  tag = false
) => {
  const httpClient = new HttpClient(TypeHttpRequest.Multipart);
  return httpClient.put(
    `solicitud-tramite/${requestProcedureId}/productos/${productId}/`,
    data,
    {
      etiqueta: tag ? "true" : "",
    }
  );
};

export const getProductId = async (params = {}) => {
  const httpClient = new HttpClient();
  return httpClient.get(`productos/generador-codigos/`, params);
};
