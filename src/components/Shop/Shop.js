import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products,setProducts]= useState(first10);
    
    const [cart,setCart]= useState([]);

    const handleAddProduct = (product)=>{
        // console.log("clicked",product);
        const newCart = [...cart, product];
        setCart(newCart)
    }
    // console.log(cart);
    
    // console.log(fakeData);
    // const first10 = fakeData.slice(0,10);
    // console.log(first10);
    return (
        <div className="shop-container">
            <div className="product-container">           
                {
                    products.map(productName => <Product product={productName} handleAddProduct={handleAddProduct}></Product>)
                }          
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
            
        </div>
    );
};

export default Shop;