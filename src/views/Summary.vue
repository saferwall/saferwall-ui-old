<template>
  <Card class="summary">
    <Progress />
  </Card>
</template>

<script>
import Card from '../components/shared/partials/Card.vue';
import Progress from '../components/shared/Progress.vue';

export default 
{
  name: 'Home',
  components: { Card, Progress },
  
}
</script>

<style lang="scss" scoped>
.summary {
  
}
</style>