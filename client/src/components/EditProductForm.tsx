import React, { SetStateAction, useState } from "react";
import { NewProduct, Product } from "../types";

interface EditProductProps {
  product: Product;
  setDisplayEdit: React.Dispatch<SetStateAction<boolean>>;
  onEditProduct: (id: string, product: NewProduct) => void;
}

const EditProductForm = ({ product, setDisplayEdit, onEditProduct }: EditProductProps) => {
  const [title, setTitle] = useState<string>(product.title);
  const [price, setPrice] = useState<number>(product.price);
  const [quantity, setQuantity] = useState<number>(product.quantity);

  const handleEditProduct = () => {
    const newProduct = {
      title: title,
      price: price,
      quantity: quantity
    }

    onEditProduct(product._id, newProduct)
  }

  return (
    <div className="edit-form">
    <h3>Edit Product</h3>
    <form>
      <div className="input-group">
        <label htmlFor="product-name">Product Name</label>
        <input
          type="text"
          id="product-name"
          value={title}
          aria-label="Product Name"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="product-price">Price</label>
        <input
          type="number"
          id="product-price"
          value={price}
          aria-label="Product Price"
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>

      <div className="input-group">
        <label htmlFor="product-quantity">Quantity</label>
        <input
          type="number"
          id="product-quantity"
          value={quantity}
          aria-label="Product Quantity"
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      <div className="actions form-actions">
        <button type="submit" onClick={handleEditProduct}>Update</button>
        <button type="button" onClick={() => setDisplayEdit(false)}>Cancel</button>
      </div>
    </form>
    </div>
  )
};

export default EditProductForm;