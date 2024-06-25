import { getItem, categories } from './categories'

describe('getItem function', () => {
    test('returns an object with the correct key and label', () => {
        const label = 'Test Label'
        const key = 'Test Key'
        const expected = { key: 'Test Key', label: 'Test Label' }

        const result = getItem(label, key)

        expect(result).toEqual(expected)
    })
})

describe('categories array', () => {
    test('contains the correct items', () => {
        const expectedCategories = [
            { key: 'auto-rad-boot', label: 'Auto, Rad & Boot' },
            { key: 'elektronik', label: 'Elektronik' },
            { key: 'haus-garten', label: 'Haus & Garten' },
            { key: 'jobs', label: 'Jobs' },
            { key: 'dienstleistungen', label: 'Dienstleistungen' },
            { key: 'familie-kind-baby', label: 'Familie, Kind & Baby' },
            { key: 'haustiere', label: 'Haustiere' },
            { key: 'mode-beauty', label: 'Mode & Beauty' },
            { key: 'unterricht-kurse', label: 'Unterricht & Kurse' },
            {
                key: 'eintrittskarten-tickets',
                label: 'Eintrittskarten & Tickets',
            },
            { key: 'freizeit-hobby', label: 'Freizeit & Hobby' },
            { key: 'immobilien', label: 'Immobilien' },
            { key: 'musik-filme-buecher', label: 'Musik, Filme & Bücher' },
        ]
        expect(categories).toEqual(expectedCategories)
    })

    test('all items are created using getItem function', () => {
        const labels = [
            'Auto, Rad & Boot',
            'Elektronik',
            'Haus & Garten',
            'Jobs',
            'Dienstleistungen',
            'Familie, Kind & Baby',
            'Haustiere',
            'Mode & Beauty',
            'Unterricht & Kurse',
            'Eintrittskarten & Tickets',
            'Freizeit & Hobby',
            'Immobilien',
            'Musik, Filme & Bücher',
        ]
        const keys = [
            'auto-rad-boot',
            'elektronik',
            'haus-garten',
            'jobs',
            'dienstleistungen',
            'familie-kind-baby',
            'haustiere',
            'mode-beauty',
            'unterricht-kurse',
            'eintrittskarten-tickets',
            'freizeit-hobby',
            'immobilien',
            'musik-filme-buecher',
        ]

        categories.forEach((category, index) => {
            const expectedCategory = getItem(labels[index], keys[index])
            expect(category).toEqual(expectedCategory)
        })
    })
})
