import { HttpClient, TypeHttpRequest } from "@/services/httpClient";

export const getCommunications = async (idEmpresa, idSolicitud) => {
  const httpClient = new HttpClient();
  return httpClient.get(
    `empresa/${idEmpresa}/tramites/${idSolicitud}/comunicacion/`
  );
};

export const registerCommunication = async (idEmpresa, idSolicitud, data) => {
  const httpClient = new HttpClient(TypeHttpRequest.Multipart);
  return httpClient.post(
    `empresa/${idEmpresa}/tramites/${idSolicitud}/comunicacion/`,
    data
  );
};
