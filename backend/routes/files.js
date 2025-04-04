const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Import the database connection pool

// Placeholder: Middleware for authentication (add later)
// const authMiddleware = (req, res, next) => { ... next(); }

// GET /api/files - Fetch files (e.g., for a specific project)
router.get('/', async (req, res) => {
    // TODO: Add authentication check
    const { projectId } = req.query; // Example: Get projectId from query params
    if (!projectId) {
        return res.status(400).json({ error: 'Project ID is required' });
    }
    try {
        // Example query: Fetch documents related to the project
        const result = await pool.query('SELECT * FROM Documents WHERE project_id = $1 ORDER BY created_at DESC', [projectId]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching files:', err);
        res.status(500).json({ error: 'Failed to fetch files' });
    }
});

// POST /api/files - Upload a new file (metadata)
// Actual file upload to S3/GCS would likely be handled separately or via pre-signed URLs
router.post('/', async (req, res) => {
    // TODO: Add authentication check
    const { projectId, userId, fileName, filePath, fileType, fileSize, storageType } = req.body;

    // Basic validation
    if (!projectId || !userId || !fileName || !filePath || !fileType) {
        return res.status(400).json({ error: 'Missing required file information' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO Documents (project_id, user_id, file_name, file_path, file_type, file_size, storage_type) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [projectId, userId, fileName, filePath, fileType, fileSize, storageType || 's3']
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error saving file metadata:', err);
        res.status(500).json({ error: 'Failed to save file metadata' });
    }
});

// DELETE /api/files/:id - Delete a file (metadata)
// Actual deletion from S3/GCS would also be needed
router.delete('/:id', async (req, res) => {
    // TODO: Add authentication check & authorization (can user delete this file?)
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Documents WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'File not found' });
        }
        // TODO: Trigger deletion from storage (S3/GCS)
        res.json({ message: 'File metadata deleted successfully', deletedFile: result.rows[0] });
    } catch (err) {
        console.error('Error deleting file metadata:', err);
        res.status(500).json({ error: 'Failed to delete file metadata' });
    }
});

module.exports = router; 