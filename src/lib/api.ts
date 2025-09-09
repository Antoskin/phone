import { IProduct } from "./types";
import { API_URL } from "./const";

interface IApiResponse<T> {
  data: T;
  status: number;
  error: string;
}

const fetchProducts = async (): Promise<IApiResponse<IProduct[]>> => {
  try {
    const response: Response = await fetch(API_URL);
    if (response.status !== 200) {
      throw new Error("Failed to fetch products");
    }

    const data: IApiResponse<IProduct[]> = await response.json();
      
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { fetchProducts };

export type { IApiResponse };