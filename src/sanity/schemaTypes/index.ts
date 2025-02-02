

import { type SchemaTypeDefinition } from 'sanity'
import productSchema from './product'
import categorySchema from './catagory'
import order from './order'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema,categorySchema,order],
}
