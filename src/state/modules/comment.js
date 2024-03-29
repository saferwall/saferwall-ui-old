import axios from '@/services/axios'

export const actions = {
    commentFile: function (_, { sha256, body }) {
        return axios.post(`/comments`, { sha256, body })
            .then(({ data }) => {
                return data;
            })
    },
    deleteComment: function (_, id) {
        return axios.delete(`/comments/${id}`)
            .then(({ data }) => {
                return data;
            })
    }
}