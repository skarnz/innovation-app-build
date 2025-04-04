import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios, { AxiosError } from 'axios';

const ValidationPage: React.FC = () => {
  const [isCreatingSurvey, setIsCreatingSurvey] = useState(false);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [isResearching, setIsResearching] = useState(false);

  const handleCreateSurvey = async () => {
    try {
      setIsCreatingSurvey(true);
      // ... existing code ...
    } catch (error: unknown) {
      console.error("Error creating survey:", error);
      let detailedMessage = "An unknown error occurred";
      if (axios.isAxiosError(error)) {
        detailedMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        detailedMessage = error.message;
      }
      toast({
        variant: "destructive",
        title: "Survey Creation Failed",
        description: detailedMessage,
      });
    } finally {
      setIsCreatingSurvey(false);
    }
  };

  const handleGenerateQuestions = async () => {
    try {
      setIsGeneratingQuestions(true);
      // ... existing code ...
    } catch (error: unknown) {
      console.error("Error generating questions:", error);
      let detailedMessage = "An unknown error occurred";
      if (axios.isAxiosError(error)) {
        detailedMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        detailedMessage = error.message;
      }
      toast({
        variant: "destructive",
        title: "AI Question Generation Failed",
        description: detailedMessage,
      });
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const handleResearch = async () => {
    try {
      setIsResearching(true);
      // ... existing code ...
    } catch (error: unknown) {
      console.error("Error performing research:", error);
      let detailedMessage = "An unknown error occurred";
      if (axios.isAxiosError(error)) {
        detailedMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        detailedMessage = error.message;
      }
      toast({
        variant: "destructive",
        title: "AI Research Failed",
        description: detailedMessage,
      });
      setResearchResult("Error retrieving research results.");
    } finally {
      setIsResearching(false);
    }
  };

  return (
    <div>
      {/* ... rest of the component code ... */}
    </div>
  );
};

export default ValidationPage; 