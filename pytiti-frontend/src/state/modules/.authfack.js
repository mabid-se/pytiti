import { loginService, logoutService } from '@/services/auth';
import { clearToken, saveToken } from '@/services/token';
import router from '../../router/index'

const user = localStorage.getItem("access_token");

export const state = user ? { status: { loggeduser: true } } : { status: {} };

export const actions = {
    // Logs in the user.
    // eslint-disable-next-line no-unused-vars
    login({ dispatch, commit }, { email, password }) {

        commit('loginRequest', { email });
        console.log(email);
        loginService({user: email, password: password})
            .then(
                user => {
                    commit('loginSuccess', user);
                    //router.push('/');
                    this.$router.push('/');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('notification/error', error, { root: true });
                }
            );
    },
    // Logout the user
    logout({ dispatch, commit }) {
        logoutService()
            .then(
                res => {
                    console.log(res);
                    commit('logout');
                },
                error => {
                    dispatch("notification/error", error, { root: true})
                }
            );
    },
    // register the user
    // registeruser({ dispatch, commit }, user) {
    //     commit('registerRequest', user);
    //     loginService.register(user)
    //         .then(
    //             user => {
    //                 commit('registerSuccess', user);
    //                 dispatch('notification/success', 'Registration successful', { root: true });
    //                 router.push('/login');
    //             },
    //             error => {
    //                 commit('registerFailure', error);
    //                 dispatch('notification/error', error, { root: true });
    //             }
    //         );
    // }
};

export const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggeduser: true };
        state.user = user.profile.email;
        // store jwt-token
        saveToken(user.session.access_token);
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
        // clear existent jwt-token
        clearToken();
    },
    // registerRequest(state) {
    //     state.status = { registering: true };
    // },
    // registerSuccess(state) {
    //     state.status = {};
    // },
    // registerFailure(state) {
    //     state.status = {};
    // }
};
