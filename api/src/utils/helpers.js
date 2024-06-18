import { getBlobUrl } from '../services/azureStorageService.js'

export const fetchImageUrls = async (imgUrl) => {
    if (!imgUrl) return []

    const fileNames = imgUrl.split(',')
    const imageUrls = fileNames.map(fileName => getBlobUrl(fileName))

    return imageUrls
}
