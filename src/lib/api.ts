import { IProduct } from "./types";
import { API_URL } from "./const";

export interface IApiResponse<T> {
  data: T;
  error?: string | null;
}

// const fetchProducts = async (): Promise<IApiResponse<IProduct[]>> => {
//   try {
//     const response: Response = await fetch(API_URL);
//     if (!response.ok) {
//       return {
//         data: [],
//         error: "Failed to fetch products 1"
//       };
//     }
    
//     const data: IProduct[] = await response.json();
  
//     return {
//       data,
//       error: null
//     }
//   } catch (error) {
//     console.error(error);
//     return {
//       data: [],
//       error: "Failed to fetch products 2"
//     };
//   }
// }

// Server-side compatible version for Next.js server components
const fetchProductsServer = async (): Promise<IApiResponse<IProduct[]>> => {
  try {
    const response: Response = await fetch(API_URL, {
      cache: 'no-store', // Ensure fresh data on each request
      // Alternative: cache: 'force-cache' for caching, or next: { revalidate: 60 } for ISR
    });
    
    if (!response.ok) {
      return {
        data: [],
        error: `Failed to fetch posts - Status: ${response.status} ${response.statusText}`
      };
    }
    
    const data: IProduct[] = await response.json();
  
    return {
      data,
      error: null
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return {
      data: [],
      error: `Failed to fetch posts - Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

// fetchProducts
export { fetchProductsServer };
