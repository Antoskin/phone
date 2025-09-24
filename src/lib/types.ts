import { Decimal } from "@prisma/client/runtime/library";

interface IProduct {
  id: string;
  slug: string;
  price: Decimal;
  description: string;
}

export type { IProduct };