import React from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import {emptyCart} from './cartHelpers'

import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";


const Checkout = ({ products }) => {
    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <Link to="/payment">
                 <button className="btn btn-outline-success" onClick={handleClick}>Checkout</button>
            </Link>
        ) : (
                <Link to="/signin">
                    <button className="btn btn-outline-success">Sign in to checkout</button>
                </Link>
            );
    };


    const handleClick = () => {
        alert("Do you want to proceed to payment page?")

        emptyCart(() =>{
            console.log('payment success and empty cart')        
            //window.location.reload();
        })
    }

    return (
        <div>
            <h2>Total: Rs {getTotal()}</h2>

            {showCheckout()}
        </div>

    );
};

export default Checkout;
