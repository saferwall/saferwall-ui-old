<template>
  <!-- <upload-file /> -->
  <latest-activities :activities="getActivities" />
</template>

<script>
import LatestActivities from '@/common/components/LatestActivities.vue'
// import UploadFile from '@/common/components/UploadFile.vue'
import { activitiesGetters, activitiesMethods } from '@/state/helpers';

export default {
  components:  {
    // UploadFile,
    LatestActivities
  },
  computed: {
    ...activitiesGetters
  },
  methods: {
    ...activitiesMethods
  },
  created(){
    this.fetchActivities();
  }
}
</script>