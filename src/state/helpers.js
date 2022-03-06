import { mapActions, mapGetters } from "vuex";

/**
 * Activity
 * Methods , Getters
 */
const activityGetters = mapGetters('activity', ['getActivities']);
const activityMethods = mapActions('activity', ['fetchActivities']);

/**
 * User
 * Methods, Getters
 */
const userGetters = mapGetters('user', ['getProfile', 'getUser', 'getUsername']);
const userMethods = mapActions('user', [
    'fetchProfile',
    'getSection',
    'fetchSection',
    'updateProfile',
    'updateAvatar',
    'updateEmail',
    'updatePassword'
]);

/**
 * Authentification
 * Methods
 */
const authGetters = mapGetters('auth', ['loggedIn']);
const authMethods = mapActions('auth', ['logIn', 'register', 'resetPassword', 'savePassword']);

/**
 * Actions
 */
const fileActions = mapActions('actions', ['doLike', 'doUnLike']);
const followActions = mapActions('actions', ['doFollow', 'doUnFollow']);

/**
 * file
 */
const fileMethods = mapActions('file', [
    'fetchFile',
    'fetchFileComments',
    'fetchFileAvs',
    'fetchFilePE',
    'rescanFile',
    'updateRefreshStatus'
]);
const fileGetters = mapGetters('file', [
    'getFile',
    'getFile',
    'getFileComments',
    'getFileAvs',
    'getFilePE',
]);

/**
 * upload
 */
const uploadMethods = mapActions('upload', [
    'uploadFile',
]);
const uploadGetters = mapGetters('upload', [
    'getFile',
    'uploadProgress',
    'isUploading',
    'getStep'
]);


export {
    activityGetters, activityMethods,
    userGetters, userMethods,
    authGetters, authMethods,
    fileActions, followActions,
    fileMethods, fileGetters,
    uploadMethods, uploadGetters
}