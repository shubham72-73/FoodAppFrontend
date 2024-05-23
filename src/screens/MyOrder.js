import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);

    const fetchMyOrder = async () => {
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail) {
            const response = await fetch("http://localhost:3000/api/myOrderData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: userEmail }),
            });
            const result = await response.json();
            setOrderData(result);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container">
                {orderData && orderData.orderData ? (
                    orderData.orderData.order_data.slice(0).reverse().map((order) => (
                        <div key={order[0]?.Order_date} className="order-category">
                            {order.map((item) => (
                                item.Order_date ? (
                                    <div key={item.Order_date} className="category-name">
                                    </div>
                                ) : (
                                    <div key={item.name} className="order-container">
                                        <div className="order-card">
                                            <img className="order-img" src={item.img} alt={item.name} />
                                            <div className="order-name">{item.name}</div>
                                            <div className="qty-size">
                                                <p>Qty : {item.qty}</p>
                                                <p>Size : {item.size}</p>
                                            </div>
                                            <div className="order-price">
                                                <p>Price: &#8377;{item.price}/-</p>
                                            </div>
                                            <div className="order-date">{order[0]?.Order_date}</div>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    ))
                ) : (
                    <div className="no-order">No orders found.</div>
                )}
            </div>
            <Footer />
        </div>
    );
}
