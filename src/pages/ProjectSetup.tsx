import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AssetUploader from '@/components/setup/AssetUploader';

const ProjectSetup = () => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [businessType, setBusinessType] = useState<string | undefined>(undefined);
  const [objective, setObjective] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleCreateProject = async () => {
    setIsLoading(true);
    setError(null);

    // Basic Validation
    if (!projectName || !description || !businessType) {
      setError('Project Name, Description, and Business Type are required.');
      setIsLoading(false);
      return;
    }

    try {
      // --- Step 1: Create Project (API Call) ---
      // Replace with actual API call using axios or fetch
      console.log('Submitting project data:', { projectName, description, businessType, objective });
      const response = await fetch('/api/projects', { // Assuming relative URL works with proxy/setup
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers if required
        },
        body: JSON.stringify({ 
          name: projectName, 
          description: description, 
          businessType: businessType,
          objective: objective 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create project');
      }

      const projectData = await response.json();
      const projectId = projectData.projectId; // Get the ID from backend response

      if (!projectId) {
         throw new Error('Backend did not return a project ID.');
      }

      console.log('Project created successfully, ID:', projectId);

      // --- Step 2: Upload Assets ---
      if (files.length > 0) {
        console.log(`Uploading ${files.length} assets for project ${projectId}...`);
        const uploadPromises = files.map(file => {
          const formData = new FormData();
          formData.append('asset', file);
          // Note: Using fetch here, ensure proper error handling and response parsing
          return fetch(`/api/projects/${projectId}/upload-asset`, {
            method: 'POST',
            body: formData,
            // Add authentication headers if required
          }).then(async uploadResponse => {
            if (!uploadResponse.ok) {
               const uploadErrorData = await uploadResponse.json();
               console.error(`Error uploading ${file.name}:`, uploadErrorData);
               // Optionally collect errors to show user
               return { success: false, name: file.name, message: uploadErrorData.message }; 
            }
             console.log(`Successfully uploaded ${file.name}`);
            return { success: true, name: file.name };
          });
        });
        
        const uploadResults = await Promise.all(uploadPromises);
        const failedUploads = uploadResults.filter(r => !r.success);
        if (failedUploads.length > 0) {
           console.warn("Some file uploads failed:", failedUploads);
           setError(`Failed to upload ${failedUploads.length} file(s). Please check project files.`);
           // Decide if we should still navigate or show error more prominently
        }
      }

      // --- Navigation ---
      navigate(`/project/${projectId}/ideation`); // Navigate to ideation page for the new project

    } catch (err: any) {
      console.error('Error creating project:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Create New Project"
        breadcrumbs={[{ label: 'Dashboard', path: '/' }, { label: 'New Project', path: '/project/setup'}]}
      />
      <div className="px-8">
        <Card className="max-w-2xl mx-auto glass-card">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Tell us about your new venture.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input 
                id="projectName" 
                placeholder="e.g., Eco-Friendly Drone Delivery" 
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea 
                id="description" 
                placeholder="Briefly describe the core idea or problem you're solving..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required 
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Select 
                onValueChange={setBusinessType} 
                value={businessType} 
                required
              >
                <SelectTrigger id="businessType">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Physical">Physical Product</SelectItem>
                  <SelectItem value="Software">Software/SaaS</SelectItem>
                  <SelectItem value="Service">Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2">
              <Label htmlFor="objective">Primary Objective (Optional)</Label>
              <Textarea 
                id="objective" 
                placeholder="What is the main goal for this project? (e.g., Validate market demand, Build MVP)" 
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
               <Label>Initial Assets (Optional)</Label>
               <AssetUploader files={files} onFilesChange={setFiles} />
            </div>

          </CardContent>
          <CardFooter className="flex justify-between items-center">
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button 
              onClick={handleCreateProject} 
              disabled={isLoading}
              className="ml-auto bg-electric-blue hover:bg-electric-blue/90"
            >
              {isLoading ? 'Creating...' : 'Create Project & Continue'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProjectSetup;
