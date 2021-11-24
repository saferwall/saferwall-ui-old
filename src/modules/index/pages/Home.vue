<template>
  <upload-file />
  <latest-activities />
</template>

<script>
import UploadFile from "@/common/components/UploadFile.vue";
import LatestActivities from "@/common/components/LatestActivities.vue";

export default {
  components: {
    UploadFile,
    LatestActivities,
  },
};
</script>