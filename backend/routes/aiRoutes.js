const express = require('express');
const router = express.Router();
const { z } = require('zod');
const OpenAI = require("openai");
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

// Initialize OpenAI Client
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

// TODO: Add authentication middleware
// const ensureAuthenticated = require('../middleware/auth'); 
// router.use(ensureAuthenticated);

// Zod Schemas
const IdeationSchema = z.object({
    problemStatement: z.string().min(10, "Problem statement is too short"),
    solutionIdea: z.string().min(10, "Initial idea is too short"),
    projectId: z.string().uuid().optional(), // Optional for now
});

// Helper function to parse numbered list from AI response
const parseNumberedList = (text: string): { title: string, description: string }[] => {
    if (!text) return [];
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const ideas: { title: string, description: string }[] = [];
    let currentTitle = '';
    let currentDescription = '';

    lines.forEach(line => {
        const match = line.match(/^\s*\d+[.\)]\s*(.*?):?\s*$/);
        if (match) { // Starts with a number (potential title)
            if (currentTitle) { // Save previous idea
                ideas.push({ title: currentTitle.trim(), description: currentDescription.trim() });
            }
            currentTitle = match[1];
            currentDescription = '';
        } else if (currentTitle) { // Continuation of description
            currentDescription += (currentDescription ? ' \n' : '') + line.trim();
        }
    });
    // Add the last idea
    if (currentTitle) {
        ideas.push({ title: currentTitle.trim(), description: currentDescription.trim() });
    }
    // Fallback if parsing fails - return as single item
    if (ideas.length === 0 && text.trim()) {
        return [{ title: "Generated Response", description: text.trim() }];
    }
    return ideas;
};

// POST /api/ai/ideate
router.post('/ideate', async (req, res, next) => {
    if (!openai) {
        return res.status(503).json({ success: false, message: 'OpenAI client not initialized. Check API key.' });
    }
    try {
        const validationResult = IdeationSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({ success: false, message: 'Invalid input', errors: validationResult.error.errors });
        }
        const { problemStatement, solutionIdea } = validationResult.data;

        console.log('Generating ideas for:', { problemStatement, solutionIdea });

        const systemPrompt = "You are an expert product innovation assistant. Given a problem statement and an initial solution idea, generate 5 distinct and creative alternative solutions or significant refinements. Focus on feasibility, novelty, and potential impact. Format the output as a numbered list, with each item containing a concise title followed by a brief description on the next lines.";
        const userPrompt = `Problem: ${problemStatement}\nInitial Idea: ${solutionIdea}\n\nGenerate 5 alternative solutions:`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o", // Or your preferred model
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            n: 1,
            temperature: 0.7,
            max_tokens: 600,
        });

        const resultText = completion.choices[0].message.content;
        const parsedIdeas = parseNumberedList(resultText || '');

        res.json({ success: true, ideas: parsedIdeas });

    } catch (error) {
        console.error('Error in /api/ai/ideate:', error);
        next(error); // Pass to global error handler
    }
});

// POST /api/ai/scrape-trends
const ScrapeTrendsSchema = z.object({
    ideaContext: z.string().min(10),
    projectId: z.string().uuid().optional(),
});
router.post('/scrape-trends', async (req, res, next) => {
     if (!openai) {
        return res.status(503).json({ success: false, message: 'OpenAI client not initialized. Check API key.' });
    }
     try {
        const validationResult = ScrapeTrendsSchema.safeParse(req.body);
         if (!validationResult.success) {
            return res.status(400).json({ success: false, message: 'Invalid input', errors: validationResult.error.errors });
        }
        const { ideaContext } = validationResult.data;

         console.log('Simulating trend scraping for:', ideaContext);

         // Use GPT-4o for mock generation
        const prompt = `Simulate insights from Reddit, Quora, and Google Trends related to the following product idea: ${ideaContext}. Provide 3-5 bullet points summarizing potential interest, common questions, and related trends. Preface with 'Simulated Trend Analysis:'.`;
        
         const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            n: 1,
            temperature: 0.5,
            max_tokens: 200,
        });

        const analysis = completion.choices[0].message.content || 'Simulated Trend Analysis:\n- Moderate interest found.\n- Common question about pricing.'

        res.json({ success: true, analysis: analysis });

    } catch (error) {
        console.error('Error in /api/ai/scrape-trends:', error);
        next(error);
    }
});


// POST /api/generate/image
// (Keeping simple mock for MVP)
router.post('/generate/image', (req, res) => {
    console.log('Hit /api/generate/image stub', req.body);
    // TODO: Add Zod validation
    res.json({ success: true, message: '/api/generate/image stub hit', imageUrl: '/placeholders/concept-image.png' });
});

// POST /api/generate/video
// (Using OpenAI for mock script)
const GenerateVideoSchema = z.object({
    context: z.string().min(10),
     projectId: z.string().uuid().optional(),
});
router.post('/generate/video', async (req, res, next) => {
    if (!openai) {
        return res.status(503).json({ success: false, message: 'OpenAI client not initialized.' });
    }
    try {
        const validationResult = GenerateVideoSchema.safeParse(req.body);
         if (!validationResult.success) {
            return res.status(400).json({ success: false, message: 'Invalid input', errors: validationResult.error.errors });
        }
        const { context } = validationResult.data;

         const prompt = `Generate a short, 3-bullet point concept script for a 15-second social media video ad about the following product/idea: ${context}.`;
         const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Cheaper model for simple task
            messages: [{ role: "user", content: prompt }],
            n: 1,
            temperature: 0.6,
            max_tokens: 150,
        });
        const script = completion.choices[0].message.content || 'Mock video script: 1. Show problem. 2. Show solution. 3. Call to action.'

        res.json({ success: true, videoScript: script });
    } catch(error) {
         console.error('Error in /api/generate/video:', error);
        next(error);
    }
});

// POST /api/mvp-chat
const MvpChatSchema = z.object({
    message: z.string().min(1),
    history: z.array(z.object({ role: z.enum(['user', 'assistant']), content: z.string() })),
    projectId: z.string().uuid().optional(),
    ideaContext: z.string().optional(),
});
router.post('/mvp-chat', async (req, res, next) => {
    // ... Add full implementation later using getInternalDoc and OpenAI ...
    console.log('Hit /api/mvp-chat stub', req.body);
    // TODO: Add Zod validation using MvpChatSchema
    res.json({ success: true, message: '/api/mvp-chat stub hit', reply: 'Mock AI chat reply based on history...' });
});

// POST /api/pitch-deck
const PitchDeckSchema = z.object({
    section: z.string().min(1),
    context: z.object({ // Define expected context fields
        problemStatement: z.string().optional(),
        solutionIdea: z.string().optional(),
        mvpSpecSummary: z.string().optional(),
        targetAudience: z.string().optional(),
    }).optional(),
    projectId: z.string().uuid().optional(),
});
router.post('/pitch-deck', async (req, res, next) => {
    // ... Add full implementation later ...
    console.log('Hit /api/pitch-deck stub', req.body);
    // TODO: Add Zod validation using PitchDeckSchema
    res.json({ success: true, message: '/api/pitch-deck stub hit', content: 'Mock pitch deck content for section...' });
});

// POST /api/generate/ad-copy
const AdCopySchema = z.object({
    copyType: z.string().min(1),
    platform: z.string().min(1),
     context: z.object({ // Define expected context fields
        productDescription: z.string().optional(),
        targetAudience: z.string().optional(),
        keyBenefit: z.string().optional(),
    }).optional(),
     projectId: z.string().uuid().optional(),
});
router.post('/generate/ad-copy', async (req, res, next) => {
    // ... Add full implementation later ...
    console.log('Hit /api/generate/ad-copy stub', req.body);
    // TODO: Add Zod validation using AdCopySchema
    res.json({ success: true, message: '/api/generate/ad-copy stub hit', variations: ['Mock ad copy 1', 'Mock ad copy 2'] });
});

module.exports = router; 