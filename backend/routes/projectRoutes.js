const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadAsset, getAssetUrl } = require('../utils/storageUtils');
const { z } = require('zod');
const crypto = require('crypto');
const path = require('path');

// TODO: Add authentication middleware
// const ensureAuthenticated = require('../middleware/auth'); 
// router.use(ensureAuthenticated);

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Example: Limit file size to 10MB
});

// --- Project CRUD Stubs (Implement actual DB logic later) ---

const ProjectCreateSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    businessType: z.enum(['Physical', 'Software', 'Service']),
    // Add other fields from Phase 2 form
});

router.post('/', async (req, res, next) => {
    try {
        ProjectCreateSchema.parse(req.body);
        // TODO: Implement DB logic to create project
        console.log('Creating project (stub):', req.body);
        const mockProjectId = crypto.randomUUID(); // Generate mock ID
        res.status(201).json({ success: true, projectId: mockProjectId, message: 'Project created (stub)' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ success: false, message: 'Invalid input', errors: error.errors });
        }
        next(error); // Pass other errors to the main error handler
    }
});

router.get('/:projectId', (req, res) => {
    // TODO: Implement DB logic to fetch project
    console.log(`Fetching project (stub): ${req.params.projectId}`);
    res.json({ success: true, project: { id: req.params.projectId, name: 'Mock Project' } });
});

router.put('/:projectId', (req, res) => {
    // TODO: Implement DB logic to update project (e.g., target market)
    console.log(`Updating project (stub): ${req.params.projectId}`, req.body);
    res.json({ success: true, message: 'Project updated (stub)' });
});

// --- Asset Upload Route ---

const UploadParamsSchema = z.object({
    projectId: z.string().uuid()
});

router.post('/:projectId/upload-asset', upload.single('asset'), async (req, res, next) => {
    try {
        UploadParamsSchema.parse(req.params);
        const { projectId } = req.params;
        const userId = req.user?.id || 'anonymous'; // Get user ID from session (Passport)

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded.' });
        }

        // Generate a unique filename
        const fileExtension = path.extname(req.file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = `${userId}/${projectId}/${uniqueSuffix}${fileExtension}`;

        console.log(`Uploading asset: ${filename}, Type: ${req.file.mimetype}`);

        // Use the utility function to upload
        const { data, error: uploadError } = await uploadAsset(
            req.file.buffer,
            filename,
            req.file.mimetype
        );

        if (uploadError) {
            console.error('Supabase upload error:', uploadError);
            return res.status(500).json({ success: false, message: 'Failed to upload file.' });
        }

        // Optionally, get a URL for the uploaded asset
        const { publicUrl, signedUrl, error: urlError } = await getAssetUrl(filename);
        // Choose which URL to return based on bucket policy (public or signed)
        const assetUrl = publicUrl; // Assuming public bucket for simplicity in MVP

        if (urlError) {
             console.warn(`Could not get URL for uploaded asset ${filename}:`, urlError.message);
             // Still return success, but without the URL
             res.status(201).json({ 
                success: true, 
                message: 'File uploaded successfully, but URL retrieval failed.', 
                filename: filename 
            });
        } else {
            res.status(201).json({ 
                success: true, 
                message: 'File uploaded successfully.', 
                assetUrl: assetUrl, 
                filename: filename 
            });
        }

    } catch (error) {
         if (error instanceof z.ZodError) {
            return res.status(400).json({ success: false, message: 'Invalid project ID format', errors: error.errors });
        }
        next(error); // Pass other errors to the main error handler
    }
});

module.exports = router; 