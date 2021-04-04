<template>
    <div class="activity md:grid items-center justify-center md:grid-cols-5 md:gap-4  bg-white my-3 md:rounded-xl">
        <div class="header border text-center">
            <router-link to="/profile">
            <avatar :source="avatar"/>
            <div class="info mt-3">
                    <h3 class="text-xl font-bold">{{ author.name }}</h3>
                    <p class="signup text-gray">
                        Member since {{ getJoinedAgo }}
                    </p>
                </div>
            </router-link>
            <div class="buttons mt-3">
                <div :class="follow ? 'active': ''" class="follow inline-grid font-bold text-primary border rounded-md border-gray py-2 w-max px-6 cursor-pointer">
                    {{ follow ? 'UnFollow' :'Follow' }}
                </div>
            </div>
        </div>
        <div class="activity-content col-span-4 grid md:grid-cols-4">
            <div class="info col-span-3 mr-10">
                <p class="title">
                    <b>{{ author.name }}</b> submitted a file <span class="text-sm">{{ getSubmitionAgo }} ago</span>
                </p>
                <hash-input :hash="hash" class="mt-4"></hash-input>
                <file-meta :filename="file.name" :classification="file.classification" :scan="file.scan"  />
            </div>
            <div class="tags">
                <h3>Tags</h3>
                <ul class="list flex flex-wrap">
                    <li v-for="tag in getTags" v-bind:key="tag.link">
                        <a :href="tag.link" :title="tag.title">{{ tag.title }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { timeAgo } from '@/helpers/time.js';
import HashInput from './HashInput.vue';
import FileMeta from './FileMeta.vue';
import Avatar from './Avatar.vue';

export default {
    components: {HashInput, Avatar, FileMeta},
    props: {
        hash: {
            type: String,
            required: true
        },
        author : {
            default: function(){
                return {
                    name: null,
                    joined_at: 0
                }
            },
            type: Object
        },
        file : {
            default : function(){
                return {
                    name: null,
                    classification: {
                        name: null,
                        icon : null
                    },
                    scan : {
                        value: 0,
                        total: 0
                    },
                    submitted_at: 0
                }
            },
            type: Object
        },
        year : {
            default: 2020,
            type: Number
        },
        avatar : {
            default: '../assets/avatars/user-1.svg',
            type: String
        },
        follow : {
            default : true,
            type: Boolean
        },
        tags : {
            default : function(){
                return [
                ]
            },
            type: Array
        }
    },
    computed: {
        getSubmitionAgo(){
            return timeAgo(this.file.submitted_at);
        },
        getJoinedAgo(){
            return timeAgo(this.author.joined_at);
        },
        getTags(){
            return this.tags;
        }
    }
}
</script>

<style lang="scss" scoped>
.activity {
    > * {
        @apply py-4 px-6 md:p-10;
    }
    .header {
        border:none;
        @apply flex flex-wrap w-full justify-between md:justify-center flex-grow;
    }
    .activity-content  {
        @apply my-3 break-all;

        &,.tags{    
            @apply border-l-0 md:border-l md:border-gray md:border-opacity-10;
        }

        .info{
            .title span{
                @apply text-gray;
            }

        }

        .tags{
            @apply mt-8 mx-0 px-0 md:px-4 w-full ;
            .list li{
                @apply flex py-1 px-2 bg-blue-500 m-1 rounded text-light;
            }
        }
    }
    .buttons {
        .follow{
            border-color: #DEDEDE;
           &.active{
               @apply bg-primary bg-opacity-10 border-none;
            }
        }
    }
}
</style>