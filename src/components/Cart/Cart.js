import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';

const Cart = (props) => {
    // console.log(props.cart);
    const cart = props.cart;
    // console.log(cart);

    const total = cart.reduce((total,prd)=> total + prd.price * prd.quantity , 0);
    // debugger;
    let shippingHandling = cart.reduce((shippingHandling,prd)=>shippingHandling+prd.shipping , 0);
    shippingHandling = shippingHandling.toFixed(2)
    // let total=0;
    // for (let i = 0; i < length; i++) {
    //     const product = cart[i];
    //     total= total + product.price;
    // }

    const totalBeforeTax=Number((total+Number(shippingHandling)).toFixed(2));
    const tax= Number((totalBeforeTax*.1).toFixed(2)); 
    const grandTotal = Number((totalBeforeTax+tax).toFixed(2));

    // console.log(typeof(totalBeforeTax));

    return (
        <div>
            <h3>Order Summary</h3>
            <p>Items ordered:{cart.length}</p>
            <p><small>Items: ${total}</small></p>
            <p><small>Shipping & Handling:	${shippingHandling}</small></p>
            <p><small>Total before tax:	${totalBeforeTax}</small></p>
            <p><small>Estimated Tax:$0{tax}</small></p>
            <p>Order Total:	${grandTotal}</p>
            {
                props.children //mane cart k jekhan jekhan theke call kora hyche hekhaner child golo ekhane bosbe..
            }
            {/* <Link to="/review"><button className="main-button">Review your order</button></Link> */}
        </div>
    );
};

export default Cart;