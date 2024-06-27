import { fetchImageUrls } from '../src/utils/helpers.js';
import { getBlobUrl } from '../src/services/azureStorageService.js';

jest.mock('../src/services/azureStorageService.js');

describe('fetchImageUrls', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return an empty array if imgUrl is not provided', async () => {
        const result = await fetchImageUrls('');
        expect(result).toEqual([]);
    });

    it('should return an array of image URLs for valid imgUrls', async () => {
        const mockImgUrl = 'image1.png,image2.png';
        const mockBlobUrls = ['https://storage.blob.core.windows.net/image1.png', 'https://storage.blob.core.windows.net/image2.png'];
        
        getBlobUrl.mockImplementation((fileName) => `https://storage.blob.core.windows.net/${fileName}`);

        const result = await fetchImageUrls(mockImgUrl);
        
        expect(result).toEqual(mockBlobUrls);
        expect(getBlobUrl).toHaveBeenCalledWith('image1.png');
        expect(getBlobUrl).toHaveBeenCalledWith('image2.png');
    });

    it('should handle a single image URL correctly', async () => {
        const mockImgUrl = 'image1.png';
        const mockBlobUrl = 'https://storage.blob.core.windows.net/image1.png';
        
        getBlobUrl.mockImplementation((fileName) => `https://storage.blob.core.windows.net/${fileName}`);

        const result = await fetchImageUrls(mockImgUrl);
        
        expect(result).toEqual([mockBlobUrl]);
        expect(getBlobUrl).toHaveBeenCalledWith('image1.png');
    });

    it('should handle null imgUrl correctly', async () => {
        const result = await fetchImageUrls(null);
        expect(result).toEqual([]);
    });

    it('should handle undefined imgUrl correctly', async () => {
        const result = await fetchImageUrls(undefined);
        expect(result).toEqual([]);
    });
});
