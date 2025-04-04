import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const VisualizePage = () => {
    const { projectId } = useParams();
    const { toast } = useToast();
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // TODO: Fetch relevant project context (validated idea summary) to pre-fill or display
    const ideaContext = "Example Validated Idea Summary..."; // Placeholder

    const handleGenerateImage = async () => {
        setIsLoading(true);
        setImageUrl(null);
        setError(null);

        if (!prompt || prompt.length < 10) {
            setError("Please enter a prompt at least 10 characters long.");
            setIsLoading(false);
            return;
        }

        try {
            console.log('Calling /api/generate/image with:', { prompt, projectId });
            const response = await fetch('/api/generate/image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, projectId }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Failed to generate image');
            }

            console.log('Received mock image URL:', data.imageUrl);
            setImageUrl(data.imageUrl);
            toast({ title: "Success", description: "Mock concept image generated." });

        } catch (err: any) {
            console.error("Error generating image:", err);
            setError(err.message || "An unexpected error occurred.");
            toast({ title: "Error", description: err.message || "Failed to generate image.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <PageHeader 
                title={`Visualize Concept ${projectId ? `(${projectId.substring(0,6)}...)` : ''}`}
                breadcrumbs={[
                    { label: 'Dashboard', path: '/' }, 
                    { label: `Project ${projectId ? projectId.substring(0,6)+'...' : ''}`, path: `/project/${projectId}/validation` }, // Link back to validation
                    {label: 'Visualize', path: '#'}
                ]}
            />
            <div className="px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Input */}
                <div className="md:col-span-1 space-y-4">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle>Generate Concept Image (Mock)</CardTitle>
                            <CardDescription>Enter a prompt to visualize your idea (uses a placeholder image for demo).</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-1">
                                <Label>Idea Context (Read-only)</Label>
                                <Textarea 
                                    readOnly 
                                    value={ideaContext} 
                                    rows={3}
                                    className="bg-muted/50 text-sm"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="imagePrompt">Image Prompt</Label>
                                <Textarea 
                                    id="imagePrompt"
                                    placeholder="e.g., A sleek mobile app showing weather data, minimalist design, blue tones..."
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    rows={4}
                                    disabled={isLoading}
                                />
                            </div>
                            {error && <p className="text-sm text-destructive">{error}</p>}
                            <Button onClick={handleGenerateImage} disabled={isLoading || !prompt} className="w-full">
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                {isLoading ? 'Generating... ' : 'Generate Mock Image'}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Output */}
                <div className="md:col-span-2">
                    <Card className="glass-card min-h-[400px]">
                        <CardHeader>
                            <CardTitle>Generated Image</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center">
                            {isLoading && <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />} 
                            {!isLoading && !imageUrl && (
                                <p className="text-muted-foreground">Enter a prompt and click generate to see the mock concept image.</p>
                            )}
                            {!isLoading && imageUrl && (
                                <img 
                                    src={imageUrl} 
                                    alt="Generated Concept Image (Placeholder)" 
                                    className="max-w-full h-auto rounded-md border border-border shadow-md"
                                />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default VisualizePage; 