import axios from "@/services/axios";

const step = {
    UPLOADING: {
        title: 'Uploading',
        value: 0
    },
    UPLOADED: {
        title: 'Uploaded',
        value: 1
    },
    QUEUED: {
        title: 'Queueing',
        value: 2
    },
    PROCESSING: {
        title: 'Processing',
        value: 3
    },
    FINISHED: {
        title: 'Finished',
        value: 4
    },
    READY: {
        title: 'Ready',
        value: 5
    },
}

export const state = {
    file: null,
    uploading: false,
    progress: 0,
    currentStep: step.UPLOADING.value,
}


export const getters = {
    getFile(state) {
        return state.file;
    },
    isUploading(state) {
        return state.uploading
    },
    uploadProgress(state) {
        return state.progress;
    },
    getStep(state) {
        return step[Object.keys(step).find(key => step[key].value == state.currentStep)].title;
    }
}

export const mutations = {
    UPDATE_UPLOAD_STATUS(state, { uploading, progress }) {
        state.uploading = uploading;
        state.progress = Math.round(progress);
    },
    UPDATE_STEP(state, step) {
        state.currentStep = step;
    },
    UPDATE_FILE(state, file) {
        state.file = file;
    }
}

export const actions = {
    async uploadFile({ commit }, file) {
        commit('UPDATE_STEP', step.UPLOADING.value);
        const formData = new FormData();
        formData.append("file", file);
        return axios
            .post('files/', formData, {
                onUploadProgress: function (event) {
                    let progress = (event.loaded / event.total) * 100;

                    commit('UPDATE_UPLOAD_STATUS', { uploading: true, progress });
                },
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(({ data }) => {
                commit('UPDATE_FILE', data);
                commit('UPDATE_STEP', step.UPLOADED.value);

                return data;
            })
            .catch(console.log);
    },
}