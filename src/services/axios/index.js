import axios from 'axios'
import APP_CONFIGS from "@/common/config";

export default axios.create({
    baseURL: APP_CONFIGS.apiURL,
})
