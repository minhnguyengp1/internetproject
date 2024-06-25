import axios from 'axios'
import { fetchCityFromPLZ, fetchCityInfo } from './helpers'

// Mock axios
jest.mock('axios')

describe('fetchCityFromPLZ', () => {
    it('should return city name when API returns data', async () => {
        const mockResponse = { data: [{ name: 'Berlin' }] }
        axios.get.mockResolvedValue(mockResponse)

        const city = await fetchCityFromPLZ('10115')
        expect(city).toBe('Berlin')
    })

    it('should return empty string when API returns no data', async () => {
        const mockResponse = { data: [] }
        axios.get.mockResolvedValue(mockResponse)

        const city = await fetchCityFromPLZ('00000')
        expect(city).toBe('')
    })

    it('should throw an error when API call fails', async () => {
        axios.get.mockRejectedValue(new Error('API Error'))

        await expect(fetchCityFromPLZ('10115')).rejects.toThrow('API Error')
    })
})

describe('fetchCityInfo', () => {
    it('should return city name for valid postal code', async () => {
        jest.spyOn(global.console, 'error').mockImplementation(() => {})
        axios.get.mockResolvedValue({ data: [{ name: 'Berlin' }] })

        const city = await fetchCityInfo('10115')
        expect(city).toBe('Berlin')
    })

    it('should return empty string for invalid postal code format', async () => {
        jest.spyOn(global.console, 'error').mockImplementation(() => {})

        const city = await fetchCityInfo('123')
        expect(city).toBe('')
        expect(console.error).toHaveBeenCalledWith(
            'Invalid postal code format:',
            JSON.stringify('123')
        )
    })

    it('should log an error and throw when fetchCityFromPLZ fails', async () => {
        jest.spyOn(global.console, 'error').mockImplementation(() => {})
        axios.get.mockRejectedValue(new Error('API Error'))

        await expect(fetchCityInfo('10115')).rejects.toThrow('API Error')
        expect(console.error).toHaveBeenCalledWith(
            'Error retrieving city:',
            expect.any(Error)
        )
    })
})
