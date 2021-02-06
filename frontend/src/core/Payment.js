import React from "react";
import { Link } from "react-router-dom";
import '../core/payment.css';
import MyCards from "../core/MyCards";
import Layout from "./Layout";

const Payment = () => {

    return ( 
        <Layout>
    <div>
        <MyCards />
       </div>
    </Layout>
       
    );
};

export default Payment;
