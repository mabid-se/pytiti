import { i } from "vue3-pdfjs/esm/index-19f89c12";
import { authHeader } from "./auth-header";

export const userService = {
  login,
  loginSia,
  logout,
  register,
  getAll,
};

const hostname = process.env.VUE_APP_PROD_URL;

function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept-Language": "es-BO" },
    body: JSON.stringify({ user: email, username: email, password }),
  };
  return fetch(`${hostname}api/v1/auth/login/`, requestOptions)
    .then(handleResponse)
    .then((res) => {
      console.log(res);
      // login successful if there's a jwt token in the response
      if (res.session) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(res));
      }
      return res;
    });
}

function loginSia(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: email, username: email, password }),
  };
  return fetch(`${hostname}api/v1/auth/login-sia/`, requestOptions)
    .then(handleResponse)
    .then((res) => {
      // login successful if there's a jwt token in the response
      if (res.session) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(res));
      }
      return res;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };
  return fetch(`/users/register`, requestOptions).then(handleResponse);
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      let error = null;
      if (response.status === 401) {
        error = "Credenciales incorrectas.";
        logout();
      }
      if (response.status === 404) error = "Esta cuenta no existe";
      return Promise.reject(error);
    }
    return data;
  });
}
