import axios from '@/services/axios'
import { createToast } from 'mosha-vue-toastify';

const onCatchError = (err) => {
    createToast(err.response.data && err.response.data.message || err.message || "Update faild ! try again", { type: "danger", position: "bottom-right" });
}

export const state = {
    user: {},
    profiles: {},
    activities: {}
}

export const getters = {
    getUser(state) {
        return state.user;
    },
    getProfile: (state) => (id) => {
        return id && state.profiles[id] || state.user;
    }
}

export const mutations = {
    SET_PROFILE(state, { id, data }) {
        state.profiles[id] = data;
    },
    SET_CURRENT_PROFILE(state, data) {
        state.user = data;
    },
    SET_SECTION_LIST(state, { username, section, data }) {
        state.activities[username] = {};
        state.activities[username][section] = data;
    },
    UPDATE_PROFILE(state, data) {
        state.user = { ...state.user, ...data };
    }
}

export const actions = {
    fetchProfile({ commit, state }, id) {
        return state.profiles[id] && state.profiles[id].__expire_at > Date.now() && state.profiles[id] || axios
            .get(`users/${id}`)
            .then(response => {
                let data = response.data;
                commit('SET_PROFILE', {
                    id: id,
                    data: mappers.mapProfile(data)
                });
                return data;
            });
    },
    fetchCurrentUser({ commit, state }, username) {
        return state.user && state.user.__expire_at > Date.now() && state.user || axios
            .get(`users/${username}`)
            .then(response => {
                let data = response.data;
                commit('SET_CURRENT_PROFILE', {
                    username: username,
                    ...data,
                    __expire_at: Date.now() + 1000 * 60 * 3 // 3min
                });
                return data;
            });
    },
    updateProfile({ commit, state }, data) {
        let user = state.user;

        return axios.patch(`users/${user.username}`, data)
            .then(response => {
                let data = response.data;

                commit('UPDATE_PROFILE', {
                    ...data,
                    __expire_at: Date.now() + 1000 * 60 * 3 // 3min
                });

                createToast('Profile updated successfully !', { type: "success", position: "bottom-right" });

                return response;
            }).catch((err) => {
                createToast(
                    err.response.data && err.response.data.message || err.message || "Update faild ! try again",
                    { type: "danger", position: "bottom-right" }
                );
            });
    },
    updateEmail({ commit, state }, { email, password }) {
        let user = state.user;

        return axios.patch(`users/${user.username}/email`, { email, password })
            .then(resp => {
                let data = resp.data;

                commit('UPDATE_PROFILE', {
                    ...data,
                    __expire_at: Date.now() + 1000 * 60 * 3 // 3min
                });

                createToast('Email updated successfully !', { type: "success", position: "bottom-right" });
            }).catch(onCatchError);
    },
    updateAvatar({ state }, avatar) {
        let user = state.user;

        let form = new FormData();
        form.append('file', avatar);

        return axios.post(`users/${user.username}/avatar`, form)
            .then(() => createToast('Profile avatar updated successfully !', { type: "success", position: "bottom-right" }))
            .catch(onCatchError);
    },
    updatePassword({ state }, { password, newpassword }) {
        let user = state.user;

        return axios.patch(`users/${user.username}/password`, { old: password, new: newpassword })
            .then(() => { createToast('Password updated successfully !', { type: "success", position: "bottom-right" }); return true })
            .catch(() => { createToast("Invalid password !", { type: "danger", position: "bottom-right" }); return false });
    }
}

export const mappers = {
    mapProfile(profile) {
        let data = {};
        [
            "following_count",
            "followers_count",
            "likes_count",
            "comments_count",
            "submissions_count",
            ...Object.keys(profile)
        ].forEach(key => data[key] = profile[key]);

        return {
            ...data,
            __expire_at: Date.now() + 1000 * 60 * 3 // 3min
        }
    },
}