import config from "../common/config";

export default function log({ next, to }) {
    if (!config.isProd) {
        console.log(to);
    }

    return next();
}