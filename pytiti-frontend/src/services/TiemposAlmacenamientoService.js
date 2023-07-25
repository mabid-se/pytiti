import { HttpClient } from "@/services/httpClient";

export const getTiemposAlmacenamiento = async () => {
  const httpClient = new HttpClient();
  return httpClient.get(`select-options/tiempos-de-almacenamiento/`);
};
