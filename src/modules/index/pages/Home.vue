<template>
  <upload-file />
  <latest-activities />
</template>

<script>
import LatestActivities from '@/common/components/LatestActivities.vue'
import UploadFile from '@/common/components/UploadFile.vue'

export default {
  components:  {
    UploadFile,
    LatestActivities
  }
}
</script>