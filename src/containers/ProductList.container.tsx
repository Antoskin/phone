import { fetchProductsServer } from '@/lib/api';
// import ProductList from '../components/ProductList/ProductListClient.container';
import { IApiResponse } from '@/lib/api';
import { IProduct } from '@/lib/types';

const withProductList = async (WrappedComponent: React.ComponentType<any>) => {
  const ProductList = async (props: any) => {
    const { data, error }: IApiResponse<IProduct[]> = await fetchProductsServer()

    return (
      <WrappedComponent 
      products={data} 
      error={error || null} 
      {...props} 
    />
    )
  }

  return ProductList;
}

export default withProductList