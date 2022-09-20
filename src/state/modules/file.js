import axios from '@/services/axios'

export const fields = {
    avs: ['multiav', 'first_seen', 'last_scanned'],
    pe: ['pe.meta'],
}

export const state = {
    file: null,
    sha256: null,
    comments: [],
    avs: {
        multiav: {
            first_scan: [], last_scan: []
        }
    },
    pe: {},
    refresh: false
}


export const getters = {
    getFile(state) {
        return state.file;
    },
    getSha256(state) {
        console.log('yes ok bb');
        return state.sha256;
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
        state.avs = {
            multiav: {
                first_scan: [], last_scan: []
            }, ...avs
        };
    },
    SET_FILE_PE(state, pe) {
        state.pe = pe;
    },
    SET_REFRESH_STATUS(state, refresh) {
        state.refresh = refresh;
    },
    ADD_FILE_COMMENT(state, comment) {
        state.comments.push(comment);
    },
}


export const actions = {
    updateFile({ commit }, file) {
        return commit('SET_FILE', file);
    },
    async rescanFile({ commit }, sha256) {
        return axios.post(`/files/${sha256}/rescan`)
            .then(({ data }) => {

                commit('SET_REFRESH_STATUS', true);
                return data;
            })
    },
    async fetchFile({ commit }, sha256) {
        return axios.get(`/files/${sha256}/summary`)
            .then(({ data }) => {
                data.lastupdate = (data.submissions || []).reduce((bg, sub) => {
                    if (sub.timestamp > bg) return sub.timestamp;
                    return bg;
                }, 0);

                commit('SET_FILE', data);
                commit('SET_REFRESH_STATUS', false);
                return data;
            });
    },
    async fetchFileAvs({ commit }, sha256) {
        return axios.get(`/files/${sha256}?fields=` + fields.avs.join(','))
            .then(({ data }) => {

                commit('SET_FILE_AVS', data);
                return data;
            });
    },
    async fetchFilePE({ commit }, sha256) {
        state.sha256 = sha256;
        return axios.get(`/files/${sha256}?fields=` + fields.pe.join(','))
            .then(({ data }) => {

                commit('SET_FILE_PE', data.pe);
                return data.pe;
            });
    },
    async setFilePE({ commit }, data) {
        commit('SET_FILE_PE', data.pe);
    },
    async fetchFileComments({ commit }, sha256) {
        return axios.get(`/files/${sha256}/comments`)
            .then(({ data }) => {
                data = data || [];

                commit('SET_FILE_COMMENTS', data);
                return data;
            });
    },
    updateRefreshStatus({ commit }, refresh) {
        commit('SET_REFRESH_STATUS', refresh);
    }
}
