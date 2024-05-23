import React from 'react'
import { MdDelete } from "react-icons/md";
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='cart-empty'>Your Cart is Empty!</div>
      </div>
    )
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    try {
      let response = await fetch("http://localhost:3000/api/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString() 
        })
      });

      if (response.status === 200) {
        dispatch({ type: "DROP" });
      } else {
        console.error('Failed to checkout:', response.statusText);
      }
    } catch (error) {
      console.error('Error during checkout:', error.message);
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div className='cart-container'>
      <div className='cart-table'>
          <div className='cart-items'>
            {data.map((food, index) => (
              <div>
                <hr/>
              <div key={index} className='cart-items-all'>
                <div className='cart-item-number'><p>{index + 1}</p></div>
                <div className='cart-item-img'><img src={food.img} alt={food.name}/></div>
                <div className='cart-item-name'><p>{food.name}</p></div>
                <div className='cart-item-qty'><p>{food.qty}</p><p>{food.size}</p></div>
                <div className='cart-item-price'><p>&#8377; {food.price}</p></div>
                <div className='cart-item-delete'><button type="button" className="cart-delete"><MdDelete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </div>
              </div>
              <div key={index} className='cart-card-mobile'>
                <div className='cart-item-number'><p>{index + 1}</p></div>
                <div className='cart-card-details'>
                  <div className='cart-item-img'><img src={food.img} alt={food.name}/></div>
                  <div className='cart-item-name'><p>{food.name}</p></div>
                  <div className='cart-item-qty'><p>{food.qty}</p>-<p>{food.size}</p></div>
                  <div className='cart-item-price'><p>&#8377; {food.price}</p></div>
                </div>
                <div className='cart-item-delete'><button type="button" className="cart-delete"><MdDelete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </div>
              </div>
              </div>             
            ))}
                       
          </div>
        </div>
        <div className='cart-final'>
          <div className='cart-total'><span className='cart-price-tag'>Total Price : </span>&#8377;&nbsp;{totalPrice}/-</div>
          <button className='checkout-btn' onClick={handleCheckOut}>Check Out</button>        
        </div>
      </div>
    </div>
  )
}
