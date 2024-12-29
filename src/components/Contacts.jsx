import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import logo from './../assets/logo.png';
import { useNavigate} from 'react-router-dom';
import { FcSettings,FcDisapprove } from "react-icons/fc";
import { deleteCurrentUser } from '../utils/APIRoutes';

const Contacts = ({contacts,currentUser,changeChat}) => {

    const [currentUserName,setCurrentUserName] = useState(undefined)
    const [currentUserImage,setCurrentUserImage] = useState(undefined)
    const [currentSelected,setCurrentSelected] = useState(undefined)
    const navigate = useNavigate()  ; 

    useEffect(() =>{
        console.log(contacts);
        if(currentUser){
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }

    },[currentUser])

    const changeCurrentChat = (index,contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    }

    return (
        <>
           {
            currentUserImage && currentUserName &&(
                <Container>
                    <div className="brand">
                        <img src={logo} alt="logo" />
                        <h3>snappy</h3>
                    </div>
                    <div className="contacts">
                        {
                            contacts.map((contact,index) => {
                                return(
                                    <div className={`contact ${index === currentSelected ?"selected":""}`} onClick={()=>changeCurrentChat(index,contact)} key={index}>
                                            <div className="avatar">
                                                <img 
                                                src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                                alt="avatar" /> 
                                            </div>
                                            <div className="username">
                                                <h3>{contact.username}</h3>
                                            </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="current-user">
                        <div >
                            
                            <button onClick={()=>{
                                navigate("/modify")
                            }} className="btn" >
                                <FcSettings className="grow" />
                            </button>
                            <br/>
                            <button onClick={async()=>{

                                    // eslint-disable-next-line no-restricted-globals
                                    if(confirm("Are you sure you want to delete your account?")){
                                        const {data} = await axios.delete(`${deleteCurrentUser}/${currentUser._id}`)
                                        localStorage.clear()
                                        navigate("/login")
                                        alert(data.msg)  
                                    }

                            }} className="btn">
                                <FcDisapprove className="grow" />
                            </button>

                        </div>
                        <div className="avatar">
                        <img 
                            src={`data:image/svg+xml;base64,${currentUserImage}`}
                            alt="avatar" /> 

                        </div>
                        <div className="username">
                            <h2>{currentUserName}</h2>
                        </div>
                    </div>
                </Container>
            )
           } 
        </>
    );
}

const Container  = styled.div`

    display:grid;
    grid-template-rows:10% 75% 15%;
    overflow:hidden;
    background-color:#080420;
    .brand{
        display:flex;
        align-items:center;
        justify-content:center;
        gap:1rem;
        img{
            height:2rem;
        }
        h3{
            color:white;
            text-transform:uppercase;
        }
    }
    .contacts{
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:0.8rem;
        overflow:auto;
        &::-webkit-scrollbar{
            width:0.2rem;
            &-thumb{
                background-color:#ffffff39;
                width:0.1rem;
                border-radius:1rem;
            }
        }
        .contact{
            background-color:#ffffff39;
            min-height:5rem;
            width:90%;
            cursor:pointer;
            border-radius:0.2rem;
            padding:0.4rem;
            gap:1rem;
            align-items:center;
            display:flex;
            transition:0.5s ease-in-out;
            .avatar{
                img{
                    height:3rem;


                }
            }
            .username{
                h3{
                    color:white;
                }
            }

        }
        .selected{
            background-color:#9186f3;
        }
    }
    .current-user{
        background-color:#0d0d30;
        display:flex;
        justify-content:center;
        align-items:center;
        gap:2rem;
        .avatar{
            img{
                height:4rem;
                max-inline-size:100%;
            }
        }
        .username{
            
            h2{
                color:white;

            }
        }
        @media screen and (min-width:720px) and (max-width:1090px) {
            gap:0.5rem;
            .username{
                h2{
                    font-size:1rem;
                }
            }
          }

    }
    .grow {
        
        height: 160%;
        width: 160%;
        margin-right: -5%;
    }

    .btn{
        background-color: transparent;
        border-color: transparent;
        cursor:pointer;

    }

`;


export default Contacts;
