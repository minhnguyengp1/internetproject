export function getItem(label, key) {
    return { key, label }
}

export const categories = [
    getItem('Alle Kategorien', 'alle-kategorien'),
    getItem('Auto, Rad & Boot', 'auto-rad-boot'),
    getItem('Elektronik', 'elektronik'),
    getItem('Haus & Garten', 'haus-garten'),
    getItem('Jobs', 'jobs'),
    getItem('Dienstleistungen', 'dienstleistungen'),
    getItem('Familie, Kind & Baby', 'familie-kind-baby'),
    getItem('Haustiere', 'haustiere'),
    getItem('Mode & Beauty', 'mode-beauty'),
    getItem('Unterricht & Kurse', 'unterricht-kurse'),
    getItem('Eintrittskarten & Tickets', 'eintrittskarten-tickets'),
    getItem('Freizeit & Hobby', 'freizeit-hobby'),
    getItem('Immobilien', 'immobilien'),
    getItem('Musik, Filme & Bücher', 'musik-filme-buecher')
]
