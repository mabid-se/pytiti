import { HttpClient } from "@/services/httpClient";

export const getRubros = async (idunidad = null) => {
  const params = {};
  if (idunidad) params.idunidad = idunidad;
  const httpClient = new HttpClient();

  return httpClient.get(`rubros/combo/`, params);
};
