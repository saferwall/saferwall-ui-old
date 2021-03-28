<template>
<div class="summary">
    <Card>
        <Progress />
    </Card>

    <Card title="Basic Properties">
        <TableCols :striped="true" :lines="[{title:'Size', value:'1 MB'} ,{title:'CRC32', value:'CRC320xa12a8ab6'}]" />
    </Card>

    <Card title="ExifTool File Metadata">
        <TableCols :striped="true" :lines="[{title:'Character Set', value:'ASCII'} ,{title:'Code Size', value:'24064'}]" />
    </Card>

    <Card title="Submissions">
        <TableCols :bordered="true" :columns="[{title:'Published'}, {title:'Name'} , {title:'Source'} , {title:'Country'}]" :lines="submissions" />
    </Card>

    <Card title="Indicators">
        <TableCols :bordered="true" :columns="[{title:'Description'}, {title:'Severity'} , {title:'Category'} , {title:'Module'}]" :lines=" [
            ['Quoniam mirari posse quosdam','<strong class=\'bg-danger px-4 py-2 rounded-md text-light\'>Malicious</strong>','Anti detection','Quoniam mirari posse quosdam'],
            ['alias, summatim causas perstringam','<strong class=\'bg-warning px-4 py-2 rounded-md text-light\'>Suspicious</strong>','Stealthymes','alias, summatim causa'],
            ['veritate sponte propria digress','<strong class=\'bg-success px-4 py-2 rounded-md text-light\'>Informative</strong>','Anti detection','veritate sponte propria '],
          ]" />
    </Card>

    <Card title="Virtual Screen">
        <Gallery :images="[{ source: 'https://picsum.photos/800/350?i='+Math.random() } , { source: 'https://picsum.photos/800/350?i='+Math.random() } , { source: 'https://picsum.photos/800/350?i='+Math.random() } , { source: 'https://picsum.photos/800/350?i='+Math.random() } ,  { source: null } , { source : null } , { source: null } , { source : null }]" />
    </Card>
</div>
</template>

<script>
import Card from "@/common/components/elements/Card.vue";
import Progress from "@/common/components/Progress.vue";
import TableCols from "@/common/components/tables/TableCols.vue";
import Gallery from "@/common/components/tables/Gallery.vue";

import { submission } from '@/common/data/data.test';

export default {
    components: {
        Card,
        Progress,
        TableCols,
        Gallery
    },
    data(){
      return {
        submissions : submission({
          examples : 10
        })
      }
    }
};
</script>

<style lang="scss" scoped>
.summary {
    .card {
        @apply my-5;
    }
}
</style>
