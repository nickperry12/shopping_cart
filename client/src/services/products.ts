import axios from 'axios';
import { NewProduct } from '../types';
const baseUrl = 'http://localhost:5001/api'

const getAllProducts = () => {
  const request = axios.get(baseUrl + '/products');
  return request.then(response => response.data);
}

const getAllCartItems = async () => {
  const request = await axios.get(`${baseUrl}/cart`);
  return request.data;
};

const createNewProduct = async (data: NewProduct) => {
  const request = await axios.post(baseUrl + '/products', data)
  return request.data
}

const addToCart = async (id: string) => {
  const request = await axios.post(`${baseUrl}/add-to-cart/`, { productId: id });
  return request.data;
}

const cartCheckout = async () => {
  await axios.post(`${baseUrl}/checkout`)
}

const deleteProduct = async (id: string) => {
  await axios.delete(`${baseUrl}/products/${id}`)
}

const editProduct = async (id: string, product: NewProduct) => {
  const request = await axios.put(`${baseUrl}/products/${id}`, product);
  return request.data;
}

export default { getAllProducts, 
  createNewProduct,
  addToCart,
  getAllCartItems,
  cartCheckout,
  deleteProduct,
  editProduct
}