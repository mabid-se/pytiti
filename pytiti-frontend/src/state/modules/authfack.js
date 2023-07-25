import { userRole, userGroups } from "@/helpers/senasag/user";
import { getSelectList } from "@/services/tablas-base";
import { userService } from "../../helpers/authservice/user.service";
import {
  getCompanyApprovedProcessors,
  getEnterpriseAccount,
} from "@/services/cuentas";
import { getUserType } from "@/services/user";
import router from "../../router/index";
// helpers
const SELECT_APIS = [
  {
    name: "distrital",
    endpoint: "api/v1/select-options/distrital/",
  },
  {
    name: "provincias",
    endpoint: "api/v1/select-options/provincias/",
  },
  {
    name: "municipios",
    endpoint: "api/v1/select-options/municipios/",
  },
];

const user = JSON.parse(localStorage.getItem("user"));
export const state = user
  ? { status: { loggeduser: true }, user }
  : { status: {}, user: null, errors: {} };

export const actions = {
  // Logs in the user.
  login({ dispatch, commit }, { email, password }) {
    commit("loginRequest", { email });
    commit("loader/SET_LOADER", true, { root: true });
    userService
      .login(email, password)
      .then(
        (user) => {
          console.log(user);
          commit("loginSuccess", user);

          dispatch("permissions/setRole", userRole(user), { root: true });
          dispatch("permissions/setGroups", userGroups(user), { root: true });
          const currentLocation = window.location;
          window.location = currentLocation;
        },
        (error) => {
          commit("loginFailure", error);
          dispatch("notification/error", error, { root: true });
        }
      )
      .finally(() => {
        commit("loader/SET_LOADER", false, { root: true });
      });
  },
  loginSia({ dispatch, commit }, { email, password }) {
    commit("loginRequest", { email });
    commit("loader/SET_LOADER", true, { root: true });
    userService
      .loginSia(email, password)
      .then(
        (user) => {
          commit("loginSuccess", user);

          dispatch("permissions/setRole", userRole(user), { root: true });
          dispatch("permissions/setGroups", userGroups(user), { root: true });

          const currentLocation = window.location;
          window.location = currentLocation;
        },
        (error) => {
          commit("loginFailure", error);
          dispatch("notification/error", error, { root: true });
        }
      )
      .finally(() => {
        commit("loader/SET_LOADER", false, { root: true });
      });
  },
  // Logout the user
  logout({ dispatch, commit }) {
    let keysToRemove = ["distrital", "user", "provincias", "municipios"];
    userService.logout();
    keysToRemove.forEach((k) => localStorage.removeItem(k));
    commit("logout");
    dispatch("permissions/defaultRole", false, { root: true });
    dispatch("permissions/defaultGroups", [], { root: true });
  },
  // register the user
  registeruser({ dispatch, commit }, user) {
    commit("registerRequest", user);
    userService.register(user).then(
      (user) => {
        commit("registerSuccess", user);
        dispatch("notification/success", "Registration successful", {
          root: true,
        });
        router.push("/login");
      },
      (error) => {
        commit("registerFailure", error);
        dispatch("notification/error", error, { root: true });
      }
    );
  },
};

export const mutations = {
  loginRequest(state, user) {
    state.status = { loggingIn: true };
    state.user = user;
  },
  loginSuccess(state, user) {
    state.status = { loggeduser: true };
    state.user = user;
  },
  loginFailure(state, errors) {
    state.status = {};
    state.user = null;
    state.errors = errors;
  },
  logout(state) {
    state.status = {};
    state.user = null;
  },
  registerRequest(state) {
    state.status = { registering: true };
  },
  registerSuccess(state) {
    state.status = {};
  },
  registerFailure(state) {
    state.status = {};
  },
};

export const getters = {
  loggedIn(state) {
    return !!state.status.loggeduser;
  },
  isCompanyUser(state, getters, rootState, rootGetters) {
    const companyRoles = ["externo-empresa", "externo-persona-natural"];

    return (
      rootGetters["authfack/loggedIn"] &&
      user.profile.groups.filter((value) => companyRoles.indexOf(value) > -1)
        .length > 0
    );
  },
  isProcessorUser(state, getters, rootState, rootGetters) {
    const processorRoles = ["externo-tramitador"];

    return (
      rootGetters["authfack/loggedIn"] &&
      user.profile.groups.filter((value) => processorRoles.indexOf(value) > -1)
        .length > 0
    );
  },
  isExternalUser(state, getters, rootState, rootGetters) {
    const externalRoles = [
      "solicitantes",
      "externo-empresa",
      "externo-persona-natural",
      "externo-tramitador",
      "externo-especial",
    ];

    return (
      rootGetters["authfack/loggedIn"] &&
      user.profile.groups.filter((value) => externalRoles.indexOf(value) > -1)
        .length > 0
    );
  },
  isSenasagUser(state, getters, rootState, rootGetters) {
    const siaRoles = [
      "interno-aprobar-empresas",
      "interno-aprobar-solicitudes",
      "interno-aprobar-tramitadores",
      "interno-sia-vobo",
      "interno-roles",
      "interno-permisos",
      "interno-aprobar-solicitudes",
      "interno-creador-tramite",
      "interno-vobo",
      "interno-sia-vobo",
      "interno-superadmin",
      "interno-sia-nacional",
      "interno-sia-departamental",
      "interno-sia-sistemas-nacional",
      "interno-sia-sistemas-departamental",
      "senasag",
    ];
    return (
      rootGetters["authfack/loggedIn"] &&
      user.profile.groups.filter((value) => siaRoles.indexOf(value) > -1)
        .length > 0
    );
  },
  user(state) {
    return state.user;
  },
  siaErrors: (state) => state.errors,
};
