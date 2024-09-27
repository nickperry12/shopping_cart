export interface Product {
  _id: string;
  title: string;
  quantity: number;
  price: number;
}

export type NewProduct = Omit<Product, "_id">;
export type ProductList = Product[];
export type CartItem = Product;