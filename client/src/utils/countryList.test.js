import { countryList } from './countryList'

describe('countryList', () => {
    it('should be an array', () => {
        expect(Array.isArray(countryList)).toBe(true)
    })

    it('should contain objects with required properties', () => {
        countryList.forEach((country) => {
            expect(country).toHaveProperty('icon')
            expect(country).toHaveProperty('label')
            expect(country).toHaveProperty('value')
            // 'timeZone' property is optional
        })
    })

    it('should have unique values for the "value" property', () => {
        const values = countryList.map((country) => country.value)
        const uniqueValues = new Set(values)
        expect(values.length).toBe(uniqueValues.size)
    })

    it('should have correct data types for each property', () => {
        countryList.forEach((country) => {
            expect(typeof country.icon).toBe('string')
            expect(typeof country.label).toBe('string')
            expect(typeof country.value).toBe('string')
            if (country.timeZone) {
                expect(Array.isArray(country.timeZone)).toBe(true)
                country.timeZone.forEach((tz) => {
                    expect(typeof tz).toBe('string')
                })
            }
        })
    })
})
