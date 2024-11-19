import React, { useEffect, useState } from 'react'
import './homepage.css'
import { HomeFilled, PictureOutlined, QuestionCircleFilled } from '@ant-design/icons'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import axios from 'axios'
import endpoint from '../endpoint/endpoints'
import Myblog from './Myblog'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {


    const token = Cookies.get("userDetail")
    const [userdetail , setuserdetail ]= useState ()

    let decodetoken = null;
    try {
        decodetoken = token ? jwtDecode(token) : null;
    } catch (error) {
        console.error("Invalid token:", error);
    }
   useEffect(() => {

    const getuserdetail = async () => {
        if (!decodetoken) {
            console.error("No valid token decoded");
            navigate('./login')
            return;
        }
        const { id } = decodetoken;
        try {
           
            const response = await axios.get(`${endpoint.userDetail}?id=${id}`);
            setuserdetail(response.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    getuserdetail();
   }, [])

   const navigate = useNavigate()

    return (
        <div className='homepagecontainer'>
            <div className='lhs'>
                <h1>BlogSphere</h1>
                <div className='icons'>
                    <span><HomeFilled /> </span>
                    <p onClick={() => navigate('/')}> Home</p>
                </div>

                <div className='icons'>
                    <span><QuestionCircleFilled /></span>
                    <p onClick={() => navigate('/search')}>Search</p>

                </div>
                <div className='icons'>
                    {
                        userdetail && userdetail.profileImg.length > 0 ? <span> <img  src={userdetail.profileImg} /> </span> : <span> <PictureOutlined /></span>
                    }
                    <p onClick={() => navigate('/profile')}>Profile</p>
                </div>
            </div>
            <div className='rhs'>
                <div className='blogcontainer'>
                    <Myblog />
                </div>
            </div>
        </div>
    )
}

export default Homepage
