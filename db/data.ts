import { IProduct } from "../src/lib/types";
import { Decimal } from "@prisma/client/runtime/library";

export const data: IProduct[] = [
  {
    id: "1",
    price: new Decimal(100),
    slug: "product-1",
    description: "Product 1 description",
  }
]