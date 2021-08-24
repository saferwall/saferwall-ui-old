import axios from '@/services/axios'

const setup = (store) => {
    axios.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            if (err.response.status === 401) {
                store.commit('auth/LOGOUT');
            }

            return Promise.reject(err);
        }
    );
};

export default setup;
