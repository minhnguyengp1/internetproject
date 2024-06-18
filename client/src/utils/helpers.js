import axios from 'axios'

export const fetchCityFromPLZ = async (plz) => {
    try {
        const { data } = await axios.get(`https://openplzapi.org/de/Localities?postalCode=${plz}`)

        if (data.length > 0) {
            const city = data[0].name
            return city
        } else {
            return ''
        }
    } catch (error) {
        throw error
    }
}

export const fetchCityInfo = async (plz) => {
    if (plz.length !== 5 || !/^\d{5}$/.test(plz)) {
        console.error('Invalid postal code format:', JSON.stringify(plz))
        return ''
    }

    try {
        const city = await fetchCityFromPLZ(plz)
        return city
    } catch (error) {
        console.error('Error retrieving city:', error)
        throw error
    }
}
