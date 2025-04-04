const express = require('express');
const router = express.Router();
// const fetch = require('node-fetch'); // Or use Axios if preferred - install if needed

// Placeholder: Middleware for authentication (add later)
// const authMiddleware = require('../middleware/auth'); // Assuming auth middleware exists

// POST /api/ai - Proxy endpoint for AI model requests
router.post('/', /* authMiddleware, */ async (req, res) => {
    const { model, prompt } = req.body;
    // TODO: Add user context from req.user if needed

    if (!model || !prompt) {
        return res.status(400).json({ error: 'Missing model or prompt' });
    }

    console.log(`Received AI request for model: ${model}`);

    try {
        let aiResponseText = '';

        // Placeholder logic: In reality, call the respective external API
        // IMPORTANT: Store API keys securely using environment variables!
        switch (model) {
            case 'claude':
                // const claudeApiKey = process.env.CLAUDE_API_KEY;
                // TODO: Call Claude API endpoint using fetch/axios
                console.log(`Simulating call to Claude API with prompt: "${prompt}"`);
                aiResponseText = `Placeholder response from Claude for: "${prompt}"`;
                break;
            case 'gpt':
                // const gptApiKey = process.env.OPENAI_API_KEY;
                // TODO: Call OpenAI API endpoint using fetch/axios
                console.log(`Simulating call to GPT API with prompt: "${prompt}"`);
                aiResponseText = `Placeholder response from GPT for: "${prompt}"`;
                break;
            case 'gemini':
                // const geminiApiKey = process.env.GEMINI_API_KEY;
                // TODO: Call Google AI API endpoint using fetch/axios
                console.log(`Simulating call to Gemini API with prompt: "${prompt}"`);
                aiResponseText = `Placeholder response from Gemini for: "${prompt}"`;
                break;
            default:
                return res.status(400).json({ error: 'Unsupported AI model requested' });
        }

        res.json({ reply: aiResponseText });

    } catch (error) {
        console.error(`Error processing AI request for model ${model}:`, error);
        res.status(500).json({ error: 'Failed to process AI request' });
    }
});

module.exports = router; 