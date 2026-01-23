export type ProductCategory = 'game-key' | 'hardware' | 'gift-card';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  imageUrl: string;
  platform?: string; // Steam, PS5, Xbox, Origin, etc.
  isFeatured?: boolean;
}
