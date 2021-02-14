<template>
  <div class="summary">
    <Card>
      <Progress />
    </Card>
  </div>
</template>

<script>
import Card from "../components/shared/elements/Card.vue";
import Progress from "../components/shared/Progress.vue";

export default {
  name: "Home",
  components: { Card, Progress },
};
</script>

<style lang="scss" scoped>
.summary {
}
</style>
