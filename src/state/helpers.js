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
const userGetters = mapGetters('user' , ['getProfile']);
const userMethods = mapActions('user' , ['fetchProfile']);

/**
 * Authentification
 * Methods
 */
const authGetters = mapGetters('auth',['loggedIn']);
const authMethods = mapActions('auth',['logIn']);

export {
    activityGetters, activityMethods,
    userGetters, userMethods,
    authGetters ,authMethods
}