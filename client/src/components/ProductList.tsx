import { NewProduct, ProductList as ProdListType, Product as ProductType } from "../types";
import Product from "./Product";

interface ProductListProps {
  products: ProdListType
  cartHandler: (product: ProductType) => void;
  deleteHandler: (id: string) => void;
  onEditProduct: (id: string, product: NewProduct) => void;
}

const ProductList = ({ products, cartHandler, deleteHandler, onEditProduct }: ProductListProps ) => {
  return (
    <>
      <div className="product-listing">
        <h2>Products</h2>
        <ul className="product-list">
          {products.map(product => <Product key={product._id} product={product} cartHandler={cartHandler} deleteHandler={deleteHandler} onEditProduct={onEditProduct} />)}
        </ul>
      </div>
    </>
  )
}

export default ProductList;