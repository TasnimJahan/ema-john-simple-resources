import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart]= useState([]);
    // console.log(cart);

    const [orderPlaced,setOrderPlaced] = useState(false);
    
    const handlePlaceOrder=()=>{
        // console.log("Order Placed");
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }
    
    const removeProduct = (productKey)=>{
        console.log("removed",productKey);
        const newCart = cart.filter(pd=>pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(()=>{
        const savedCart = getDatabaseCart();//savedCart er value hishebe object pabo. shop.js thke addToDatabaseCart(product.key, count) die key r value pathaichilam j ogogo pabo
        console.log(savedCart);
        const productKeys = Object.keys(savedCart); //Object.keys(savedCart) eta die saved cart er key golo array hishebe pabo..
        console.log(productKeys);
        // const count = Object.values(savedCart); //Object.values(savedCart) eta die saved cart er value golo array hishebe pabo.. map dieo kora jai.. niche dekhaichi
        // console.log(count);
        // const count2 = productKeys.map(key => savedCart[key]); // eta Object.values(savedCart) er alternative.. eta die saved cart er value golo array hishebe pabo..
        // console.log(count2);
        const cartProducts = productKeys.map(key =>{
            const product = fakeData.find(pd => pd.key === key);
            product.quantity= savedCart[key];
            return product; 
        })
        // console.log(cartProducts);
        setCart(cartProducts);
    },[])
    console.log(cart);

    let thanks;
    if (orderPlaced === true) {
        thanks = <img src= {happyImage} alt=""/>
    }
    return (
        <div className="shop-container">
           <div className="product-container">
            {
                cart.map(pd=> <ReviewItem removeProduct={removeProduct} product = {pd} key={pd.key}></ReviewItem>)
            }
            {
                thanks
            }
           </div>

            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="main-button">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;