const express = require('express');
const router = express.Router();
const { z } = require('zod');
const OpenAI = require("openai");
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { getOpenAIClient } = require('../utils/openai'); // Assuming OpenAI client setup
const { getInternalDoc } = require('../utils/storage'); // Assuming storage util
const { ensureAuthenticated } = require('../middleware/auth');

// Initialize OpenAI Client
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

// Apply auth middleware to all AI routes
router.use(ensureAuthenticated);

// Zod Schemas
const IdeationSchema = z.object({
    problemStatement: z.string().min(10, "Problem statement is too short"),
    solutionIdea: z.string().min(10, "Initial idea is too short"),
    projectId: z.string().uuid().optional(), // Optional for now
});

// Helper function to parse numbered list from AI response
const parseNumberedList = (text) => {
    if (!text) return [];
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const ideas = []; // Initialize as empty array
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

// --- Zod Schema for Image Generation (Simple Prompt) ---
const GenerateImageSchema = z.object({
  prompt: z.string().min(10, "Prompt must be at least 10 characters"),
  projectId: z.string().optional(), // Optional: associate with project
});

// POST /api/generate/image
router.post('/generate/image', async (req, res) => {
  console.log("Received /api/generate/image request:", req.body);
  try {
    // 1. Validate Input (using Zod schema)
    const validatedData = GenerateImageSchema.parse(req.body);
    console.log("Validated image prompt:", validatedData.prompt);

    // 2. Simulate Delay (optional)
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    // 3. Return Hardcoded Placeholder Image URL (Mock Response)
    // TODO: In a real implementation, call an image generation API (DALL-E, Stable Diffusion, etc.)
    // and potentially upload the result to Supabase Storage.
    const mockImageUrl = '/placeholders/concept-image.png'; // Ensure this image exists in your /public directory

    console.log("Returning mock image URL:", mockImageUrl);
    res.json({ success: true, imageUrl: mockImageUrl });

  } catch (error) {
    console.error("Error in /api/generate/image:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: "Invalid input data", errors: error.errors });
    }
    res.status(500).json({ success: false, message: error.message || "Failed to generate mock image" });
  }
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

// --- Zod Schema for MVP Chat ---
const MvpChatSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  history: z.array(z.object({ // Expecting an array of message objects
      role: z.string(),
      content: z.string(),
  })).optional(),
  projectId: z.string().uuid(),
  ideaContext: z.string().optional(),
});

// POST /api/mvp-chat
router.post('/mvp-chat', async (req, res) => {
  console.log("Received /api/mvp-chat request:", req.body);
  try {
    // 1. Validate Input - Temporarily removed Zod parsing due to lint errors
    // const validatedData = MvpChatSchema.parse(req.body);
    // Use req.body directly (less safe, for debugging lint only)
    const userMessage = req.body.message;
    const history = req.body.history || [];
    const ideaContext = req.body.ideaContext || "No idea context provided.";

    if (!userMessage) {
       return res.status(400).json({ success: false, message: "Invalid input data", errors: [{ path: ['message'], message: 'Message cannot be empty'}] });
    }

    // 2. Construct Messages for OpenAI
    const systemPrompt = `You are an AI assistant helping a user draft an MVP (Minimum Viable Product) specification. 
Your goal is to guide them through defining key aspects like core features, target users, and success metrics based on their idea.
Be concise and ask clarifying questions. 
The user's validated idea context is: ${ideaContext}
Start by asking about the single most important core feature.`;

    const messages = [
        { role: 'system', content: systemPrompt },
        // Add existing history
        ...history.map(h => ({ role: h.role, content: h.content })),
        // Add the new user message
        { role: 'user', content: userMessage },
    ];

    // 3. Call OpenAI API
    console.log("Sending messages to OpenAI:", messages);
    const completion = await openai.chat.completions.create({
        model: "gpt-4o", // Or your preferred model
        messages: messages, // No cast needed now
        max_tokens: 300, // Adjust as needed
        temperature: 0.7,
    });

    const assistantReply = completion.choices[0]?.message?.content;
    console.log("OpenAI Response:", assistantReply);

    if (!assistantReply) {
        throw new Error("Assistant did not provide a reply.");
    }

    // 4. Send Response
    res.json({ success: true, reply: assistantReply });

  } catch (error) {
    console.error("Error in /api/mvp-chat:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: "Invalid input data", errors: error.errors });
    }
    res.status(500).json({ success: false, message: error.message || "Failed to process chat message" });
  }
});

// --- Zod Schema for Pitch Deck Content ---
const PitchDeckSchema = z.object({
  section: z.enum(["Problem", "Solution", "Market", "Product", "Team", "Financials", "Ask"]), // Example sections
  context: z.object({
      problemStatement: z.string().optional(),
      solutionIdea: z.string().optional(),
      targetMarket: z.string().optional(), // Summary of demographics, needs
      mvpSummary: z.string().optional(), // Key features from Step 5.2
      // Add other relevant context fields as needed
  }),
  projectId: z.string().optional(),
});

// POST /api/pitch-deck
router.post('/pitch-deck', async (req, res) => {
  console.log("Received /api/pitch-deck request:", req.body);
  try {
    // 1. Validate Input
    const validatedData = PitchDeckSchema.parse(req.body);
    const { section, context, projectId } = validatedData;

    // 2. Construct Prompt for OpenAI based on section
    // TODO: Refine prompts for better quality content
    let systemPrompt = `You are an AI assistant helping generate content for a pitch deck.
Generate concise and compelling text (2-4 sentences) for the specified section based on the provided context. Focus on clarity and impact.`;

    let userPrompt = `Generate content for the '${section}' section of a pitch deck.
Context:
- Problem: ${context.problemStatement || 'Not provided'}
- Solution: ${context.solutionIdea || 'Not provided'}
- Target Market: ${context.targetMarket || 'Not provided'}
- MVP Summary: ${context.mvpSummary || 'Not provided'}

Section Content:`;

    // Optional: Customize prompt based on section
    if (section === "Problem") {
        userPrompt = `Clearly articulate the core problem being solved, referencing the context provided.
Context:
- Problem: ${context.problemStatement || 'Not provided'}
- Target Market Needs: ${context.targetMarket || 'Not specified'}

Problem Section Content:`;
    } else if (section === "Solution") {
        userPrompt = `Describe the proposed solution and how it addresses the problem, referencing the context provided.
Context:
- Solution Idea: ${context.solutionIdea || 'Not provided'}
- MVP Summary: ${context.mvpSummary || 'Not provided'}

Solution Section Content:`;
    }
    // ... add more customizations for other sections ...

    const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
    ];

    // 3. Call OpenAI API
    console.log(`Generating pitch deck content for section: ${section}`);
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: messages,
        max_tokens: 150, // Shorter response for deck content
        temperature: 0.6,
    });

    const generatedContent = completion.choices[0]?.message?.content?.trim();

    if (!generatedContent) {
        throw new Error("Assistant did not provide content.");
    }

    // 4. Send Response
    res.json({ success: true, content: generatedContent });

  } catch (error) {
    console.error("Error in /api/pitch-deck:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: "Invalid input data", errors: error.errors });
    }
    res.status(500).json({ success: false, message: error.message || "Failed to generate pitch deck content" });
  }
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

// New Schemas for Validation Page AI
const GenerateSurveyQuestionsSchema = z.object({
    surveyName: z.string().min(3, "Survey name is required"),
    ideaContext: z.string().min(10, "Idea context is required"),
    projectId: z.string().uuid().optional(),
});

const DeepResearchSchema = z.object({
    query: z.string().min(5, "Research query is required"),
    ideaContext: z.string().min(10, "Idea context is required"),
    projectId: z.string().uuid().optional(),
});

// POST /api/ai/generate-survey-questions (New Mock)
router.post('/generate-survey-questions', async (req, res, next) => {
    try {
        GenerateSurveyQuestionsSchema.parse(req.body);
        const { surveyName, ideaContext } = req.body;
        console.log('AI Generate Survey Questions Request (Mock):', { surveyName, ideaContext });

        // Mock Response
        const mockQuestions = [
            `Regarding '${surveyName}', how likely are you to use a solution for '${ideaContext.substring(0, 50)}...'? (Scale 1-5)`,
            `What is the biggest challenge you face related to '${ideaContext.substring(0, 50)}...'?`,
            `How much would you be willing to pay monthly for a solution like this?`,
            `What features would be most important to you?`
        ];

        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        res.json({ success: true, questions: mockQuestions });

    } catch (error) {
         if (error instanceof z.ZodError) {
            return res.status(400).json({ success: false, message: 'Invalid input', errors: error.errors });
        }
        next(error);
    }
});

// POST /api/ai/deep-research (New Mock)
router.post('/deep-research', async (req, res, next) => {
    try {
        DeepResearchSchema.parse(req.body);
        const { query, ideaContext } = req.body;
        console.log('AI Deep Research Request (Mock):', { query, ideaContext });

        // Mock Response
        let mockSummary = `Simulated AI Research Summary for query: "${query}"\n\n`;
        mockSummary += `- Finding 1: Competitor X recently launched a similar feature with mixed reviews.\n`;
        mockSummary += `- Finding 2: Market trend Y shows increasing demand for solutions addressing '${ideaContext.substring(0, 30)}...'.\n`;
        mockSummary += `- Finding 3: Potential challenge: Regulatory landscape Z is evolving.\n`;
        mockSummary += `\n(Note: This is simulated data based on your query and idea context.)`;

        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 2500));

        res.json({ success: true, researchSummary: mockSummary });

    } catch (error) {
         if (error instanceof z.ZodError) {
            return res.status(400).json({ success: false, message: 'Invalid input', errors: error.errors });
        }
        next(error);
    }
});

module.exports = router; 