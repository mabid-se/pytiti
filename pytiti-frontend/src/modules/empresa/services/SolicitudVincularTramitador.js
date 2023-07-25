import { HttpClient } from "@/services/httpClient";

export const create = async (companyId, processorId) => {
  const httpClient = new HttpClient();
  return httpClient.post(`solicitud/vincular-tramitador/`, {
    empresas_id: companyId,
    tramitador_id: processorId,
  });
};
