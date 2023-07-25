import { HttpClient } from "@/services/httpClient";

export const getStartedTemplate = async (procedureRequestId) => {
  const httpClient = new HttpClient();
  return httpClient.get(
    `tramitadores/solicitudes-tramite/${procedureRequestId}/`
  );
};
