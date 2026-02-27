export type ProductCategory = 'game-key' | 'hardware' | 'gift-card';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  imageUrl: string;
  platform?: string;
  isFeatured?: boolean;
  stock?: number;
  requiresLogin?: boolean;
}
