import React, { useRef, useEffect, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    const existingItem = data.find(
      (item) => item.id === props.foodItem._id && item.size === size
    );

    const finalPrice = qty * parseInt(options[size]);

    if (existingItem) {
      await dispatch({
        type: "UPDATE",
        id: props.foodItem._id,
        price: finalPrice,
        qty: qty,
      });
    } else {
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        img: props.foodItem.img,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    }
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  let finalPrice = qty * parseInt(options[size]);

  return (
    <div>
      <div className="card">
        <img src={props.foodItem.img} alt={props.foodItem.name} />
        <div className="details">
          <div className="item-name">{props.foodItem.name}</div>
          <div className="selection">
            <div className="quantity">
              <p className="choice">Qty&nbsp;&nbsp;</p>
              <select
                name="quantity"
                id="quantity"
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="size">
              <p className="choice">Size&nbsp;&nbsp;</p>
              <select
                name="size"
                id="size"
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((priceData) => {
                  return (
                    <option key={priceData} value={priceData}>
                      {priceData}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <hr />
          <div className="final">
            <div className="price">Price: &#8377;{finalPrice}</div>
            <button className="add-cart" onClick={handleAddToCart}>
              <i className="fa-solid fa-cart-shopping"></i>
              <p>Add To Cart</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
