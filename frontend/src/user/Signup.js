import React,{useState} from 'react';
import Layout from '../core/Layout';
import {Link} from 'react-router-dom';
import {signup} from '../auth';
const Signup = () => {
    const [values,setValues]=useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success:false
    })
    const {name,email,password,success,error}=values;
    const handleChange=name=>event=>{
        setValues({...values,error:false,[name]:event.target.value});
    }
    const clickSubmit=(event)=>{
        event.preventDefault();
        setValues({...values,error:false})
        signup({name:name,email:email,password:password})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }
            else{
                setValues({...values,name:"",email:"",password:"",error:"",success:true})
            }
        })
    }
    
    const signUpForm=()=>(
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control border border-warning" onChange={handleChange('name')} value={name}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" className="form-control border border-warning" onChange={handleChange('email')} value={email}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" className="form-control border border-warning" onChange={handleChange('password')} value={password}></input>
            </div>
            <button className="btn btn-outline-success " onClick={clickSubmit}>Submit</button>
        </form>
    )

    const showError=()=>{
        return(
            <div className="alert alert-danger" style={{display:error?'':'none'}}>
            {error}
            </div>
        )
    }
    const showSuccess=()=>{
        return(
            <div className="alert alert-dark" style={{display:success?'':'none'}}>
                New account is created. You can now <Link to="/signin">Signin</Link>
            </div>
        )
    }

    return (
        <Layout  className="container col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {signUpForm()}
            {/* {JSON.stringify(values)} */}
        </Layout>
    )
}

export default Signup;