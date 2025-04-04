import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';

// Keep type internal if only used here
type ProductType = 'Physical' | 'Software' | 'Service' | null;

// Keep context internal
interface ProductTypeContextType {
  productType: ProductType;
  setProductType: (type: ProductType) => void;
}

const ProductTypeContext = createContext<ProductTypeContextType | undefined>(undefined);

// Export only the Provider component
interface ProductTypeProviderProps {
  children: ReactNode;
}

export const ProductTypeProvider: React.FC<ProductTypeProviderProps> = ({ children }) => {
  const [productType, setProductTypeState] = useState<ProductType>(null);

  const setProductType = (type: ProductType) => {
    setProductTypeState(type);
  };

  // Memoize the context value
  const contextValue = useMemo(() => ({
    productType,
    setProductType,
  }), [productType]);

  return (
    <ProductTypeContext.Provider value={contextValue}>
      {children}
    </ProductTypeContext.Provider>
  );
};

// Export only the hook to use the context
export const useProductType = (): ProductTypeContextType => {
  const context = useContext(ProductTypeContext);
  if (context === undefined) {
    throw new Error('useProductType must be used within a ProductTypeProvider');
  }
  return context;
};
