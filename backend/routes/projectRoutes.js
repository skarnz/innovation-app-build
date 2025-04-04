const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadAsset, getAssetUrl } = require('../utils/storageUtils');
const { z } = require('zod');
const crypto = require('crypto');
const path = require('path');
const { body, param, validationResult } = require('express-validator');
const { ensureAuthenticated } = require('../middleware/auth');

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Example: Limit file size to 10MB
});

// Validation middleware
const validateProject = [
    body('name').trim().isLength({ min: 1 }).withMessage('Project name is required.'),
    body('description').trim().optional(),
    body('type').isIn(['Physical', 'Software', 'Service']).withMessage('Invalid business type.'),
];

const validateSurvey = [
    param('projectId').isUUID().withMessage('Valid Project ID is required.'),
    body('name').trim().isLength({ min: 1 }).withMessage('Survey name is required.'),
    body('description').trim().optional(),
];

const validateProjectUpdate = [
    param('projectId').isUUID().withMessage('Valid Project ID is required.'),
    // Add other update fields validations here (e.g., target market)
    body('targetMarket.demographics').optional().isString(),
    body('targetMarket.psychographics').optional().isString(),
    body('targetMarket.needs').optional().isString(),
];

const validateAssetUpload = [
    param('projectId').isUUID().withMessage('Valid Project ID is required.')
];

// Apply auth middleware to all project routes
router.use(ensureAuthenticated);

// --- Project CRUD Stubs (Implement actual DB logic later) ---

const ProjectCreateSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    businessType: z.enum(['Physical', 'Software', 'Service']),
    // Add other fields from Phase 2 form
});

router.post('/', validateProject, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log('Received project creation request:', req.body);
    // TODO: Implement actual project creation logic (DB interaction)
    const mockProjectId = require('crypto').randomUUID(); // Generate mock ID
    res.status(201).json({ success: true, projectId: mockProjectId });
});

router.get('/:projectId', param('projectId').isUUID(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(`Fetching details for project: ${req.params.projectId}`);
    // TODO: Implement fetching from DB
    res.json({ success: true, project: { id: req.params.projectId, name: 'Mock Project', description: 'Fetched details', type: 'Software', /* other fields */ } });
});

router.put('/:projectId', validateProjectUpdate, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(`Updating project ${req.params.projectId} with:`, req.body);
    // TODO: Implement update logic in DB
    res.json({ success: true, message: 'Project updated successfully.' });
});

// --- Asset Upload Route ---

router.post('/:projectId/upload-asset', validateAssetUpload, upload.single('asset'), async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    const { projectId } = req.params;
    const userId = req.user.id; // Assuming user ID is available from auth middleware
    const originalFilename = req.file.originalname;
    const timestamp = Date.now();
    // Example filename: user_123/project_abc/1678886400000-drawing.png
    const filename = `user_${userId}/project_${projectId}/${timestamp}-${originalFilename}`;

    try {
        await uploadAsset(req.file.buffer, filename, req.file.mimetype);
        const assetUrl = getAssetUrl(filename); // Assuming this returns a public or signed URL
        console.log(`Asset uploaded: ${filename}, URL: ${assetUrl}`);

        // TODO: Optionally save asset metadata (filename, url, projectId) to DB

        res.status(201).json({ success: true, assetUrl: assetUrl, filename: filename });
    } catch (error) {
        console.error('Asset upload failed:', error);
        res.status(500).json({ success: false, message: 'Failed to upload asset.' });
    }
});

// POST /api/projects/:projectId/surveys - Create survey draft (New Mock)
router.post('/:projectId/surveys', validateSurvey, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { projectId } = req.params;
    const { name, description } = req.body;
    const userId = req.user.id; // From auth

    console.log(`Creating survey draft for project ${projectId}, user ${userId}:`, { name, description });

    // Mock Implementation: Generate a fake ID and return success
    const mockSurveyId = `survey_${require('crypto').randomBytes(8).toString('hex')}`;

    // TODO: Replace with actual DB interaction to save the survey draft

    res.status(201).json({ success: true, surveyId: mockSurveyId });
});

module.exports = router; 