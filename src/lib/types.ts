interface IProduct {
  id: string;
  name: string;
  data: {
    [key: string]: string | number;
  } | null;
}

export type { IProduct };