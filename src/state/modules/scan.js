import axios from '@/services/axios'

export const fields = {
    file: ['sha256', 'size', 'comments_count', 'submissions'],
    summary: []
}

export const state = {
    file: null,
    summary: {},
    comments: []
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
    async fetchFileComments({ commit }, id) {
        return axios.get(`/files/${id}/comments`)
            .then(res => {
                let data = res.data.items || [];

                commit('SET_FILE_COMMENTS', data);
                return data;
            });
    }
}
