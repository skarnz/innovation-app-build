
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useProductType } from '@/contexts/ProductTypeContext';
import ProductTypeSelector from '@/components/ProductTypeSelector';
import AiAgent from '@/components/AiAgent';

const ProjectSetup = () => {
  const { productType, setProductType } = useProductType();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user already completed this step
    if (productType) {
      // Optionally auto-navigate to next step if product type already selected
      // Commented out to allow users to change their selection
      // navigate('/project/ideate');
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-navy p-6">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-10">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-4"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>
          
          <h1 className="text-4xl font-orbitron font-bold text-electric-blue mb-4">
            Project Setup
          </h1>
          <p className="text-white/70 text-lg">
            Let's start by defining what type of product or service you're building. This will help us customize your experience.
          </p>
        </div>
        
        <div className="glass-card p-8">
          <ProductTypeSelector 
            initialValue={productType} 
            onSelect={setProductType}
          />
        </div>
        
        <div className="mt-10 text-white/70 text-center">
          <p>
            You can change your product type later if your scope changes. The AI assistant will help you access any features you might need.
          </p>
        </div>
      </div>
      
      <AiAgent />
    </div>
  );
};

export default ProjectSetup;
