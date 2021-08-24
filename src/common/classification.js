export const defaultclass = {
    title: 'Unknown',
    icon: 'unsafe',
    color: 'yellow'
}
export const classes = {
    'Label.BENIGN': {
        title: 'Benign',
        icon: 'unsafe',
        color: 'red'
    },
    'Label.MALICIOUS': {
        title: 'Malicious',
        icon: 'unsage',
        color: 'red'
    },
}

export const getClass = (c) => {
    return classes[c] || defaultclass
}


export default getClass;