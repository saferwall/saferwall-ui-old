export default function log({ next, to }) {
    if (process.env.VUE_APP_ENV == 'dev') {
        console.log(to);
    }

    return next();
}