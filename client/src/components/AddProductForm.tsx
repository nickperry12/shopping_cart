import React, { SetStateAction, useState } from 'react';
import services from '../services/products'
import { NewProduct, ProductList } from '../types';

interface displayProps {
  displayForm: React.ComponentState;
  setDisplayForm: React.Dispatch<SetStateAction<boolean>>;
  setProducts: React.Dispatch<SetStateAction<ProductList>>;
}

const AddProductForm = ({ setDisplayForm, setProducts }: displayProps) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async () => {
    const product: NewProduct = {
      title,
      price: Number(price),
      quantity: Number(quantity)
    }

    try {
      const newProduct = await services.createNewProduct(product);
      setProducts((prevState) => prevState.concat(newProduct));
    } catch (error) {
      console.error(`There was an error: ${error}`)
    }
  }
  
  return (
    <div className={"add-form.visible"}>
      <form>
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-price">Price:</label>
          <input
            type="number"
            id="product-price"
            name="product-price"
            min="0"
            step="0.01"
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            id="product-quantity"
            name="product-quantity"
            min="0"
            required
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="actions form-actions">
          <button type="submit" onClick={handleSubmit}>Add</button>
          <button type="button" onClick={() => setDisplayForm(false)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default AddProductForm;