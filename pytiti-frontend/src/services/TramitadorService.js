import { HttpClient } from "@/services/httpClient";

export const searchProcessor = async (carnet) => {
  const httpClient = new HttpClient();
  return httpClient.get(`tramitadores/${carnet}/`);
};
