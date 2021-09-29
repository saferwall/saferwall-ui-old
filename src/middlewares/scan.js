import { createToast } from 'mosha-vue-toastify';

export default async ({ store, to, next }) => {
    let fileHash = to.params.id;

    let selectedFile = await store.getters['scan/getFile'];

    if (!selectedFile || selectedFile.sha256 != fileHash) {
        selectedFile = store.dispatch('scan/fetchFile', fileHash);

        await selectedFile.catch(err => {
            if (err) {
                createToast(err.response.status == 404 && 'File not found' || err.message, { type: 'danger', position: 'bottom-right' });

                return next({ path: '/' })
            }
            return next();
        });

        return next();
    }

    return next();
}