import axios from '@/services/axios'

export const fields = {
    summary: [

    ]
}

export const state = {
    selectedFile: null
}


export const getters = {
    getFileSummary(state) {
        return state.selectedFile;
    }
}

export const mutations = {
    SET_FILE_SUMMARY(state, file) {
        state.selectedFile = file;
    }
}


export const actions = {
    async fetchFileSummary({ commit }, id) {
        return axios.get(`/files/${id}/summary`)
            .then(res => {
                let data = res.data;

                commit('SET_FILE_SUMMARY', data);
                return data;
            });
    }
}
