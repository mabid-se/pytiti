import { HttpClient, TypeHttpRequest } from "@/services/httpClient";
export const getTags = async (requestProcedureId, productId) => {
  const httpClient = new HttpClient();
  return httpClient.get(
    `solicitud-tramite/${requestProcedureId}/productos/${productId}/etiquetas/`
  );
};

export const registerTag = async (requestProcedureId, productId, data) => {
  const httpClient = new HttpClient(TypeHttpRequest.Multipart);
  return httpClient.post(
    `solicitud-tramite/${requestProcedureId}/productos/${productId}/etiquetas/`,
    data
  );
};

export const deleleTag = async (requestProcedureId, productId, tagId) => {
  const httpClient = new HttpClient();
  return httpClient.delete(
    `solicitud-tramite/${requestProcedureId}/productos/${productId}/etiquetas/${tagId}/`
  );
};
