export type ProductType = {
  _id: string;
  name: string;
  slug: {_type: "slug"
    current: string;
  }
  price: number;
  description: string;
  discountPercentage: number;
  isFeaturedProduct: boolean;
  stockLevel: number;
  category: string;
  imageUrl: string;
};