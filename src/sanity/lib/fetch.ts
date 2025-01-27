
import { client } from "./client";


type fetchType = {query: string, params?: Record<string, unknown>}

// Example usage of the client
export async function sanityFetch({ query, params = {} }: fetchType) {
    return await client.fetch(query, params);
  
}
