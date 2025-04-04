import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Copy } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

// Define the structure for context (adjust as needed based on data availability)
type PitchDeckContext = {
    problemStatement?: string;
    solutionIdea?: string;
    targetMarket?: string;
    mvpSummary?: string;
};

// Define pitch deck sections
const pitchDeckSections: { id: string; title: string }[] = [
    { id: "Problem", title: "Problem Statement" },
    { id: "Solution", title: "Proposed Solution" },
    { id: "Market", title: "Market Opportunity" },
    { id: "Product", title: "Product / MVP" },
    // Add more sections as needed (Team, Financials, Ask)
];

const LaunchPrepPage = () => {
    const { projectId } = useParams();
    const { toast } = useToast();

    // State to hold generated content for each section
    const [generatedContent, setGeneratedContent] = useState<Record<string, string>>({});
    // State to track loading status for each section
    const [loadingStatus, setLoadingStatus] = useState<Record<string, boolean>>({});

    // TODO: Fetch actual project context (problem, solution, market, mvp) based on projectId
    const mockContext: PitchDeckContext = {
        problemStatement: "Customers struggle with managing multiple SaaS subscriptions effectively.",
        solutionIdea: "A centralized dashboard to track usage, costs, and renewal dates for all SaaS tools.",
        targetMarket: "Small to medium-sized businesses (10-100 employees) using 5+ SaaS tools.",
        mvpSummary: "Core features include manual subscription entry, cost tracking, and renewal reminders."
    };

    const handleGenerateContent = async (sectionId: string) => {
        setLoadingStatus(prev => ({ ...prev, [sectionId]: true }));
        setGeneratedContent(prev => ({ ...prev, [sectionId]: '' })); // Clear previous content

        try {
            console.log(`Generating content for ${sectionId} with context:`, mockContext);
            const response = await fetch('/api/pitch-deck', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    section: sectionId, 
                    context: mockContext, 
                    projectId 
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || `Failed to generate content for ${sectionId}`);
            }

            setGeneratedContent(prev => ({ ...prev, [sectionId]: data.content }));
            toast({ title: "Content Generated", description: `Text for ${section.title} section is ready.` });

        } catch (err: any) {
            console.error(`Error generating content for ${sectionId}:`, err);
            setGeneratedContent(prev => ({ ...prev, [sectionId]: `Error: ${err.message}` }));
            toast({ title: "Error", description: err.message || "Generation failed.", variant: "destructive" });
        } finally {
            setLoadingStatus(prev => ({ ...prev, [sectionId]: false }));
        }
    };

    const handleCopyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast({ title: "Copied!", description: "Content copied to clipboard." });
        }).catch(err => {
            console.error('Failed to copy:', err);
            toast({ title: "Copy Failed", description: "Could not copy content.", variant: "destructive" });
        });
    };

    return (
        <div className="space-y-8">
             <PageHeader 
                title={`Launch Prep ${projectId ? `(${projectId.substring(0,6)}...)` : ''}`}
                breadcrumbs={[
                    { label: 'Dashboard', path: '/' }, 
                    { label: `Project ${projectId ? projectId.substring(0,6)+'...' : ''}`, path: `/project/${projectId}/plan` }, // Link back to plan
                    {label: 'Launch Prep', path: '#'}
                ]}
            />
            <div className="px-8">
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>AI Pitch Deck Assistant</CardTitle>
                        <CardDescription>Generate content for key sections of your pitch deck based on your project details.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            {pitchDeckSections.map((section) => (
                                <AccordionItem value={section.id} key={section.id}>
                                    <AccordionTrigger className="text-base hover:no-underline">
                                        {section.title}
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-4 pt-2">
                                        <Button 
                                            onClick={() => handleGenerateContent(section.id)} 
                                            disabled={loadingStatus[section.id]}
                                            size="sm"
                                            variant="outline"
                                        >
                                            {loadingStatus[section.id] ? (
                                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                                            ) : (
                                                <>Generate Content</>
                                            )}
                                        </Button>
                                        <div className="relative">
                                            <Textarea 
                                                placeholder={`Generated content for ${section.title} will appear here...`}
                                                value={generatedContent[section.id] || ''}
                                                readOnly
                                                rows={5}
                                                className="bg-muted/30 pr-10" // Add padding for the copy button
                                            />
                                            {generatedContent[section.id] && !generatedContent[section.id].startsWith('Error:') && (
                                                 <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-foreground"
                                                    onClick={() => handleCopyToClipboard(generatedContent[section.id])}
                                                >
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
                {/* Placeholder for Launch Checklist (Step 6.2) */}
                 <LaunchChecklistPlaceholder /> 
            </div>
        </div>
    );
};

// --- Launch Checklist Placeholder Component ---
const checklistItems = [
    { id: "legal", label: "Finalize legal checks (terms, privacy policy)" },
    { id: "pricing", label: "Set up pricing page and payment gateway" },
    { id: "hosting", label: "Configure production hosting environment" },
    { id: "domain", label: "Set up domain and DNS records" },
    { id: "analytics", label: "Integrate analytics tools (e.g., Google Analytics, Mixpanel)" },
    { id: "monitoring", label: "Set up error monitoring and logging" },
    { id: "support", label: "Prepare customer support channels/documentation" },
    { id: "marketing", label: "Prepare initial marketing materials/announcements" },
    { id: "testing", label: "Conduct final end-to-end testing" },
    { id: "backup", label: "Confirm database backup strategy" },
];

const LaunchChecklistPlaceholder = () => {
    // Basic state to track checked items (for UI interaction only)
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    const handleCheckedChange = (itemId: string, isChecked: boolean | string) => {
         // The Checkbox component might return 'indeterminate' string, handle it
        const checked = typeof isChecked === 'boolean' ? isChecked : false;
        setCheckedItems(prev => ({ ...prev, [itemId]: checked }));
    };

    return (
         <Card className="glass-card mt-8">
            <CardHeader>
                <CardTitle>Launch Checklist</CardTitle>
                <CardDescription>Standard tasks to consider before launching.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                {checklistItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                        <Checkbox 
                            id={item.id} 
                            checked={checkedItems[item.id] || false}
                            onCheckedChange={(checked) => handleCheckedChange(item.id, checked)}
                        />
                        <label
                            htmlFor={item.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {item.label}
                        </label>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};
// --- End Launch Checklist Placeholder ---

export default LaunchPrepPage; 