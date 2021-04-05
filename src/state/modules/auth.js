import axios from '@/services/axios'
import router from '@/router'
import jwtDecode from 'jwt-decode'
import { getSavedState, saveState, clearState } from '@/common/utils/local-storage';


export const state = {
  session: getSavedState('auth.session'),
}

export const mutations = {
  SET_CURRENT_SESSION(state, session) {
    if (session === null) {
      clearState('auth.session');
    } else {

      try {
        state.session = jwtDecode(session.token);
        state.session.token = session.token;
      } catch (e) {
          console.warn('Token decode failed' , session)
      }

      saveState('auth.session', state.session)
      setDefaultAuthHeaders(state)
    }
  },
  LOGOUT(state) {
    clearState('auth.session');
    state.session = null;
    router.push('/auth/login');
  }
}

export const getters = {
  // Whether the session is currently logged in.
  loggedIn(state) {
    return !!state.session && !this.tokenExpired(state.session.token);
  },
  tokenExpired(state) {
    if (state.session == null || state.session.token == null) {
      return true;
    }

    let token = state.session.token;

    try {
      let dt = jwtDecode(token);
      return !dt || dt.exp - (Date.now() / 1000) <= 0;
    } catch (e) {
      // jwtDecode failed
      console.warn(e, token);
    }
    return true;
  }
}

export const actions = {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  init({ state, dispatch }) {
    setDefaultAuthHeaders(state)
    dispatch('validate')
  },

  // Logs in the current session.
  logIn({ commit, dispatch, getters }, { email, password } = {}) {
    if (getters.loggedIn) return dispatch('validate')

    return axios
      .post('/auth/login/', { email, password })
      .then((response) => {
        const session = response.data.token;
        commit('SET_CURRENT_SESSION', session)
        // dispatch('profile/updateProfile', null, { root: true });
        return session
      })
  },

  // Validates the current session's token and refreshes it
  // with new data from the API.
  validate({ state }) {
    if (!state.session) return Promise.resolve(null)
  },
}

function setDefaultAuthHeaders(state) {
  axios.defaults.headers.common.Authorization = state.session
    ? `Bearer ${state.session.token}`
    : ''
}
