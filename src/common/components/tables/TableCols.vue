<template >
    <table :class="(striped ? ' striped':'') + (bordered ? ' bordered':'')">
        <thead>
            <th v-for="col in columns" v-bind:key="col">
                {{ col.title }}
            </th>
        </thead>
        <tbody>
            <tr v-for="line in lines" v-bind:key="line">
                <td v-for="val in line" v-bind:key="val" v-html="val"></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name:'TableCols',
        props :{
            columns : Object,
            lines : Object,
            striped: Boolean,
            bordered: Boolean,
        }
    }
</script>

<style lang="scss" scoped>
table{
    @apply m-3 mt-8 w-full;
    th {
        @apply text-gray uppercase text-left;
    }
    tr {
        @apply w-full;
        
      
    }
    
    td , th{
        @apply px-3 py-3 ;
    }
    td:nth-child(2n){
        @apply text-gray font-normal;
    }

    &.striped {
        tr{
            @apply font-semibold;
        }

        td:nth-child(2n){
            @apply text-gray ;
        }

        tr:nth-child(odd){
            background: #F6F6F6;
        }

    }

    &.bordered{
        tr{
            border-top: solid 1px #F6F6F6;
        }

    }
}
</style>