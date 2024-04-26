export function getItem(label, key) {
    return { key, label }
}

export const items = [
    getItem('All Categories', 'sub1'),
    getItem('Elektronik', 'sub2'),
    getItem('Mode', 'sub3'),
    getItem('Sport', 'sub4'),
]
