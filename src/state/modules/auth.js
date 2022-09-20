import axios from '@/services/axios'
import router from '@/router'
import jwtDecode from 'jwt-decode'
import APP_CONFIGS from '../../common/config';
import { getSavedState, saveState, clearState } from '@/common/utils/local-storage';


export const state = {
  session: getSavedState('auth.session'),
}

export const mutations = {
  SET_SESSION(state, session) {
    if (session === null) {
      state.session = null;
      setDefaultAuthHeaders(state);
      return clearState('auth.session');
    }

    try {
      state.session = jwtDecode(session.token);
      state.session.token = session.token;
    } catch (e) {
      console.warn('Token decode failed', session)
    }

    let sessionState = Object.assign({}, state.session);

    if (APP_CONFIGS.isProd) {
      delete sessionState.token;
    }

    setDefaultAuthHeaders(state);
    saveState('auth.session', sessionState)
  },
  LOGOUT(state, logout) {
    mutations.SET_SESSION(state, null);

    if (logout === true) {
      router.go('/auth/login');
    }
  }
}

export const getters = {
  // Whether the session is currently logged in.
  loggedIn(state) {
    return state.session != null && !getters.tokenExpired(state);
  },
  tokenExpired(state) {
    if (state.session == null) {
      return true;
    }

    if (state.session.exp > (Date.now() / 1000)) {
      return false;
    }

    let dt, token = state.session.token;

    if (!token) {
      try {
        dt = jwtDecode(token);
        return !dt || dt.exp - (Date.now() / 1000) <= 0;
      } catch (e) {
        // jwtDecode failed
        console.warn(e, token);
      }
    }

    return true;
  },
  getUsername(state) {
    return state.session.id;
  }
}

export const actions = {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  init({ dispatch, state }) {
    setDefaultAuthHeaders(state);

    dispatch('validate')
  },

  // Logs in the current session.
  logIn({ commit, dispatch, getters }, { username, password } = {}) {
    if (getters.loggedIn) return dispatch('validate')

    return axios
      .post('/auth/login', { username, password })
      .then(async (response) => {
        const session = response.data;
        commit('SET_SESSION', session)

        return await dispatch('user/fetchCurrentUser', username, { root: true });
      })
  },

  resetPassword(_, { email } = {}) {
    return axios
      .post('/auth/reset-password', { email })
      .then((response) => {
        return response.data;
      })
  },

  resendConfirmation(_, { email } = {}) {
    return axios
      .post('/auth/resend-confirmation', { email })
      .then((response) => {
        return response.data;
      })
  },

  savePassword(_, { guid, token, password } = {}) {
    return axios
      .post('/auth/password', { guid, token, password })
      .then((response) => {
        return response.data;
      })
  },

  // Logs in the current session.
  register({ dispatch, getters }, { username, email, password } = {}) {
    if (getters.loggedIn) return dispatch('validate')

    return axios
      .post('/users', { username, email, password })
      .then((response) => {
        return response.data;
      })
  },

  logOut({ commit }, redirect = true) {
    return axios
      .delete('/auth/logout')
      .then(() => {
        commit('LOGOUT', redirect);
      });
  },

  // Validates the current session's token and refreshes it
  // with new data from the API.
  validate({ state, dispatch }) {
    if (!getters.loggedIn(state)) return Promise.resolve(null)

    dispatch('user/fetchCurrentUser', state.session.id, { root: true });
    return Promise.resolve(state.session);
  },
}

function setDefaultAuthHeaders(state) {
  if (APP_CONFIGS.isProd) return;

  if (state.session && state.session.token) {
    return axios.defaults.headers.common.Authorization = `Bearer ${state.session.token}`
  }

  delete axios.defaults.headers.common.Authorization;
  return;
}
