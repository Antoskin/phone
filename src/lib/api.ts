import { IProduct } from "./types";
import { API_URL } from "./const";

export interface IApiResponse<T> {
  data: T;
  error?: string | null;
}


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

const fetchProductByIdServer = async (id: number): Promise<IApiResponse<IProduct | null>> => {
  try {
    const response: Response = await fetch(`${API_URL}/${id}`, {
      cache: 'no-store',
    });
    if (!response.ok) {
      return {
        data: null,
        error: `Failed to fetch post - Status: ${response.status} ${response.statusText}`
      };
    }
    const data: IProduct = await response.json();
    
    return {
      data,
      error: null
    };
  } catch (error) {
    console.error('Fetch error:', error);
    return {
      data: null,
      error: `Failed to fetch post - Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

// fetchProducts
export { fetchProductsServer, fetchProductByIdServer };
