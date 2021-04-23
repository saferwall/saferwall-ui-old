import { mapActions, mapGetters } from "vuex";

/**
 * Activity
 * Methods , Getters
 */
const activityGetters = mapGetters('activity' , ['getActivities']);
const activityMethods = mapActions('activity', ['fetchActivities']);

/**
 * User
 * Methods, Getters
 */
const userGetters = mapGetters('user' , ['getProfile' , 'getSection', 'getUser']);
const userMethods = mapActions('user' , ['fetchProfile', 'fetchSection']);

/**
 * Authentification
 * Methods
 */
const authGetters = mapGetters('auth',['loggedIn']);
const authMethods = mapActions('auth',['logIn' , 'register']);

/**
 * Actions
 */
const fileActions = mapActions('actions', ['doLike','doUnLike']);
const followActions = mapActions('actions', ['doFollow','doUnFollow']);

export {
    activityGetters, activityMethods,
    userGetters, userMethods,
    authGetters, authMethods,
    fileActions, followActions
}