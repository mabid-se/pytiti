import { HttpClient } from "@/services/httpClient";

export const getProcessors = async(idEmpresa) => {
    const httpClient = new HttpClient();
    return httpClient.get(`empresa/${idEmpresa}/tramitadores/`);
};