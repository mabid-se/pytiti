import { HttpClient } from "@/services/httpClient";

export const getViasAdministracion = async () => {
  const httpClient = new HttpClient();
  return httpClient.get(`select-options/vias-administracion/`);
};
