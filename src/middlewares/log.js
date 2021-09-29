export default function log({ next, to }) {
    console.log(to);

    return next();
}