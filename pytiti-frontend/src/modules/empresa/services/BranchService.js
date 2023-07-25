import { HttpClient } from "@/services/httpClient";

export const getBranches = async (idEmpresa) => {
  const httpClient = new HttpClient();
  return httpClient.get(`empresa/${idEmpresa}/sucursales/`, {
    sucursales: "true",
  });
};

export const registerUpdateBranch = async (idEmpresa, idSucursal, body) => {
  const httpClient = new HttpClient();
  let url = `empresa/${idEmpresa}/sucursales/`;
  let method = "post";
  if (idSucursal) {
    url = `url/${idSucursal}`;
    method = "put";
  }
  return httpClient[method](url, body);
};
