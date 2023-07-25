import { HttpClient, TypeHttpRequest } from "@/services/httpClient";

export const getFilledInspectionDocuments = async (
  procedureRequestId,
  idEmpresa
) => {
  const httpClient = new HttpClient();
  return httpClient.get(
    `empresa/${idEmpresa}/tramites/${procedureRequestId}/inspection-documents/`
  );
};

export const saveInspectionDocument = async (
  procedureRequestId,
  idEmpresa,
  idRequirement,
  data
) => {
  const httpClient = new HttpClient(TypeHttpRequest.Multipart, null, true);
  return httpClient.post(
    `empresa/${idEmpresa}/tramites/${procedureRequestId}/inspection-documents/${idRequirement}/`,
    data
  );
};

export const deleteFilledInspectionDocument = async (
  procedureRequestId,
  idFilledInspectionDocument
) => {
  const httpClient = new HttpClient();
  return httpClient.delete(
    `solicitudes-tramite/${procedureRequestId}/filled-inspection-document/${idFilledInspectionDocument}/`
  );
};
