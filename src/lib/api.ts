import { IProduct } from "./types";
import { API_URL } from "./const";

interface IApiResponse<T> {
  data: T;
  error?: string | null;
}

const fetchProducts = async (): Promise<IApiResponse<IProduct[]>> => {
  try {
    const response: Response = await fetch(API_URL);
    if (!response.ok) {
      return {
        data: [],
        error: "Failed to fetch products 1"
      };
    }
    
    const data: IProduct[] = await response.json();
  
    return {
      data,
      error: null
    }
  } catch (error) {
    console.error(error);
    return {
      data: [],
      error: "Failed to fetch products 2"
    };
  }
}

export { fetchProducts };

export type { IApiResponse };