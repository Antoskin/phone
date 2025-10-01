import { hashSync } from "bcrypt-ts-edge";

export const sampleData = {
  products: [
    {
      id: '1',
      price: 100,
      slug: "product-1",
      description: "Product 1 description",
    },
    {
      id: '2',
      price: 200,
      slug: "product-2",
      description: "Product 2 description",
    },
    {
      id: '3',
      price: 300,
      slug: "product-3",
      description: "Product 3 description",
    }
  ],
  users: [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      password: hashSync("123456", 10),
      role: 'admin',
    },
    {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      password: hashSync("123456", 10),
      role: 'user',
    }
  ]
}
