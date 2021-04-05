import { mapActions, mapGetters } from "vuex";

/**
 * Activity
 * Methods , Getters
 */
const activityGetters = mapGetters('activity' , ['getActivities']);
const activityMethods = mapActions('activity', ['fetchActivities']);

const userGetters = mapGetters('user' , ['getProfile']);
const userMethods = mapActions('user' , ['fetchProfile']);

export {
    activityGetters, activityMethods,
    userGetters, userMethods
}