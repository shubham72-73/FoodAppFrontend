import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

export default function Navbar() {
  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
<div>
    <nav>
        <img src="../../khaayo.png" id="logo" width="100px" alt="Boat-Logo" />
        <div className="check">    {localStorage.getItem("authToken") ? (
            <div id="nav-part2">
                <h4>
                    <Link to="/myOrder">&nbsp;<i className="fa-solid fa-clock-rotate-left"></i></Link>
                </h4>
                <h4 onClick={()=>{setCartView(true)}}>
                    <p><i className="fa-solid fa-cart-shopping"></i>{" "}<Badge>{data.length}</Badge></p>
                </h4>
                {cartView ? <Modal onClose={()=>setCartView(false)}><Cart/></Modal> : null}
                <h4 onClick={handleLogout}>
                    <p>Logout</p>
                </h4>
            </div>
            ):(
            <div id="nav-part2">
                <h4>
                    <Link to="/Login">Login</Link>
                </h4>
                <h4>
                    <Link to="/Createuser">Signup</Link>
                </h4>
            </div>
            )}
            </div>
    </nav>
</div>
);
}
