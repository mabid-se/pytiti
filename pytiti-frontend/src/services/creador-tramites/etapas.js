import { HttpClient } from "@/services/httpClient";

const httpClient = new HttpClient();
export const getStepBySlug = async (slug) => {
  return httpClient.get(`pasos/${slug}/`);
};

export const getSteps = async (id) => {
  const httpClient = new HttpClient();
  return httpClient.get(`admin-tramites/${id}/etapas/`);
};

export const registerUpdateStep = async (id, body, slug) => {
  const httpClient = new HttpClient();
  let url = `admin-tramites/${id}/etapas/`;
  let method = 'post';
  if (slug) {
    url = `pasos/${slug}/`;
    method= 'put'
  }
  return httpClient[method](url, body);
};
