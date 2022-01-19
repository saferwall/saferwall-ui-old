import axios from '@/services/axios'

export const fields = {
    avs: ['multiav'],
    pe: ['pe'],
}

export const state = {
    file: null,
    comments: [],
    avs: {},
    pe: {},
    refresh: false
}


export const getters = {
    getFile(state) {
        return state.file;
    },
    getFileComments(state) {
        return state.comments;
    },
    getFileAvs(state) {
        return state.avs;
    },
    getFilePE(state) {
        return state.pe;
    },
    getRefrehStatus(state) {
        return state.refresh;
    }
}

export const mutations = {
    SET_FILE(state, file) {
        state.file = file;
    },
    SET_FILE_COMMENTS(state, comments) {
        state.comments = comments;
    },
    SET_FILE_AVS(state, avs) {
        state.avs = { first_scan: [], last_scan: [], ...avs };
    },
    SET_FILE_PE(state, pe) {
        state.pe = pe;
    },
    SET_REFRESH_STATUS(state, refresh) {
        state.refresh = refresh;
    }
}


export const actions = {
    async fetchFile({ commit }, id) {
        return axios.get(`/files/${id}/summary`)
            .then(res => {
                let data = res.data;
                data.lastupdate = (data.submissions || []).reduce((bg, sub) => {
                    if (sub.timestamp > bg) return sub.timestamp;
                    return bg;
                }, 0);

                commit('SET_FILE', data);
                commit('SET_REFRESH_STATUS', false);
                return data;
            });
    },
    async fetchFileAvs({ commit }, id) {
        return axios.get(`/files/${id}?fields=` + fields.avs.join(','))
            .then(res => {
                let data = res.data;

                commit('SET_FILE_AVS', data.multiav);
                return data;
            });
    },
    async fetchFilePE({ commit }, id) {
        return axios.get(`/files/${id}?fields=` + fields.pe.join(','))
            .then(res => {
                let data = res.data;

                commit('SET_FILE_PE', data.pe);
                return data.pe;
            });
    },
    async fetchFileComments({ commit }, id) {
        return axios.get(`/files/${id}/comments`)
            .then(res => {
                let data = res.data.items || [];

                commit('SET_FILE_COMMENTS', data);
                return data;
            });
    },
    updateRefreshStatus({ commit }, refresh) {
        commit('SET_REFRESH_STATUS', refresh);
    }
}
