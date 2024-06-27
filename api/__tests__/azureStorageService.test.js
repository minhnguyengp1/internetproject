import { BlobServiceClient } from '@azure/storage-blob';
import {
    uploadFile,
    downloadFile,
    getBlobUrl,
} from '../src/services/azureStorageService';

jest.mock('@azure/storage-blob', () => ({
    BlobServiceClient: {
        fromConnectionString: jest.fn().mockReturnValue({
            getContainerClient: jest.fn().mockReturnValue({
                getBlockBlobClient: jest.fn().mockReturnValue({
                    uploadData: jest.fn(),
                    download: jest.fn().mockResolvedValue({
                        readableStreamBody: 'mockStreamBody',
                    }),
                }),
                url: 'https://mockurl.com/container',
            }),
        }),
    },
}));

describe('Azure Storage Service', () => {
    const mockFile = {
        originalname: 'test.txt',
        buffer: Buffer.from('test content'),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('uploadFile uploads a file and returns the blob name', async () => {
        const blobName = await uploadFile(mockFile);

        expect(blobName).toMatch(/^\d+-test\.txt$/);
        const blobServiceClientMock = BlobServiceClient.fromConnectionString();
        const containerClientMock = blobServiceClientMock.getContainerClient();
        const blockBlobClientMock =
            containerClientMock.getBlockBlobClient(blobName);

        expect(blockBlobClientMock.uploadData).toHaveBeenCalledWith(
            mockFile.buffer,
        );
    });

    test('downloadFile downloads a file and returns the stream', async () => {
        const fileName = 'test.txt';
        const stream = await downloadFile(fileName);

        const blobServiceClientMock = BlobServiceClient.fromConnectionString();
        const containerClientMock = blobServiceClientMock.getContainerClient();
        const blockBlobClientMock =
            containerClientMock.getBlockBlobClient(fileName);

        expect(blockBlobClientMock.download).toHaveBeenCalled();
        expect(stream).toBe('mockStreamBody');
    });

    test('getBlobUrl returns the correct URL', () => {
        const fileName = 'test.txt';
        const url = getBlobUrl(fileName);

        expect(url).toBe('https://mockurl.com/container/test.txt');
    });
});
