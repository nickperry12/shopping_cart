import { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import { ErrorBoundary } from 'react-error-boundary';
import { ProductList as ProdListType, Product, CartItem, NewProduct } from './types';
import services from './services/products';
import AddProductForm from './components/AddProductForm';
import Error from './components/Error';
import ShoppingCart from './components/ShoppingCart';

const App = () => {
  const [products, setProducts] = useState<ProdListType>([]);
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const getInitalProducts = async () => {
      try {
        const data = await services.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error(`There was an error: ${error}`);
      }
    }

    getInitalProducts();
  }, [])

  useEffect(() => {
    const getInitialCart = async () => {
      try {
        const data = await services.getAllCartItems();
        setCartItems(data);
      } catch (error) {
        console.error(`There was an error: ${error}`)
      }
    }

    getInitialCart();
  }, [])
  // do not put objects in dependency array

  const handleUpdate = async (id: string) => {
    const request = await services.addToCart(id);
    //re-renders the cart component
    const itemInCart = cartItems.filter(item => item._id === request.item._id);
    console.log(cartItems, request.item, itemInCart)
    if (itemInCart.length !== 0) {
      setCartItems(cartItems.map(item => {
        if (item._id === request.item._id) {
          return request.item;
        } else {
          return item;
        }
      }));
    } else {
      setCartItems(cartItems.concat(request.item));
    }

    // re-renders the product component
    setProducts(products.map(product => {
      if (product._id === request.product._id) {
        return request.product;
      } else {
        return product;
      }
    }));

    return request;
  }

  const clickCartHandler = (product: Product): void => {
    handleUpdate(product._id);
  }

  const checkoutHandler = () => {
    services.cartCheckout();
    setCartItems([]);
  }

  const deleteHandler = (id: string) => {
    services.deleteProduct(id);
    setProducts(products.filter(product => product._id !== id));
  }

  const handleEditProduct = (id: string, newProduct: NewProduct) => {
    services.editProduct(id, newProduct);
  }

  return (
    <ErrorBoundary fallback={<Error />}>
      <div id="app">
        <ShoppingCart cartItems={cartItems} checkoutHandler={checkoutHandler} />
        <main>
          <ProductList products={products} cartHandler={clickCartHandler} deleteHandler={deleteHandler} onEditProduct={handleEditProduct}/>
          {displayForm ? 
          <AddProductForm displayForm={displayForm} setDisplayForm={setDisplayForm} setProducts={setProducts} />
          : <button onClick={() => setDisplayForm(!displayForm)}>Add Product</button>}
        </main>
      </div>
    </ErrorBoundary>
  )
};

export default App
