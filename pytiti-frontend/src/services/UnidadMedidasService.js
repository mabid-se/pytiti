import { HttpClient } from "@/services/httpClient";

export const getUnidadesMedida = async () => {
  const httpClient = new HttpClient();
  return httpClient.get(`select-options/unidad-de-medidas/`);
};
