<template>
  <upload-file />
  <latest-activities />
</template>

<script>
import LatestActivities from '../components/shared/LatestActivities.vue'
import UploadFile from '../components/shared/UploadFile.vue'

export default {
  components:  {
    UploadFile,
    LatestActivities
  }
}
</script>