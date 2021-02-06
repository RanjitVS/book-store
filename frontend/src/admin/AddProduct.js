import React, { useEffect, useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';//for gettig the info of the user loggedin
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    })

    const {
        name,
        description,
        price,
        categories,
        category,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    //loading categories and setting form data

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            }
            else {
                setValues({ ...values, categories: data, formData: new FormData() })
            }
        })
    }


    useEffect(() => {
        init();
    }, [])


    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value);
        setValues({ ...values, [name]: value })
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true })
        createProduct(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                }
                else {
                    setValues({ ...values, name: '', description: '', photo: '', price: '', quantity: '', loading: false, createdProduct: data.name })
                }
            })
    }
    const newPostForm = () => (
        <form className='mb-3' onSubmit={clickSubmit}>
            <h4>Post photo</h4>
            <div className='form-group'>
                <label className='btn btn-secondary'>
                    <input type='file' name='photo' accept='image/*' onChange={handleChange('photo')} />
                </label>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input type='text' className='form-control border-warning' value={name} onChange={handleChange('name')} />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Description</label>
                <textarea className='form-control border-warning' value={description} onChange={handleChange('description')} />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Price</label>
                <input type='number' className='form-control border-warning' value={price} onChange={handleChange('price')} />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Category</label>

                <select className='form-control border-warning' onChange={handleChange('category')}>
                    <option>Select a Category</option>
                    {categories && categories.map((c, i) => (<option value={c._id} key={i}>{c.name}</option>))}
                </select>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Quantity</label>
                <input type='number' className='form-control border-warning' value={quantity} onChange={handleChange('quantity')} />
            </div>
            <button className='btn btn-outline-success'>Create Product</button>
        </form>
    )

    const showError = () => (
        <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )
    const showSuccess = () => (
        <div className='alert alert-info' style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    )
    const showLoading = () => (
        loading && <div className='alert alert-success'>
            <h2>Loading...</h2>
        </div>
    )

    return (
        <Layout title="Add a new product" description={`Hello, ready to add a new product?`}>
            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    )
}
export default AddProduct;