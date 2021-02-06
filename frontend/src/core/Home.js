import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import CarousalPage from "./Carousal"

const Home = () => {
    const [productsBySale, setProductsBySale] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false)

    const loadProductsBySale = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error)
            }
            else {
                setProductsBySale(data)
            }
        })
    }
    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error)
            }
            else {
                setProductsByArrival(data)
            }
        })
    }
    useEffect(() => {
        loadProductsByArrival()
        loadProductsBySale()
    }, [])

    return (
        <Layout  className='container-fluid '>
            <div  className='container-fluid'>
            < CarousalPage />
            </div>

            <h2 className='mb-4'> Whats New!</h2>
            <hr />
            <div className='row'>
                {productsByArrival.map((product, i) => (
                    <div className='col-4 mb-3' key={i}>
                        <Card  product={product} />
                    </div>
                ))}
            </div>

            <h2 className='mb-4'>Best Sellers</h2>
            <hr />
            <div className='row'>
                {productsBySale.map((product, i) => (
                    <div key={i} className='col-4 mb-3'>
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default Home;