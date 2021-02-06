import React,{useState} from 'react';
import Layout from '../core/Layout';
import {Redirect} from 'react-router-dom';
import {signin,authenticate,isAuthenticated} from '../auth';
const Signin = () => {
    const [values,setValues]=useState({
        email:'',
        password:'',
        error:'',
        loading:false,
        redirectToReferrer:false
    })
    const {email,password,loading,error,redirectToReferrer}=values;
    const {user}=isAuthenticated()
    const handleChange=name=>event=>{
        setValues({...values,error:false,[name]:event.target.value});
    }
    const clickSubmit=(event)=>{
        event.preventDefault();
        setValues({...values,error:false,loading:true})
        signin({email:email,password:password})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,loading:false})
            }
            else{
                authenticate(data,()=>{
                    setValues({...values,redirectToReferrer:true})
                })
            }
        })
    }
    
    const signUpForm=()=>(
        <form>
            <div className="form-group ">
                <label className="text-muted ">Email</label>
                <input  type="email" className="form-control border border-warning" onChange={handleChange('email')} value={email}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" className="form-control border border-warning" onChange={handleChange('password')} value={password}></input>
            </div>
            <button className="btn btn-outline-success" onClick={clickSubmit}>Submit</button>
        </form>
    )

    const showError=()=>{
        return(
            <div className="alert alert-danger" style={{display:error?'':'none'}}>
            {error}
            </div>
        )
    }
    const showLoading=()=>
            loading&&(
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
            );
    const redirectUser=()=>{
        if(redirectToReferrer){
            if(user&&user.role===1){//if user is admin
                return <Redirect to="/admin/dashboard" />
            }
            else{//if user is not admin
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticated()){
            return <Redirect to='/' />
        }
    }

    return (
        <Layout  className="container col-md-8 offset-md-2">
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
            {/* {JSON.stringify(values)} */}
        </Layout>
    )
}

export default Signin;