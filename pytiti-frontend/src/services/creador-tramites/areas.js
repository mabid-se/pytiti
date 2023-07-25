
import { HttpClient } from "@/services/httpClient";

export const getAreas = async () => {
  const httpClient = new HttpClient();
  return httpClient.get(`unidad/combo/`);
};