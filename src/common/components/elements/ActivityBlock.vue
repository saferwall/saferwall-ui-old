<template>
    <div class="activity md:grid items-center justify-center md:grid-cols-5 md:gap-4  bg-white my-3 md:rounded-xl">
        <div class="header border text-center">
            <avatar :source="avatar"/>
            <div class="info mt-3">
                <h3 class="text-xl font-bold">{{ author.name }}</h3>
                <p class="signup text-gray">
                    Member since {{ getJoinedAgo }}
                </p>
            </div>
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
                <hash-input :hash="hash"></hash-input>

                <div class="meta mt-10 flex flex-wrap space-x-4 xl:space-x-6 justify-between">
                    <div>
                        <h4>Classification</h4>
                        <p :class="file.classification?.color">
                            <svg class="mr-2" width="15" height="15">       
                                <image :xlink:href="`../../assets/icons/${file.classification.icon}.svg`" width="15" height="15"/>    
                            </svg>
                            <span>{{ file.classification.name }}</span>
                        </p>
                    </div>
                    <div class="flex-grow">
                        <h4>File Name</h4>
                        <p>{{ file.name }}</p>
                    </div>
                    <div>
                        <h4>Antivirus</h4>
                        <p>{{ file.scan.value }}/{{ file.scan.total }}</p>
                    </div>
                </div>
            </div>
            <div class="tags">
                <h3>Tags</h3>
                <ul class="list flex flex-wrap">
                    <li v-for="tag in tags" v-bind:key="tag.link">
                        <a :href="tag.link" title="{{ tag.title }}">{{ tag.title }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { timeAgo } from '@/helpers/time.js';
import HashInput from './HashInput.vue';
import Avatar from './Avatar.vue';

export default {
    components: {HashInput, Avatar},
    props: {
        hash: {
            default: '85518d00317a597dc83ee3fb78743538b9444664273bd592df16603d2c3e4c28',
            type: String
        },
        author : {
            default: function(){
                return {
                    name: 'Ayoub',
                    joined_at: Date.now()
                }
            },
            type: Object
        },
        file : {
            default : function(){
                return {
                    name: 'virus.exe',
                    classification: {
                        name: null,
                        icon : null
                    },
                    scan : {
                        value: 0,
                        total: 0
                    },
                    submitted_at: Date.now()
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
                    {title:'nsis', link:'/tags/nsis'},
                    {title:'trojan', link:'/tags/nsis'},
                    {title:'virus', link:'/tags/nsis'},
                    {title:'injection', link:'/tags/nsis'},
                    {title:'horse', link:'/tags/nsis'},
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

            .meta{
                h4{
                    @apply font-bold text-sm uppercase  text-gray;
                }

                p{
                    @apply font-bold flex items-center text-sm mt-1;
                }
                
                .danger{
                    @apply text-danger;
                }
                .success{
                    @apply text-success;
                }
                .warning{
                    @apply text-warning;
                }
            }
        }

        .tags{
            @apply mt-8 mx-0 px-0 w-full ;
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