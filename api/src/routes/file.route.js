import express from 'express';
import multer, { memoryStorage } from 'multer';
import { uploadFile, downloadFile } from '../services/azureStorageService.js';
const fileRouter = express.Router();

// Configure multer for file uploads
const upload = multer({ storage: memoryStorage() });

fileRouter.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        console.log('req.file received in backend:', req.file);

        const filePath = await uploadFile(req.file); // Upload to Azure Blob Storage

        console.log('File uploaded to Azure Blob Storage:', filePath);

        return res.status(200).json({
            message: 'File uploaded successfully',
            filePath,
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
});

fileRouter.get('/download/:fileName', async (req, res) => {
    const { fileName } = req.params;

    try {
        const stream = await downloadFile(fileName);
        // res.setHeader(
        //     'Content-Disposition',
        //     `attachment; filename=${fileName}`,
        // );
        // res.setHeader('Content-Type', 'application/octet-stream');

        stream.pipe(res); // Pipe the stream to the response
    } catch (error) {
        console.error('Error downloading file:', error);
        res.status(404).json({
            message: 'File not found',
        });
    }
});

// Delete endpoint
fileRouter.delete('/delete/:fileName', async (req, res) => {
    const { fileName } = req.params;

    try {
        await deleteFile(fileName);
        res.status(200).json({
            message: 'File deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
});

export default fileRouter;
