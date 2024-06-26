import supertest from 'supertest';
import express from 'express';
import fileRouter from '../src/routes/file.route'; // Adjust the path as necessary
import {
    uploadFile,
    downloadFile,
    deleteFile,
} from '../src/services/azureStorageService';

jest.mock('../src/services/azureStorageService', () => ({
    uploadFile: jest.fn(),
    downloadFile: jest.fn(),
    deleteFile: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use('/api/files', fileRouter);

describe('File Routes', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(5000, () => {
            done();
        });
    });

    afterAll((done) => {
        server.close(() => {
            done();
        });
    });

    it('should upload a file', async () => {
        const mockFile = Buffer.from('This is a test file content');
        const mockFileName = 'test-file.txt';

        uploadFile.mockResolvedValue(mockFileName);

        const response = await supertest(app)
            .post('/api/files/upload')
            .attach('file', mockFile, mockFileName)
            .expect(200);

        expect(response.body).toHaveProperty(
            'message',
            'File uploaded successfully',
        );
        expect(response.body).toHaveProperty('filePath', mockFileName);
    });

    it('should return 400 if no file is uploaded', async () => {
        const response = await supertest(app)
            .post('/api/files/upload')
            .expect(400);

        expect(response.body).toHaveProperty('message', 'No file uploaded');
    });

    // it('should download a file', async () => {
    //     const mockFileName = 'test-file.txt';
    //     const mockFileContent = Buffer.from('This is a test file content');

    //     downloadFile.mockResolvedValue({
    //         readableStreamBody: mockFileContent,
    //     });

    //     const response = await supertest(app)
    //         .get(`/api/files/download/${mockFileName}`)
    //         .expect(200);

    //     expect(response.text).toBe(mockFileContent.toString());
    // });

    it('should return 404 if file is not found', async () => {
        const mockFileName = 'nonexistent-file.txt';

        downloadFile.mockRejectedValue(new Error('File not found'));

        const response = await supertest(app)
            .get(`/api/files/download/${mockFileName}`)
            .expect(404);

        expect(response.body).toHaveProperty('message', 'File not found');
    });

    // it('should delete a file', async () => {
    //     const mockFileName = 'test-file.txt';

    //     deleteFile.mockResolvedValue();

    //     const response = await supertest(app)
    //         .delete(`/api/files/delete/${mockFileName}`)
    //         .expect(200);

    //     expect(response.body).toHaveProperty(
    //         'message',
    //         'File deleted successfully',
    //     );
    // });

    it('should return 500 if error occurs during file deletion', async () => {
        const mockFileName = 'test-file.txt';

        deleteFile.mockRejectedValue(new Error('Internal server error'));

        const response = await supertest(app)
            .delete(`/api/files/delete/${mockFileName}`)
            .expect(500);

        expect(response.body).toHaveProperty(
            'message',
            'Internal server error',
        );
    });
});
