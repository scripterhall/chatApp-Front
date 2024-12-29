import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import { useNavigate} from 'react-router-dom';
import Logo from "./../assets/logo.png";
import {ToastContainer,toast}from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { modifyRoute } from '../utils/APIRoutes';

function Modify() {

    var user = JSON.parse(localStorage.getItem("chat-app-user"));
    const navigate = useNavigate()  ;  
    const[values,setValues] = useState({
        username:user.username,
        email:user.email,
        password:"",
        confirmPassword:"",
    })

  const toastOptions = {
    position:"bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme: "dark",  
  }; 

  useEffect(() => {
    
  },[])
  
  const handleSubmit = async(event) => {

    event.preventDefault();

    


    if(handleValidate()){
        const {password,username,email} = values;
        console.log(values);
        console.log(username);
        const {data} = await axios.put(`${modifyRoute}/${user._id}`,{
            username,
            email,
            password,
        });
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        if(data.status === false){
            toast.error(data.msg,toastOptions)
        }if(data.isSet){

            user.username = data.username;
            user.email = data.email;
            user.password = data.password;
            localStorage.setItem("chat-app-user",JSON.stringify(user));
            navigate("/");
        }
        
        
    }
  
  };


const handleValidate = () => {

    const {password,confirmPassword,username,email} = values;
    

    console.log(values);
    if(password !== confirmPassword){
        toast.error("your password is not well wonfired !!!",toastOptions);
        return false;
    }else if(username.length<3){
        toast.error("username should be greater than 3 characteres !!!",toastOptions);
        return false;
       
    }else if(password.length<5){
        toast.error("password should be greater than 5 characteres !!!",toastOptions);
        return false;
    }else if(email === ""){
        toast.error("email is required!!!",toastOptions);
       return false;
    }
    return true;

}

  
  const handleChange = (event) => {
    
            setValues({...values,[event.target.name]:event.target.value});

  }

  

  return (
    
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}> 
                     <div className="brand">
                        <img src={`data:image/svg+xml;base64,${user.avatarImage}`} alt="Logo" />
                        <h1>{user.username}</h1>
                     </div>

                     <input
                      type="text"
                      placeholder="Username"
                      name="username"
                      
                      onChange={e => handleChange(e)} 
                      
                      defaultValue={user.username}

                     />

                      <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={e => handleChange(e)}
                      
                      defaultValue={user?.email}
                     />

                     <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={e => handleChange(e)}
                      
                     />

                      <input
                      type="Password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      onChange={e => handleChange(e)} 
                      
                     />

                    <button type="submit" >Modify User</button>
                    <span>
                        if you will not change password, 
                        write the old one
                    </span>

                </form>
            </FormContainer>
            <ToastContainer/>
        </>

  )
}

const FormContainer  = styled.div`

height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
background-color:#131324;
.brand{
    display : flex ;
    align-items:center;
    gap:1rem;
    justify-content:center;
    img{
        height : 5rem;
    }
    h1{
        color:white;
        text-transform:uppercase;
    }
}
form {
    display:flex;
    flex-direction:column;
    gap:2rem;
    background-color:#00000076;
    border-radius:2rem;
    padding:3rem 5rem;
    input{
        background-color:transparent;
        padding:1rem;
        border:0.1rem solid #4e0eff;
        border-radius:0.4rem;
        color:white;
        width:100%;
        font-size:1rem;
        &:focus{
            border:0.1rem solid #997af0;
            outline:none;

        }
        

        }
        button{
            background-color:#997af0;
            color:white;
            padding:1rem 2rem;
            border:none;
            font-weight:bold;
            cursor:pointer;
            border-radius:0.4rem;
            font-size:1rem;
            text-transform:uppercase;
            transition:0.5s ease-in-out;
            &:hover{
                background-color:#4e0eff;
            }
        }
        span{
            color:white;
            text-transform:uppercase;
            a{
                color:#4e0eff;
                text-decoration:none;
                font-weight:bold;

            }
        }

    }



`;

export default Modify