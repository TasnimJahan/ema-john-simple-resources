import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products,setProducts]= useState(first10);
    const [cart,setCart]= useState([]);

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        console.log(savedCart);
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey=> {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity=savedCart[existingKey];
            // console.log(existingKey, savedCart[existingKey]);
            return product;
        })
        setCart(previousCart);
    },[])


    const handleAddProduct = (product)=>{

        const sameProduct =cart.find(pd=> pd.key === product.key);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity+1;
            sameProduct.quantity = count;
            const others = cart.filter(pd=> pd.key !== product.key);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity=1;
            newCart= [...cart, product];
        }

        setCart(newCart);
        // const sameProduct =newCart.filter(pd=> pd.key === product.key);//mane click kora product jotogolo ache tader details er ekta array dibe 
        // console.log(sameProduct);
        // const count = sameProduct.length; //jotogolo product ache tar theke jei array ta pabo shetar length hbe oi product ta kotobar click korechi tar shonkha
        addToDatabaseCart(product.key, count); // datatbase e add korechi kotota product kotobar kore ache sheta addToDatabaseCart() fn e dhukai dichi
        // console.log(product.key, count);
    }
    // console.log(cart);
    
    // console.log(fakeData);
    // const first10 = fakeData.slice(0,10);
    // console.log(first10);
    return (
        <div className="shop-container">
            <div className="product-container">           
                {
                    products.map(productName => <Product product={productName} handleAddProduct={handleAddProduct} showAddToCart={true} key ={productName.key}></Product>)
                }          
                {/* showAddToCart={true} eta die ekta button e bole dichi j jodi true hy tahole btn ta dekhabe na hy dekhabe na.. */}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                <Link to="/review"><button className="main-button">Review your order</button></Link>
                </Cart>
                {/* cart k 2 jaiga theke call kora hyche.. tai jno shudhu matro shop er under e card ta thake tai ekhane button k child hishebe deoa hyche.. cz btn ta review page e lagbena  er por cart theke child golo show korar jnno bola habe..  */}
            </div>
            
        </div>
    );
};

export default Shop;