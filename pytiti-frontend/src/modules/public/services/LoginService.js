import { HttpClient } from "@/services/httpClient";
import { getToken } from "@/services/token";
import store from "@/state/store";

export const verifyToken = async () => {
  if(!getToken()) return false;
  const httpClient = new HttpClient();
  const { ok } = await httpClient.post(`auth/verify/`, {
    token: getToken(),
  });
  if(!ok) store.dispatch("authfack/logout"); 
};
