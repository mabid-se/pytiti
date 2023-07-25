import { HttpClient, TypeHttpRequest } from "@/services/httpClient";

export const getFilledRequirements = async (procedureRequestId, idEmpresa) => {
  const httpClient = new HttpClient();
  return httpClient.get(
    `empresa/${idEmpresa}/tramites/${procedureRequestId}/requirements/`
  );
};

export const deleteFilledRequirement = async (
  procedureRequestId,
  idFilledRequirement
) => {
  const httpClient = new HttpClient();
  return httpClient.delete(
    `solicitudes-tramite/${procedureRequestId}/filled-requirement/${idFilledRequirement}/`
  );
};

export const getUnassignedRequirements = async (procedureRequestId) => {
  const httpClient = new HttpClient();
  return httpClient.get(
    `admin/solicitudes-tramite/${procedureRequestId}/requirements/`
  );
};

export const addUnassignedRequirement = async (
  procedureRequestId,
  requerimentId
) => {
  const httpClient = new HttpClient();
  return httpClient.post(
    `admin/solicitudes-tramite/${procedureRequestId}/requirements/${requerimentId}/`
  );
};

export const saveRequirement = async (
  procedureRequestId,
  idEmpresa,
  idRequirement,
  data
) => {
  const httpClient = new HttpClient(TypeHttpRequest.Multipart, null, true);
  return httpClient.post(
    `empresa/${idEmpresa}/tramites/${procedureRequestId}/requirements/${idRequirement}/`,
    data
  );
};
