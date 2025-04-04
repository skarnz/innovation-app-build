
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Monitor, HeartHandshake, ChevronRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

export type ProductType = 'physical' | 'software' | 'service' | undefined;

interface ProductTypeSelectorProps {
  onSelect?: (type: ProductType) => void;
  initialValue?: ProductType;
  showNextButton?: boolean;
}

const ProductTypeSelector = ({ onSelect, initialValue, showNextButton = true }: ProductTypeSelectorProps) => {
  const [selectedType, setSelectedType] = useState<ProductType>(initialValue);
  const navigate = useNavigate();
  
  useEffect(() => {
    // When the component mounts or initialValue changes, update the state
    if (initialValue) {
      setSelectedType(initialValue);
    }
  }, [initialValue]);
  
  const handleTypeSelect = (type: ProductType) => {
    setSelectedType(type);
    
    // If onSelect callback is provided, call it with the selected type
    if (onSelect) {
      onSelect(type);
    }
    
    // Store the selection in localStorage for global access
    if (type) {
      localStorage.setItem('productType', type);
      toast({
        title: "Product type updated",
        description: `Your project is now configured as a ${type} product.`,
      });
    }
  };
  
  const handleNext = () => {
    if (selectedType) {
      navigate('/project/ideate', { state: { productType: selectedType } });
    } else {
      toast({
        title: "Selection required",
        description: "Please select a product type before proceeding.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">What are you building?</h2>
        <p className="text-white/70">
          This selection will customize your journey and tools throughout the entire process.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          className={`p-6 cursor-pointer bg-navy-light hover:bg-navy border border-white/10 transition-all ${
            selectedType === 'physical' ? 'ring-2 ring-electric-blue border-electric-blue' : ''
          }`}
          onClick={() => handleTypeSelect('physical')}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-electric-blue/20 flex items-center justify-center">
              <Box size={32} className="text-electric-blue" />
            </div>
            <h3 className="text-xl font-semibold text-white">Physical Product</h3>
            <p className="text-white/70 text-sm">
              Hardware, gadgets, wearables, consumer goods, or any tangible items that require manufacturing.
            </p>
          </div>
        </Card>
        
        <Card 
          className={`p-6 cursor-pointer bg-navy-light hover:bg-navy border border-white/10 transition-all ${
            selectedType === 'software' ? 'ring-2 ring-electric-blue border-electric-blue' : ''
          }`}
          onClick={() => handleTypeSelect('software')}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-electric-blue/20 flex items-center justify-center">
              <Monitor size={32} className="text-electric-blue" />
            </div>
            <h3 className="text-xl font-semibold text-white">Software</h3>
            <p className="text-white/70 text-sm">
              Web applications, mobile apps, desktop software, or any digital product that requires coding.
            </p>
          </div>
        </Card>
        
        <Card 
          className={`p-6 cursor-pointer bg-navy-light hover:bg-navy border border-white/10 transition-all ${
            selectedType === 'service' ? 'ring-2 ring-electric-blue border-electric-blue' : ''
          }`}
          onClick={() => handleTypeSelect('service')}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-electric-blue/20 flex items-center justify-center">
              <HeartHandshake size={32} className="text-electric-blue" />
            </div>
            <h3 className="text-xl font-semibold text-white">Service</h3>
            <p className="text-white/70 text-sm">
              Consulting, subscription services, on-demand assistance, or any business primarily offering services.
            </p>
          </div>
        </Card>
      </div>
      
      {showNextButton && (
        <div className="flex justify-center mt-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button 
                    onClick={handleNext}
                    className="px-8 py-6 bg-electric-blue hover:bg-electric-blue/90 text-white font-medium text-lg"
                    disabled={!selectedType}
                  >
                    Continue to Ideation <ChevronRight className="ml-2" size={20} />
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {selectedType 
                  ? "Proceed to the next step" 
                  : "Please select a product type first"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};

export default ProductTypeSelector;
