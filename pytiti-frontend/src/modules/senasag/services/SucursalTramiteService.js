import { HttpClient, TypeHttpRequest } from "@/services/httpClient";

export const filterSucursalTramiteByNitOrCi = async (queryParams) => {
  const httpClient = new HttpClient();
  return httpClient.get(`sucursal-tramite/`, queryParams);
};

export const getSucursalesTramite = async (queryParams) => {
  const httpClient = new HttpClient();
  return httpClient.get(`solicitudes/tramites/`, queryParams);
};
