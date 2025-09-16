import { ReactNode } from 'react';
import { fetchProductsServer } from '@/lib/api';
import ClientDataLoader from '@/shared/components/ClientDataLoader';
import { IApiResponse } from '@/lib/api';
import { IProduct } from '@/lib/types';

const ProductListContainer = async ({ children }: { children: React.ReactNode }) => {
  const { data, error }: IApiResponse<IProduct[]> = await fetchProductsServer()

  return (
    <>
    <ClientDataLoader products={data} error={error || null} />
    {children}
    </>
    
  )
}

export default ProductListContainer;