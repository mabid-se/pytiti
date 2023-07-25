import { 
    userIsAdmin as userIsAdminService, 
    userGroups as userGroupsService,
    userIsCompany as userIsCompanyService,
    userIsPerson as userIsPersonService,
    userIsProcessor as userIsProcessorService,
    userIsCreator as userIsCreatorService
} from "@/services/user";

const userStorage = JSON.parse(localStorage.getItem("user"));

export const namespaced = true;

export const state = {
    is_admin: userStorage ? userIsAdminService() : false,
    groups: userStorage ? userGroupsService() : [],
    is_company: userStorage ? userIsCompanyService() : false,
    is_person: userStorage ? userIsPersonService() : false,
    is_processor: userStorage ? userIsProcessorService() : false,
    is_creator: userStorage ? userIsCreatorService() : false,
}

export const mutations = {
    SET_USER_ROLE(state, setRole) {
        state.is_admin = setRole;
    },
    SET_USER_GROUPS(state, setGroups) {
        state.groups = setGroups;
    },
    SET_USER_DEFAULT_ROLE(state, defaultRole) {
        state.is_admin = defaultRole;
    },
    SET_USER_DEFAULT_GROUPS(state, defaultGroups) {
        state.groups = defaultGroups;
    }
}

export const actions = {
    setRole({ commit}, userRole) {
        commit("SET_USER_ROLE", userRole);
    },
    setGroups({ commit }, userGroups) {
        commit("SET_USER_GROUPS", userGroups);
    },
    defaultRole({ commit }, defaultRole) {
        commit("SET_USER_DEFAULT_ROLE", defaultRole);
    },
    defaultGroups({ commit }, defaultGroups) {
        commit("SET_USER_DEFAULT_GROUPS", defaultGroups);
    }
}

export const getters = {
    userIsAdmin: state => {
        return state.is_admin;
    },
    userGroups: state => {
        return state.groups;
    },
    userIsCompany: state => {
        return state.is_company;
    },
    userIsPerson: state => {
        return state.is_person;
    },
    userIsProcessor: state => {
        return state.is_processor;
    },
    userIsCreator: state => {
        return state.is_creator;
    }
}