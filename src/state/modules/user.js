import axios from '@/services/axios'

export const state = {
    user : {},
    profiles: {}
}

export const getters = {
    getProfile : (state) => (id) =>{
        return id && state.profiles[id] || state.user;
    }
}
export const mutations = {
    SET_PROFILE(state, { id , data }){
        state.profiles[id] = data;
    },
    SET_CURRENT_PROFILE(state, data){
        state.user = data;
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
    fetchCurrentUser({ commit, state }, username){
        return state.user && state.user.__expire_at > Date.now() && state.user  || axios
        .get(`users/${username}`)
        .then(response => {
            let data = response.data;
            commit('SET_CURRENT_PROFILE', {
                username: username,
                data: mappers.mapUser(data),
                __expire_at: Date.now()  + 1000 * 60 * 3 // 3min
            });
            return data;
        }); 
    }
}

export const mappers = {
    mapProfile(profile){
        let data = {}; ["followers_count","followers_count","likes_count","comments_count","submissions_count"].forEach(key=> data[key] = profile[key]);
        return {
            ...data,
            __expire_at: Date.now()  + 1000 * 60 * 3 // 3min
        }
    },
    mapUser(user){
        let data = user;
        return {
            ...data,
            __expire_at: Date.now()  + 1000 * 60 * 3 // 3min
        }
    }
}