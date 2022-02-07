import axios from '@/services/axios'

const setup = ({ router }) => {
    axios.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            if (err.response && err.response.status === 401) {
                return router.push({ path: '/auth/login' });
            }

            return Promise.reject(err);
        }
    );
};

export default setup;
