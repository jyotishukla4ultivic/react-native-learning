import React, { createContext, useState, useContext } from 'react';

export type Category = 'Lehengas' | 'Suits' | 'Sarees' | 'Kurtas' | 'Kurtis';

export interface Product {
  id: string;
  title: string;
  category: Category;
  price: number;
  description: string;
  imageUrl: string;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: string) => void;
}

const initialProducts: Product[] = [
  {
    id: '1',
    title: 'Bridal Red Lehenga',
    category: 'Lehengas',
    price: 5000,
    description: 'A beautiful traditional red bridal lehenga with heavy zari work.',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '2',
    title: 'Silk Embroidered Kurti',
    category: 'Kurtis',
    price: 800,
    description: 'Elegant silk kurti with intricate embroidery, perfect for small functions.',
    imageUrl: 'https://images.unsplash.com/photo-1602810316693-3667c854239a?auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '3',
    title: 'Pastel Floral Lehenga',
    category: 'Lehengas',
    price: 4500,
    description: 'Lightweight pastel lehenga with delicate floral prints and sequin work.',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '4',
    title: 'Designer Silk Saree',
    category: 'Sarees',
    price: 3000,
    description: 'Classic Kanjeevaram silk saree in rich maroon and gold tones.',
    imageUrl: 'https://images.unsplash.com/photo-1610189014167-160914c6e949?auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '5',
    title: 'Men\'s Royal Sherwani',
    category: 'Suits',
    price: 6000,
    description: 'Premium royal sherwani for grooms with matching safa.',
    imageUrl: 'https://images.unsplash.com/photo-1599598425947-3300262b77a7?auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '6',
    title: 'Yellow Haldi Kurta',
    category: 'Kurtas',
    price: 1200,
    description: 'Bright yellow cotton kurta perfect for haldi ceremonies.',
    imageUrl: 'https://images.unsplash.com/photo-1563270912-42171ec26d36?auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '7',
    title: 'Navy Blue Party Suit',
    category: 'Suits',
    price: 2500,
    description: 'Sharp three-piece navy blue suit for wedding receptions.',
    imageUrl: 'https://images.unsplash.com/photo-1594938298596-189f72db1946?auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '8',
    title: 'Green Georgette Saree',
    category: 'Sarees',
    price: 2000,
    description: 'Lightweight georgette saree with minimal embellishments.',
    imageUrl: 'https://images.unsplash.com/photo-1583391733958-d25e07fac0ec?auto=format&fit=crop&w=500&q=60'
  }
];

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct = {
      ...productData,
      id: Math.random().toString(36).substring(7)
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
