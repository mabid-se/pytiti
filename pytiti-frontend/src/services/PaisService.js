import { HttpClient, TypeHttpRequest } from "@/services/httpClient";

export const getCountries = async () => {
  const httpClient = new HttpClient();
  return httpClient.get(`select-options/paises/`);
};
