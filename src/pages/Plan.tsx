import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import MvpChatInterface from '@/components/planning/MvpChatInterface';

const PlanPage = () => {
    const { projectId } = useParams();
    // TODO: Fetch or pass ideaContext (validated idea summary) from previous steps
    const ideaContext = "Example Idea Context for MVP Chat..."; 

    return (
        <div className="space-y-8">
             <PageHeader 
                title={`Plan MVP ${projectId ? `(${projectId.substring(0,6)}...)` : ''}`}
                breadcrumbs={[
                    { label: 'Dashboard', path: '/' }, 
                    { label: `Project ${projectId ? projectId.substring(0,6)+'...' : ''}`, path: `/project/${projectId}/visualize` }, // Link back to visualize
                    {label: 'Plan MVP', path: '#'}
                ]}
            />
            <div className="px-8">
                {/* Integrate chat interface */}
                <MvpChatInterface projectId={projectId} ideaContext={ideaContext} />
            </div>
        </div>
    );
};

export default PlanPage; 