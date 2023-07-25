import { HttpClient, TypeHttpRequest } from "@/services/httpClient";

export const getContainers = async () => {
  const httpClient = new HttpClient();
  return httpClient.get(`productos/tipos-de-envases/`);
};

export const getProductsPetPcr = async (requestProcedureId) => {
  const httpClient = new HttpClient();
  return httpClient.get(
    `solicitud-tramite/${requestProcedureId}/productos-petpcr/`
  );
};

export const getTypesActivityPetPcr = async () => {
  const httpClient = new HttpClient();
  return httpClient.get(`productos/tipos-actividad-petprc/`);
};

export const registerProductPetPcr = async (requestProcedureId, data) => {
  const httpClient = new HttpClient(TypeHttpRequest.Multipart);
  return httpClient.post(
    `solicitud-tramite/${requestProcedureId}/productos-petpcr/`,
    data
  );
};

export const deleteProductPetPcr = async (procedureRequestId, productId) => {
  const httpClient = new HttpClient();
  return httpClient.delete(
    `solicitud-tramite/${procedureRequestId}/productos-petpcr/${productId}/`
  );
};

export const updateProduct = async (requestProcedureId, productId, data) => {
  const httpClient = new HttpClient(TypeHttpRequest.Multipart);
  return httpClient.put(
    `solicitud-tramite/${requestProcedureId}/productos-petpcr/${productId}/`,
    data
  );
};
