import axios from '@/services/axios'

export const state = {
    profiles: {}
}

export const getters = {
    getProfile : (state) => (id) =>{
        return state.profiles[id] || {};
    }
}
export const mutations = {
    SET_PROFILE(state, { id , data }){
        state.profiles[id] = data;
    }
}

export const actions = {
    fetchProfile({ commit, state } , id){
        return state.profiles[id] && state.profiles[id].__expire_at > Date.now() && state.profiles[id]  || axios
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
}

export const mappers = {
    mapProfile(profile){
        let data = {}; ["followers_count","followers_count","likes_count","comments_count","submissions_count"].forEach(key=> data[key] = profile[key]);
        return {
            ...data,
            __expire_at: Date.now()  + 1000 * 60 * 3 // 3min
        }
    }
}