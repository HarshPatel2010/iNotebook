import React,{useState} from 'react';
import {useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const {showAlert} = props;
  let history = useNavigate();
  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
  //onChange function
  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  //hit the signup api
  const handleClick = async(e)=>{
    e.preventDefault();
    const {name,email,password}=credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`,{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({name,email,password})
    })
    const json = await response.json();
    console.log(json);
    if(json.success===true){
    localStorage.setItem("token",json.authToken)
    history("/")
    showAlert("Account created successfully","success");
    }else{
      showAlert("Invalid credentials","danger");
    }
  }

  return (
    <div className='my-5'>
      <form onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Enter your name</label>
          <input type="text" className="form-control" name="name" onChange={onChange} id="name" aria-describedby="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' onChange={onChange} id="email" aria-describedby="email" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' onChange={onChange} id="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name='cpassword' onChange={onChange} id="cpassword" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup