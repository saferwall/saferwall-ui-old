import axios from '@/services/axios'

export const fields = {
    file: ['sha256', 'size', 'comments_count', 'submissions'],
    summary: [],
    avs: ['multiav'],
    pe: ['pe'],
}

export const state = {
    file: null,
    summary: {},
    comments: [],
    avs: {},
    pe: {},
}


export const getters = {
    getFile(state) {
        return state.file;
    },
    getFileSummary(state) {
        return state.summary;
    },
    getFileComments(state) {
        return state.comments;
    },
    getFileAvs(state) {
        return state.avs;
    },
    getFilePE(state) {
        return state.pe;
    }
}

export const mutations = {
    SET_FILE(state, file) {
        state.file = file;
    },
    SET_FILE_COMMENTS(state, comments) {
        state.comments = comments;
    },
    SET_FILE_SUMMARY(state, file) {
        state.summary = file;
    },
    SET_FILE_AVS(state, avs) {
        state.avs = { first_scan: [], last_scan: [], ...avs };
    },
    SET_FILE_PE(state, pe) {
        state.pe = pe;
    }
}


export const actions = {
    async fetchFile({ commit }, id) {
        return axios.get(`/files/${id}?fields=` + fields.file.join(','))
            .then(res => {
                let data = res.data;
                data.lastupdate = (data.submissions || []).reduce((bg, sub) => {
                    if (sub.timestamp > bg) return sub.timestamp;
                    return bg;
                }, 0);

                commit('SET_FILE', data);
                return data;
            });
    },
    async fetchFileSummary({ commit }, id) {
        return axios.get(`/files/${id}/summary`)
            .then(res => {
                let data = res.data;

                commit('SET_FILE_SUMMARY', data);
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
    }
}
