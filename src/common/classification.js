export const defaultclass = {
    title: 'Unknown',
    icon: 'unsafe',
    color: 'orange'
}
export const classes = {
    'label.benign': {
        title: 'Benign',
        icon: 'safe',
        color: 'green'
    },
    'label.malicious': {
        title: 'Malicious',
        icon: 'danger',
        color: 'red'
    },
}

export const getClass = (c) => {
    return classes[(c + "").toLowerCase()] || defaultclass
}


export default getClass;