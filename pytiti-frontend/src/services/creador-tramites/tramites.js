import { getToken } from "@/services/token";

const host = process.env.VUE_APP_PROD_URL;
import { HttpClient } from "@/services/httpClient";

const headers = new Headers();
headers.append("Authorization", `Bearer ${getToken()}`);

export const getProcedureById = async (id) => {
  const httpClient = new HttpClient();
  return httpClient.get(`admin-tramites/${id}/`);
};

export const registerProcedure = async (data) => {
  let url = `${host}api/v1/admin-tramites/`;
  try {
    headers.append("Content-Type", "application/json");
    let response = await fetch(url, {
      headers,
      method: "POST",
      body: JSON.stringify(data),
    });
    const content = await response.json();
    const ok = response.status < 400;
    return {
      ok: ok,
      data: ok ? content : null,
      errors: ok ? null : content,
    };
  } catch (err) {
    console.log(err);
  }
};
