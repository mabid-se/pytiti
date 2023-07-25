const host = process.env.VUE_APP_PROD_URL;
import { getToken } from "@/services/token";
import { generateUrl } from "@/helpers/api";
import store from "@/state/store";

export const TypeHttpRequest = {
  Json: "Json",
  Multipart: "Multipart",
};

export class HttpClient {
  constructor(typeHttpRequest, baseUrl, attachToken = true) {
    this.baseUrl = baseUrl || `${host}api/v1/`;
    this.attachToken = attachToken;
    this.typeHttpRequest = typeHttpRequest || TypeHttpRequest.Json;
    this.extraHeaders = {};
    store.commit("loader/SET_LOADER", true);
  }

  createFormData(data) {
    let body = new FormData();
    for (let key in data) {
      if (data[key] && !Array.isArray(data[key])) {
        body.append(key, data[key]);
      }
      if (
        (typeof data[key] == "number" ||
          (typeof data[key] == "string" && data[key] == "")) &&
        !Array.isArray(data[key])
      ) {
        body.append(key, data[key]);
      }
      if (data[key] && Array.isArray(data[key])) {
        data[key].forEach((value) => {
          body.append(key, value);
        });
      }
    }
    return body;
  }

  getHeaders() {
    const headers = new Headers();
    headers.append("Accept-Language", "es-BO");
    if (this.attachToken)
      headers.append("Authorization", `Bearer ${getToken()}`);
    if (this.typeHttpRequest == TypeHttpRequest.Json)
      headers.append("Content-Type", "application/json");

    return headers;
  }

  encodeData(data) {
    if (this.typeHttpRequest == TypeHttpRequest.Json)
      return JSON.stringify(data);
    if (this.typeHttpRequest == TypeHttpRequest.Multipart)
      return this.createFormData(data);
  }

  saveRequest(url, options) {
    let currentDate = new Date().toJSON().slice(0, 10);
    const requests = JSON.parse(localStorage.getItem(currentDate)) || [];
    requests.push({
      completeUrl: url,
      method: options.method,
      currentLocation: window.location.href,
    });
    localStorage.setItem(currentDate, JSON.stringify(requests));
  }

  performFetch(url, options) {
    if (process.env.NODE_ENV == "development") this.saveRequest(url, options);
    return fetch(url, options);
  }

  async get(url, params = {}) {
    try {
      let completeUrl = generateUrl(`${this.baseUrl}${url}`, params);
      let response = await this.performFetch(completeUrl, {
        headers: this.getHeaders(),
        method: "GET",
      });
      const content = await response.json();
      const ok = response.status < 400;
      store.commit("loader/SET_LOADER", false);

      return {
        ok: ok,
        data: ok ? content : null,
        errors: ok ? null : content,
        status_code: content?.status_code || content?.status,
      };
    } catch (err) {
      store.commit("loader/SET_LOADER", false);
      console.log(err);
    }
  }

  async delete(url, params = {}) {
    try {
      let completeUrl = generateUrl(`${this.baseUrl}${url}`, params);
      let response = await this.performFetch(completeUrl, {
        headers: this.getHeaders(),
        method: "DELETE",
      });

      const string = await response.text();
      const content = string === "" ? {} : JSON.parse(string);

      const ok = response.status < 400;
      store.commit("loader/SET_LOADER", false);
      return {
        ok: ok,
        data: ok ? content : null,
        errors: ok ? null : content,
        status_code: content?.status_code,
      };
    } catch (err) {
      store.commit("loader/SET_LOADER", false);
      console.log(err);
    }
  }

  async post(url, data, params = {}) {
    try {
      let completeUrl = generateUrl(`${this.baseUrl}${url}`, params);
      let response = await this.performFetch(completeUrl, {
        headers: this.getHeaders(),
        method: "POST",
        body: this.encodeData(data),
      });
      const content = await response.json();
      const ok = response.status < 400;
      store.commit("loader/SET_LOADER", false);
      return {
        ok: ok,
        data: ok ? content : null,
        errors: ok ? null : content,
        status_code: content?.status_code,
      };
    } catch (err) {
      store.commit("loader/SET_LOADER", false);
      console.log(err);
    }
  }

  async put(url, data, params = {}) {
    try {
      let completeUrl = generateUrl(`${this.baseUrl}${url}`, params);
      let response = await this.performFetch(completeUrl, {
        headers: this.getHeaders(),
        method: "PUT",
        body: this.encodeData(data),
      });
      const content = await response.json();
      const ok = response.status < 400;
      store.commit("loader/SET_LOADER", false);
      return {
        ok: ok,
        data: ok ? content : null,
        errors: ok ? null : content,
        status_code: content?.status_code,
      };
    } catch (err) {
      store.commit("loader/SET_LOADER", false);
      console.log(err);
    }
  }
}
