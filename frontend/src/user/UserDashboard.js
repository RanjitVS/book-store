import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';//for gettig the info of the user loggedin
import { Link } from 'react-router-dom';


const Dashboard = () => {
    const { user: { _id, name, email, role } } = isAuthenticated()
    const userLinks = () => {
        return (
            <div className='card border-warning'>
                <h4 className='card-header bg-dark border-warning text-warning'>User Options</h4>
                <ul className='list-group '>
                    <li className='list-group-item '><Link to='/cart' className='nav-link text-success'>My Cart</Link></li>
                    <li className='list-group-item '><Link to='/profile/update' className='nav-link text-success'>Update Profile</Link></li>
                </ul>
            </div>
        )
    }

    const userInfo = () => {
        return (
            <div className='card mb-5 border-warning'>
                <h3 className='card-header bg-dark border-warning text-warning'>Profile</h3>
                <ul className='list-group '>
                    <li className='list-group-item '>{name}</li>
                    <li className='list-group-item'>{email}</li>
                    <li className='list-group-item'><div className="badge badge-success">{role === 1 ? 'Administrator' : 'User'}</div></li>
                </ul>
            </div>
        )
    }
    const purchaseHistory = () => {
        return (
            <div className='card mb-5 border-warning'>
                <h3 className='card-header bg-dark border-warning text-warning'>Purchase history</h3>
                <ul className='list-group'>
                    <li className='list-group-item'>history</li>
                </ul>
            </div>
        )
    }


    return (
        <Layout className='container-fluid'>
            <div className='row'>
                <div className='col-9'>
                    {userInfo()}
                    {purchaseHistory()}
                </div>
                <div className='col-3'>
                    {userLinks()}
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;