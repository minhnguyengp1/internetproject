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
            { key: 'sub1', label: 'All Categories' },
            { key: 'sub2', label: 'Elektronik' },
            { key: 'sub3', label: 'Mode' },
            { key: 'sub4', label: 'Sport' },
        ]

        expect(categories).toEqual(expectedCategories)
    })

    test('all items are created using getItem function', () => {
        categories.forEach((category, index) => {
            const expectedCategory = getItem(
                ['All Categories', 'Elektronik', 'Mode', 'Sport'][index],
                `sub${index + 1}`
            )
            expect(category).toEqual(expectedCategory)
        })
    })
})
