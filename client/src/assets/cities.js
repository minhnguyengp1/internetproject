export function getCity(name, key) {
    return { key, name }
}

export const cities = [
    getCity('Berlin', 'berlin'),
    getCity('Hamburg', 'hamburg'),
    getCity('München', 'muenchen'),
    getCity('Köln', 'koeln'),
    getCity('Frankfurt am Main', 'frankfurt'),
    getCity('Stuttgart', 'stuttgart'),
    getCity('Düsseldorf', 'duesseldorf'),
    getCity('Leipzig', 'leipzig'),
    getCity('Dortmund', 'dortmund'),
    getCity('Essen', 'essen'),
    getCity('Bremen', 'bremen')
]
