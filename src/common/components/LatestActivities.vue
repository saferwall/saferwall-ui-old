<template>
<div class="latestactv my-9">
    <list-activities :activities="activities" :more="true" />
</div>
</template>

<script>
import ListActivities from './ListActivities.vue';

export default {
    name: 'LatestActivities',
    components: {
        ListActivities
    },
    data() {
        return {
            activities: [{
                    hash: '85518d00317a597dc83ee3fb78743538b9444664273bd592df16603d2c3e4c28',
                    file: {
                        name: 'virus.exe',
                        classification: {
                            name: 'Malware',
                            color: 'danger',
                            icon: 'malware'
                        },
                        scan: {
                            value: 12,
                            total: 12
                        },
                        submitted_at: Date.now() - 20000
                    },
                    author: {
                        name: 'Yassin',
                        joined_at: Date.now() - 50000,
                        avatar: 'https://i.pravatar.cc/160?i=5',
                    },
                    follow: false,
                    tags: [{
                        title: 'virus',
                        link: '#'
                    }, {
                        title: 'trojan',
                        link: '#'
                    }, ]
                },
                {
                    hash: '55518d00317a597dc83ee3fb78743538b9444664273bd592df16603d2c3e4c28',
                    file: {
                        name: 'google.exe',
                        classification: {
                            name: 'No specific threat',
                            color: 'success',
                            icon: 'safegreen'
                        },
                        scan: {
                            value: 12,
                            total: 12
                        },
                        submitted_at: Date.now() - 20000
                    },
                    author: {
                        name: 'Ali',
                        joined_at: Date.now() - 50000,
                        avatar: 'https://i.pravatar.cc/160?i=6',
                    },
                    follow: false,
                    tags: [{
                        title: 'virus',
                        link: '#'
                    }, {
                        title: 'trojan',
                        link: '#'
                    }, ]
                },
                {
                    hash: '75518d00317a597dc83ee3fb78743538b9444664273bd592df16603d2c3e4c28',
                    file: {
                        name: 'redsoftware.exe',
                        classification: {
                            name: 'Souspicious',
                            color: 'warning',
                            icon: 'souspicious'
                        },
                        scan: {
                            value: 12,
                            total: 12
                        },
                        submitted_at: Date.now() - 20000
                    },
                    author: {
                        name: 'Remy',
                        joined_at: Date.now() - 50000,
                        avatar: 'https://i.pravatar.cc/160?i=7',
                    },
                    follow: false,
                    tags: [{
                        title: 'virus',
                        link: '#'
                    }, {
                        title: 'trojan',
                        link: '#'
                    }, ]
                },
            ]
        }
    },
    computed: {
        latestActivities() {
            return this.activities && this.activities.length || 0;
        },
        getActivities() {
            return this.activities;
        }
    }
}
</script>
