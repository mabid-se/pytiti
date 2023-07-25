import { storeKeyId, clearKeyId } from "@/helpers/senasag/tablas_base";
import { getSelectList } from "@/services/tablas-base";
import { HttpClient } from "@/services/httpClient";

export const state = {
  cities: [],
  provinces: [],
  towns: [],
  rubros: [],
  city: null,
  province: null,
  town: null,
  loading: true,
};

export const mutations = {
  SET_START_DATA(state, { cities, provinces, towns, rubros }) {
    state.cities = cities;
    state.provinces = provinces;
    state.towns = towns;
    state.rubros = rubros;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_CITY(state, setCity) {
    state.city = setCity;
    storeKeyId("iddistrital", setCity);
  },
  SET_PROVINCE(state, setProvince) {
    state.province = setProvince;
    storeKeyId("idprovincia", setProvince);
  },
  SET_TOWN(state, setTown) {
    state.town = setTown;
    storeKeyId("idmunicipio", setTown);
  },
  SET_PROCEDURES(state, procedures) {
    state.procedures = procedures;
  },
  CLEAR_CITY(state) {
    state.city = null;
    clearKeyId("iddistrital");
  },
  CLEAR_PROVINCE(state) {
    state.province = null;
    clearKeyId("idprovincia");
  },
  CLEAR_TOWN(state) {
    state.town = null;
    clearKeyId("idmunicipio");
  },
};

export const actions = {
  fetchCitiesProvincesAndTowns({ commit }) {
    commit("loader/SET_LOADER", true, { root: true });
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
      {
        name: "rubros",
        endpoint: "api/v1/select-options/rubros/",
      },
    ];
    Promise.all(SELECT_APIS.map((api) => getSelectList(api.endpoint))).then(
      ([r1, r2, r3, r4]) => {
        commit("SET_START_DATA", {
          cities: r1.results,
          provinces: r2.results,
          towns: r3.results,
          rubros: r4.results,
        });
        commit("SET_LOADING", false);
        commit("loader/SET_LOADER", false, { root: true });
      }
    );
  },
  fetchProcedures({ commit }) {
    commit("loader/SET_LOADER", true, { root: true });
    const httpClient = new HttpClient();
    httpClient.get("tramites/").then((r1) => {
      commit("SET_PROCEDURES", r1.data.results);
      commit("SET_LOADING", false);
      commit("loader/SET_LOADER", false, { root: true });
    });
  },
  setCity({ commit }, city) {
    commit("SET_CITY", city);
  },
  setProvince({ commit }, province) {
    commit("SET_PROVINCE", province);
  },
  setTown({ commit }, town) {
    commit("SET_TOWN", town);
  },
  clearCity({ commit }) {
    commit("CLEAR_CITY");
  },
  clearProvince({ commit }) {
    commit("CLEAR_PROVINCE");
  },
  clearTown({ commit }) {
    commit("CLEAR_TOWN");
  },
  setProcedures({ commit }, procedures) {
    commit("SET_PROCEDURES", procedures);
  },
};

export const getters = {
  getCities: (state) => {
    return state.cities;
  },
  getProvinces: (state) => {
    if (!state.city) {
      return state.provinces;
    }
    return state.provinces.filter((item) =>
      item.distrital_id.includes(state.city)
    );
  },
  getTowns: (state) => {
    if (!state.city || !state.province) {
      return state.towns;
    }
    return state.towns.filter(
      (item) =>
        item.distrital_id.includes(state.city) &&
        item.provincia_id.includes(state.province)
    );
  },
  getCity: (state) => {
    return state.city;
  },
  getProvince: (state) => {
    return state.province;
  },
  getTown: (state) => {
    return state.town;
  },
};
