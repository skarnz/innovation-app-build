
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export type ProductType = 'physical' | 'software' | 'service' | undefined;

interface ProductTypeContextType {
  productType: ProductType;
  setProductType: (type: ProductType) => void;
  shouldShowFeature: (feature: 'software' | 'physical' | 'service') => boolean;
}

const ProductTypeContext = createContext<ProductTypeContextType | undefined>(undefined);

export const ProductTypeProvider = ({ children }: { children: ReactNode }) => {
  const [productType, setProductType] = useState<ProductType>(undefined);

  useEffect(() => {
    // Load product type from localStorage on mount
    const savedType = localStorage.getItem('productType') as ProductType | null;
    if (savedType) {
      setProductType(savedType);
    }
  }, []);

  // Save to localStorage whenever productType changes
  useEffect(() => {
    if (productType) {
      localStorage.setItem('productType', productType);
    }
  }, [productType]);

  const shouldShowFeature = (feature: 'software' | 'physical' | 'service'): boolean => {
    if (!productType) return true; // If no product type is set, show everything
    
    // Show features that match the product type, plus universal features
    switch (feature) {
      case 'software':
        return productType === 'software' || productType === 'physical'; // Many physical products need software
      case 'physical':
        return productType === 'physical';
      case 'service':
        return productType === 'service';
      default:
        return true;
    }
  };

  return (
    <ProductTypeContext.Provider value={{ productType, setProductType, shouldShowFeature }}>
      {children}
    </ProductTypeContext.Provider>
  );
};

export const useProductType = () => {
  const context = useContext(ProductTypeContext);
  if (context === undefined) {
    throw new Error('useProductType must be used within a ProductTypeProvider');
  }
  return context;
};
