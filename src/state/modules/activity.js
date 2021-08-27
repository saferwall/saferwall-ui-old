import axios from '@/services/axios'

export const state = {
    activities: [],
    pagination: {
        page: 0,
        pages: 0,
        rows: 0,
        total: 0
    }
}

export const getters = {
    getActivities(state) {
        return state.activities;
    },
    getPagination(state) {
        return state.pagination;
    }
}
export const mutations = {
    SET_ACTIVITIES(state, data) {
        state.activities = data;
    },
    SET_PAGINATION(state, data) {
        state.pagination = { ...state.pagination, ...data };
    }
}

export const actions = {
    fetchActivities({ commit, getters }, { pagination } = { pagination: { page: 0, rows: 10 } }) {
        let params = {
            per_page: pagination.rows,
            page: pagination.page
        };

        return axios
            .get('users/activities', {
                params
            })
            .then(response => {

                let data = response.data;
                commit('SET_ACTIVITIES', data.items);

                commit('SET_PAGINATION', {
                    page: data.page,
                    pages: data.page_count,
                    limit: data.per_page,
                    total: data.total_count,
                });

                return {
                    activities: getters.getActivities,
                    pagination: getters.getPagination,
                };
            });
    },
}
