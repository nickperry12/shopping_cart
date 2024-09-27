import { useState } from 'react';
import { NewProduct, Product as ProductType } from '../types';
import EditProductForm from './EditProductForm';

interface ProductProps {
  product: ProductType,
  cartHandler: (product: ProductType) => void;
  deleteHandler: (id: string) => void;
  onEditProduct: (id: string, product: NewProduct) => void;
}

const Product = ({ product, cartHandler, deleteHandler, onEditProduct }: ProductProps) => {
  // set state and set method here
  const [displayEdit, setDisplayEdit] = useState(false);
  // showEdit is more conventional

  return (
    <>
    <li className="product">
      <div className="product-details">
        <h3>{product.title}</h3>
        <p className="price">Price: ${product.price}</p>
        <p className="quantity">Quantity: {product.quantity}</p>
        <div className="actions product-actions">
          <button className="add-to-cart" 
            onClick={() => cartHandler(product)} 
            disabled={product.quantity === 0}>
              Add to Cart
          </button>
          <button className="edit" onClick={() => setDisplayEdit(true)}>Edit</button>
        </div>
        <button className="delete-button" onClick={() => deleteHandler(product._id)}><span>X</span></button>
      </div>
      { displayEdit ?
        <EditProductForm product={product}
        setDisplayEdit={setDisplayEdit}
        onEditProduct={onEditProduct} />
        : null }
    </li>
    </>
  )
}

export default Product;