import faker from 'faker';

export function activity({
    examples = 1
}) {
    let items = Array(examples).fill({}).map(() => {
        return {
            hash: faker.datatype.uuid(),
            file: {
                name: faker.system.fileName() + '.exe',
                classification: {
                    name: faker.random.word(),
                    color: 'danger',
                    icon: 'malware'
                },
                scan: {
                    value: 0,
                    total: 12
                },
                submitted_at: Date.now() - 20000
            },
            author: {
                name: faker.name.firstName() + ' ' + faker.name.firstName(),
                joined_at: Date.now() - 50000,
                avatar: 'https://i.pravatar.cc/160?i=' + Math.random(),
            },
            follow: false,
            tags: Array(Math.floor(Math.random() * 5)).fill({}).map(() => {
                return {
                    title: faker.random.word(),
                    link: '#'
                }
            })
        }
    })

    return examples === 0 ? items[0] : items;
}

export function submission({
    examples = 1,
    one = false
}) {
    let submissions = Array(examples).fill([]).map(() => {
        return [
            faker.date.past(),
            faker.random.word() + '.exe',
            'Web',
        ];
    });


    return one ? submissions[0] : submissions;
}

export function like({
    examples = 1,
    one = false
}) {
    let likes = Array(examples).fill({}).map(()=>{

        return {
            hash: faker.datatype.uuid(),
            filename: faker.random.word() + '.exe',
            classification : {
                color: 'danger',
                name:'Malware',
                icon : 'malware'
            },
            scan : {
                value: faker.random.number(10),
                total: 10
            },
        }
    })

    return one ? likes[0] : likes;
}