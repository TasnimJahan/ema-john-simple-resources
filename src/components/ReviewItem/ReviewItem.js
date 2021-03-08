import React from 'react';

const ReviewItem = (props) => {
    console.log(props);
    const {name , quantity,img ,key , price}= props.product;
    const reviewItem={
        borderBottom:"1px solid lightgray",
        margin:'2%',
        padding:'2%',
        marginLeft:'10%',
    }
    return (
        <div style={reviewItem} className="product">
            <div><img src={img} alt=""/></div>
            <div style={{marginLeft:"2%"}}>
            <h4 className="product-name">Product name:{name}</h4>
            <p>Quantity:{quantity}</p>
            <p><small>Price: {price}</small></p><br/>
            <button onClick={()=>props.removeProduct(key)} className="main-button">Remove Product</button>
            </div>
        </div>
    );
};

export default ReviewItem;