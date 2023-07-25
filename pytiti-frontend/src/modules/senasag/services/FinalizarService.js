import { HttpClient, TypeHttpRequest } from "@/services/httpClient";

export const closeProcedure = async (requestProcedureId, data) => {
  const url = `solicitud-tramite/${requestProcedureId}/registro-sanitario/`;
  const method = "put";
  const httpClient = new HttpClient(TypeHttpRequest.Multipart);
  return httpClient[method](url, data);
};
