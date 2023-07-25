import { HttpClient } from "@/services/httpClient";

export const getEspeciesDestino = async () => {
  const httpClient = new HttpClient();
  return httpClient.get(`select-options/especies/`);
};
