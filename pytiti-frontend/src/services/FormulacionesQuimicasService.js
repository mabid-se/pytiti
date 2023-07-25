import { HttpClient } from "@/services/httpClient";

export const getFormulacionesQuimicas = async () => {
  const httpClient = new HttpClient();
  return httpClient.get(`productos/formulaciones-quimicas/`);
};
