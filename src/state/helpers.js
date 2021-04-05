import { mapActions, mapGetters } from "vuex";

const activitiesGetters = mapGetters('activities' , ['getActivities']);
const activitiesMethods = mapActions('activities', ['fetchActivities']);


export {
    activitiesGetters, activitiesMethods
}