import axios from '@/services/axios'

const setup = async ({ store }) => {
    axios.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            if (err.response && err.response.status === 401) {
                await store.dispatch('auth/logOut', false);
            }

            return Promise.reject(err);
        }
    );
};

export default setup;
