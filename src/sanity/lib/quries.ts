
import { defineQuery } from "next-sanity";

/**
 * Fetch all products from the Sanity dataset.
 */
export const allProducts = defineQuery(`
  *[_type == "product"]{
  _id,
  name,
  slug,
  "imageUrl": image.asset->url,
  price,
  description,
  discountPercentage,
  isFeaturedProduct,
  stockLevel,
  category
}

`);
export const TrendingProducts = defineQuery(`
  *[_type == "product"][12...16]{
  _id,
  name,
  slug,
  "imageUrl": image.asset->url,
  price,
  description,
  discountPercentage,
  isFeaturedProduct,
  stockLevel,
  category
}

`);

/**
 * Fetch the first four products from the Sanity dataset.
 */
export const fourProduct = defineQuery(`
  *[_type == "product" && category == "Chair"][0...4] {
  _id,
  name,
  slug,
  "imageUrl": image.asset->url,
  price,
  description,
  discountPercentage,
  isFeaturedProduct,
  stockLevel,
  category
}

`);
export const FeaturedProduct = defineQuery(`
  *[_type == "product" && category == "Sofa"][0...4] {
  _id,
  name,
  slug,
  "imageUrl": image.asset->url,
  price,
  description,
  discountPercentage,
  isFeaturedProduct,
  stockLevel,
  category
}

`);


// sanity/lib/queries.ts
export const productQuery = (id: string) => `
  *[_id == "${id}"][0] {
     _id,
  name,
  slug,
  "imageUrl": image.asset->url,
  price,
  description,
  discountPercentage,
  isFeaturedProduct,
  stockLevel,
  category
}
`;