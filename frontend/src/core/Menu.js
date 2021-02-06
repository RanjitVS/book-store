import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './cartHelpers';
import './navbar.css';


const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#f0ad4e' }
    }
    else {
        return { color: 'white' }
    }
}

const Menu = (props/*or write {history} here and use history without writing props.history*/) => {
    return (
        <div >
            <ul className="navbar navbar-expand-lg navbar-dark bg-dark list-unstyled py-1">
                <li className="nav-item">
                   <a className="navbar-brand text-info" ><Link className="nav-link" to="/about">Book;Bin</Link></a>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/" style={isActive(props.history, '/')}>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/shop" style={isActive(props.history, '/shop')}>Filter</Link>
                </li>
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(props.history, "/cart")}
                        to="/cart"
                    >
                        Cart{" "}
                        <sup>
                            <small className="cart-badge text-info">{itemTotal()}</small>
                        </sup>
                    </Link>
                </li>

                
                    {isAuthenticated() && isAuthenticated().user.role === 0 && (
                        <li className="nav-item ml-auto">
                            <Link className="nav-link" to="/user/dashboard" style={isActive(props.history, '/user/dashboard')}>  Profile</Link>
                        </li>
                    )}

                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <li className="nav-item ml-auto">
                            <Link className="nav-link" to="/admin/dashboard" style={isActive(props.history, '/admin/dashboard')}>Admin Dashboard</Link>
                        </li>
                    )}
                

                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item ml-auto">
                            <Link className="nav-link" to="/signin" style={isActive(props.history, '/signin')}>Signin</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup" style={isActive(props.history, '/signup')}>Signup</Link>
                        </li>
                    </Fragment>
                )}

                {isAuthenticated() && (
                    <li className="nav-item">
                        <span
                            className="nav-link"
                            style={{ cursor: 'pointer', color: 'white' }}
                            onClick={() =>
                                signout(() => { props.history.push('/'); })}>
                            Signout
                    </span>
                    </li>
                )}


            </ul>
        </div>
    )
}
export default withRouter(Menu);