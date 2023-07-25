export const state = {
    siadata: [],
    sia_is_system: false,
};

export const getters = {
    siaData: state => state.siadata,
    siaUserIsSystem: state => state.sia_is_system,
};

export const mutations = {
    SETSIA(state, newValue) {
        state.siadata = newValue
    },
    SET_USER_SIA_SISTEMAS(state, value) {
        state.sia_is_system = value;
    }
};

export const actions = {
    setSiaData({ commit }, ciadata) {
        commit("SETSIA", ciadata);
    },
    setSiaSytem({ commit}, value) {
        commit("SET_USER_SIA_SISTEMAS", value);
    },
};
