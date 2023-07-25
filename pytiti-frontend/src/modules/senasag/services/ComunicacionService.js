import { HttpClient, TypeHttpRequest } from "@/services/httpClient";

export const getCommunications = async (idSolicitud) => {
  const httpClient = new HttpClient();
  return httpClient.get(
    `admin/solicitudes-tramite/${idSolicitud}/comunicacion/`
  );
};

export const registerCommunication = async (idSolicitud, data) => {
  const httpClient = new HttpClient(TypeHttpRequest.Multipart);
  return httpClient.post(
    `admin/solicitudes-tramite/${idSolicitud}/comunicacion/`,
    data
  );
};

export const getCommunicationUsers = async (idSolicitud) => {
  const httpClient = new HttpClient();
  return httpClient.get(
    `solicitudes-tramite/${idSolicitud}/communication-users/`
  );
};
