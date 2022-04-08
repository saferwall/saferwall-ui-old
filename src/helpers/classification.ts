interface MalwareType {
    title: string;
    icon: string;
    color: string;
}

export const defaultclass: MalwareType = {
    title: 'Unknown',
    icon: 'unsafe',
    color: 'orange'
}
export const classes: any = {
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

export const getClass = (c: string | null): MalwareType => {
    return classes[(c + "").toLowerCase()] || defaultclass
}


export default getClass;